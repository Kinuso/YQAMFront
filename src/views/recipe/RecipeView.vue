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
    <div class="flex align-middle">
      <h1 class="text-3xl font-bold mb-8">{{ recipe.title }}</h1>
      <div
        v-if="!loadingUpVote"
        class="text-2xl pl-5 hover:cursor-pointer h-fit"
      >
        <div v-if="!isUpVoted" class="flex flex-row" @click="upVoteRecipe">
          <img
            src="../../assets/coeur.png"
            alt="aimer la recette"
            class="pr-3"
          />
          <button>J'aime cette recette !</button>
        </div>
        <div v-else class="flex flex-row" @click="removeUpVoteRecipe">
          <img src="../../assets/coeur-full.png" alt="" class="pr-3" />
          <button>Je n'aime plus cette recette</button>
        </div>
      </div>
    </div>  
    <div
      class="w-56 h-56 bg-cover bg-center rounded-xl"
      :style="{ backgroundImage: `url(${recipe.imageUrl})` }"
    ></div>
    <span class="text-xl">Pour {{ recipe.forHowManyPeople }} personnes</span
    ><br /><br />
    <div class="flex justify-between mb-8">
      <div class="flex flex-wrap gap-4">
        <div class="flex items-center">
          <span class="text-sm">Calories:</span>
          <span class="text-sm ml-2">{{ recipe.calories }} kcal</span>
        </div>
        <div class="flex items-center">
          <span class="text-sm">Glucides:</span>
          <span class="text-sm ml-2">{{ recipe.carbs }}g</span>
        </div>
        <div class="flex items-center">
          <span class="text-sm">Proteines:</span>
          <span class="text-sm ml-2">{{ recipe.protein }}g</span>
        </div>
        <div class="flex items-center">
          <span class="text-sm">Matières grasses:</span>
          <span class="text-sm ml-2">{{ recipe.fat }}g</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-8">
      <div>
        <h3 class="text-xl mb-2">Categories:</h3>
        <ul class="space-y-1">
          <li
            v-for="(category, index) in recipe.categories"
            :key="index"
            class="px-2 py-1 bg-gray-200 rounded"
          >
            {{ category.name }}
          </li>
        </ul>
      </div>
      <div>
        <h3 class="text-xl mb-2">Types:</h3>
        <ul class="space-y-1">
          <li
            v-for="(type, index) in recipe.type"
            :key="index"
            class="px-2 py-1 bg-gray-100 rounded"
          >
            {{ type.name }}
          </li>
        </ul>
      </div>
    </div>

    <h3 class="text-xl mb-4">Ingrédients:</h3>
    <ul class="space-y-1">
      <li
        v-for="(ingredient, index) in recipe.ingredient"
        :key="index"
        class="px-2 py-1 bg-gray-100 rounded"
      >
        {{ ingredient.quantity }} x {{ ingredient.name }}
      </li>
    </ul>

    <h3 class="text-xl mb-4 pt-10">Étape:</h3>
    <ol class="space-y-1">
      <li
        v-for="(step, index) in recipe.step"
        :key="index"
        class="px-2 py-1 bg-gray-100 rounded"
      >
        {{ index + 1 }}. {{ step.description }}
      </li>
    </ol>
  </div>
</template>

<style scoped>
/* Add any custom styles here */
</style>
