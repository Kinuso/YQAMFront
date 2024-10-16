<script setup>
import { onMounted, ref } from "vue";
import RecipeApi from "../../service/RecipeApi";

const searchData = ref("");
const recipes = ref({});
const loading = ref(false);
var timeout;

const handleSearch = () => {
  clearTimeout(timeout);
  loading.value = true;
  timeout = setTimeout(() => {
    RecipeApi.search(searchData.value).then((res) => {
      recipes.value = res.data.recipes;
      loading.value = false;
    });
  }, 1000);
};

const resetSearch = () => {
  searchData.value = "";
  handleSearch();
};

handleSearch();
</script>

<template>
  <div class="mb-8 flex justify-center items-center">
    <div class="mt-10 flex space-x-2 w-full max-w-xs mx-auto">
      <input
        type="search"
        v-model="searchData"
        @keyup="handleSearch"
        class="font-Montserrat w-full px-4 py-2 text-darkJet bg-melon rounded-lg focus:outline-none focus:ring-2 focus:ring-darkJet transition-colors duration-200 ease-in-out"
        placeholder="Rechercher une recette..."
      />
      <button
        class="font-Montserrat px-4 py-2 bg-melon text-lightJet rounded-lg hover:bg-darkJet hover:text-melon transition-colors duration-200 ease-in-out"
        @click="resetSearch"
      >
        Réinitialiser
      </button>
    </div>
  </div>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-10 font-Montserrat"
  >
    <p class="text-xl font-Fontin text-center" v-if="loading">
      Recherche en cours...
    </p>
    <RouterLink
      v-else-if="recipes[0]"
      v-for="(recipe, index) in recipes"
      :key="index"
      class="rounded-xl bg-melon text-lightJet hover:text-melon hover:bg-darkJet transition-colors duration-200 ease-in-out pb-1"
      :to="{ name: 'show-recipe', params: { title: recipe.title } }"
    >
      <div class="h-full flex flex-col overflow-hidden">
        <div
          class="w-full h-48 bg-cover bg-center rounded-t-xl"
          :style="{ backgroundImage: `url(${recipe.imageUrl})` }"
        ></div>
        <div class="flex-grow p-4 bg-white rounded-b-xl shadow-md">
          <h3 class="text-xl font-bold mb-2 font-Fontin">{{ recipe.title }}</h3>
          <p class="mb-4 text-gray-600">{{ recipe.description }}</p>
          <div class="mb-2">
            <span class="font-semibold">Types:</span>
            <ul class="list-disc list-inside ml-4">
              <li v-for="type in recipe.type" :key="type.id">
                {{ type.name }}
              </li>
            </ul>
          </div>
          <div>
            <span class="font-semibold">Categories:</span>
            <ul class="list-disc list-inside ml-4">
              <li v-for="category in recipe.categories" :key="category.id">
                {{ category.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </RouterLink>
    <p v-else class="text-xl font-Fontin text-center">
      Aucun résultat pour cette recherche
    </p>
  </div>
</template>

<style scoped>
::placeholder {
  color: #383235;
  font-size: 15px;
}
</style>
