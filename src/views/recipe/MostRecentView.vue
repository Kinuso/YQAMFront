<script setup>
import RecipeApi from "../../service/RecipeApi";
import { onMounted, ref } from "vue";

onMounted(() => {
  getRecentRecipes();
});

let limit = ref(10);

const recentRecipes = ref({});

const getRecentRecipes = () => {
  RecipeApi.mostRecents(limit.value).then((response) => {
    recentRecipes.value = response.data.recipes;
  });
};

const loadMoreRecipes = () => {
  limit.value += 5;
  getRecentRecipes();
};
</script>

<template>
  <div class="bg-lightJet h-fit w-full">
    <div class="flex pt-10 justify-evenly flex-wrap pb-5">
      <RouterLink
        v-for="(recipe, index) in recentRecipes"
        :key="index"
        class="my-1 mx-5 font-Fontin rounded-xl bg-melon text-lightJet hover:text-melon hover:bg-darkJet"
        :to="{ name: 'show-recipe', params: { title: recipe.title } }"
      >
        <div
          class="w-56 h-56 bg-cover bg-center rounded-xl"
          :style="{ backgroundImage: `url(${recipe.imageUrl})` }"
        >
          <p class="relative top-44 bg-ivory text-center">
            {{ recipe.title }}
          </p>
        </div>
      </RouterLink>
    </div>
    <button
      @click="loadMoreRecipes"
      class="px-6 py-2 font-Fontin rounded-xl bg-melon text-lightJet hover:text-melon hover:bg-darkJet m-10 mx-auto block w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 text-xl sm:text-xl md:text-2xl"
    >
      Voir plus
    </button>
  </div>
</template>
