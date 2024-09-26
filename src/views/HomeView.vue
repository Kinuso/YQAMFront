<script setup>
import RecipeApi from "@/service/RecipeApi";
import { onMounted, ref } from "vue";

onMounted(() => {
  getRecipes();
  getRecentRecipes();
});

const recipes = ref({});
const recentRecipes = ref({});

const getRecipes = () => {
  RecipeApi.index().then((response) => {
    recipes.value = response.data.recipes;
  });
};

const getRecentRecipes = () => {
  RecipeApi.mostRecents().then((response) => {
    recentRecipes.value = response.data.recipes;
  });
};
</script>
<template>
  <div v-if="recipes" class="w-screen">
    <div class="main h-60 font-Fontin flex justify-center items-center">
      <H1
        class="mainTitle p-6 text-5xl text-center"
        alt="Recette diet proteine rapide bon sucré salé"
        >Y'a quoi à manger ?</H1
      >
    </div>
    <p>"Y'a quoi à manger ?" C'est quoi ?</p>
    <p>
      Nous sommes un site communautaire, permettant aux utilisateurs de
      consulter et de créer des recettes.
    </p>
    <i>Pour les fans, par les fans</i>

    <h2 class="text-4xl indent-4">Les plus récents</h2>
    <div class="bg-lightJet h-fit w-full">
      <RouterLink
        class="relative top-5 left-5 px-5 py-1 font-Fontin rounded-xl bg-melon text-darkJet hover:bg-tomato hover:text-darkJet text-center"
        to="/most-recent"
        >Tout voir >>
      </RouterLink>
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
            <p class="relative top-44 bg-ivory text-center rounded-lg">
              {{ recipe.title }}
            </p>
          </div>
        </RouterLink>
      </div>
    </div>

    <h2 class="text-4xl indent-4">Les mieux notés</h2>
    <div class="bg-lightJet h-fit w-full absolute">
      <RouterLink
        class="relative top-5 left-5 px-5 py-1 font-Fontin rounded-xl bg-melon text-darkJet hover:bg-tomato hover:text-darkJet text-center"
        to="/most-rated"
        >Tout voir >>
      </RouterLink>
      <div class="flex pt-10 justify-evenly flex-wrap pb-5">
        <RouterLink
          v-for="(recipe, index) in recentRecipes"
          :key="index"
          class="my-1 mx-5 font-Fontin rounded-xl bg-melon text-lightJet hover:bg-tomato hover:text-darkJet"
          :to="{ name: 'show-recipe', params: { title: recipe.title } }"
        >
          <div
            class="w-56 h-56 bg-cover bg-center rounded-xl"
            :style="{ backgroundImage: `url(${recipe.imageUrl})` }"
          >
            <p class="relative top-44 bg-ivory text-center rounded-lg">
              {{ recipe.title }}
            </p>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  background-image: linear-gradient(
      180deg,
      rgba(224, 207, 196, 0.5),
      rgba(224, 207, 196, 0.5)
    ),
    url("../assets/image/backGroundhomepage.jpg");
  background-position: center;
  background-size: cover;
}

.mainTitle {
  background-color: rgba(255, 255, 247, 0.6);
}
</style>
