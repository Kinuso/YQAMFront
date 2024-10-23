<script setup>
import RecipeApi from "../../service/RecipeApi";
import UpVoteApi from "../../service/UpVoteApi";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";

const $toast = useToast();

const notifyMessage = (type, message) => {
  $toast.open({
    message: message,
    type: type,
    duration: 5000,
  });
};

const recipe = ref(null);
const router = useRouter();
const isUpVoted = ref(null);
const loadingUpVote = ref(false);
const upVoteCredentials = ref({
  userId: null,
  recipeId: null,
});
const isLoadingRecipe = ref(true);

const isLogged = () => {
  if (localStorage.getItem("user")) {
    upVoteCredentials.value.userId = JSON.parse(
      localStorage.getItem("user")
    ).id;
    return true;
  }
  return false;
};

onMounted(async () => {
  await getRecipe();
  if (isLogged()) {
    findUpvote();
  }
});

const getRecipe = async () => {
  const title = router.currentRoute.value.params.title;
  const res = await RecipeApi.specific(title);
  upVoteCredentials.value.recipeId = res.data.recipe.id;
  recipe.value = res.data.recipe;
  isLoadingRecipe.value = false;
};

const upVoteRecipe = () => {
  if (!isLogged()) {
    router.push({ name: "login" });
    return;
  }
  loadingUpVote.value = true;
  UpVoteApi.upVoteRecipe(upVoteCredentials.value).then((res) => {
    notifyMessage(
      "success",
      "Favoris ajoutée pour cette recette ! (Vous pouvez retrouver vos recettes favorites dans votre profil)"
    );
    findUpvote();
    loadingUpVote.value = false;
  });
};

const removeUpVoteRecipe = () => {
  loadingUpVote.value = true;
  UpVoteApi.removeUpVoteRecipe(upVoteCredentials.value).then((res) => {
    notifyMessage("success", "Favoris retirée pour cette recette ! ");
    findUpvote();
    loadingUpVote.value = false;
  });
};

const findUpvote = () => {
  if (!upVoteCredentials.value.recipeId) {
    return;
  }
  UpVoteApi.isUpvotedByUser(upVoteCredentials.value).then((res) => {
    isUpVoted.value = res.data.result;
  });
};
</script>

<template>
  <div class="container mx-auto p-8 bg-ivory" v-if="recipe">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-darkJet">{{ recipe.title }}</h1>
      <div v-if="!loadingUpVote" class="text-xl hover:cursor-pointer h-fit">
        <div
          v-if="!isUpVoted"
          class="flex flex-row items-center"
          @click="upVoteRecipe"
        >
          <img
            src="../../assets/coeur.png"
            alt="aimer la recette"
            class="mr-3 w-6 h-6"
          />
          <button class="bg-tomato text-white px-4 py-2 rounded">
            J'aime cette recette !
          </button>
        </div>
        <div
          v-else
          class="flex flex-row items-center"
          @click="removeUpVoteRecipe"
        >
          <img src="../../assets/coeur-full.png" alt="" class="mr-3 w-6 h-6" />
          <button class="bg-melon text-darkJet px-4 py-2 rounded">
            Je n'aime plus cette recette
          </button>
        </div>
      </div>
    </div>

    <div
      class="w-full h-64 bg-cover bg-center rounded-xl shadow-lg"
      :style="{ backgroundImage: `url(${recipe.imageUrl})` }"
    ></div>

    <div class="mt-8 flex justify-between items-center">
      <span class="text-xl text-darkJet"
        >Pour {{ recipe.forHowManyPeople }} personnes</span
      >
      <div class="flex gap-4">
        <div
          class="bg-lightJet p-2 px-4 rounded text-ivory border border-gray-300"
        >
          <span class="text-sm">Calories:</span>
          <span class="text-sm ml-2">{{ recipe.calories }} kcal</span>
        </div>
        <div
          class="bg-lightJet p-2 px-4 rounded text-ivory border border-gray-300"
        >
          <span class="text-sm">Glucides:</span>
          <span class="text-sm ml-2">{{ recipe.carbs }}g</span>
        </div>
        <div
          class="bg-lightJet p-2 px-4 rounded text-ivory border border-gray-300"
        >
          <span class="text-sm">Proteines:</span>
          <span class="text-sm ml-2">{{ recipe.protein }}g</span>
        </div>
        <div
          class="bg-lightJet p-2 px-4 rounded text-ivory border border-gray-300"
        >
          <span class="text-sm">Matières grasses:</span>
          <span class="text-sm ml-2">{{ recipe.fat }}g</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <div class="p-4 rounded shadow-md border border-gray-300">
        <h3 class="text-xl mb-2">Categories:</h3>
        <ul class="space-y-1">
          <li
            v-for="(category, index) in recipe.categories"
            :key="index"
            class="px-2 py-1 bg-melon rounded text-darkJet transition-colors duration-200 ease-in-out"
          >
            {{ category.name }}
          </li>
        </ul>
      </div>
      <div class="p-4 rounded shadow-md border border-gray-300">
        <h3 class="text-xl mb-2">Types:</h3>
        <ul class="space-y-1">
          <li
            v-for="(type, index) in recipe.type"
            :key="index"
            class="px-2 py-1 bg-melon rounded text-darkJet transition-colors duration-200 ease-in-out"
          >
            {{ type.name }}
          </li>
        </ul>
      </div>
    </div>

    <div class="mt-8">
      <h3 class="text-xl mb-4 text-darkJet">Ingrédients:</h3>
      <ul class="space-y-1">
        <li
          v-for="(ingredient, index) in recipe.ingredient"
          :key="index"
          class="px-2 py-1 bg-melon rounded text-darkJet hover:bg-tomato hover:text-white transition-colors duration-200 ease-in-out"
        >
          {{ ingredient.quantity }} x {{ ingredient.name }}
        </li>
      </ul>
    </div>

    <div class="mt-8">
      <h3 class="text-xl mb-4 text-darkJet">Étape:</h3>
      <ol class="space-y-1">
        <li
          v-for="(step, index) in recipe.step"
          :key="index"
          class="px-2 py-1 bg-lightJet rounded text-ivory border border-gray-300 transition-colors duration-200 ease-in-out"
        >
          {{ index + 1 }}. {{ step.description }}
        </li>
      </ol>
    </div>
  </div>
</template>
