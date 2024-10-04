<script setup>
import RecipeApi from "../../service/RecipeApi";
import UpVoteApi from "../../service/UpVoteApi";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";

console.log("efmjjezafj");
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

const isLogged = () => {
  if (localStorage.getItem("user")) {
    upVoteCredentials.value.userId = JSON.parse(
      localStorage.getItem("user")
    ).id;
    findUpvote();
    return true;
  } else {
    return false;
  }
};

onMounted(() => {
  getRecipe();
});

const getRecipe = () => {
  const title = router.currentRoute.value.params.title;
  RecipeApi.specific(title).then((res) => {
    recipe.value = res.data.recipe;
    upVoteCredentials.value.recipeId = res.data.recipe.id;
  });
};

const upVoteRecipe = () => {
  if (!isLogged()) {
    notifyMessage(
      "warning",
      "Veuillez vous connecter pour recommander la recette"
    );
    return;
  }
  89;
  loadingUpVote.value = true;
  UpVoteApi.upVoteRecipe(upVoteCredentials.value).then((res) => {
    notifyMessage("success", "Recommandation ajoutée pour cette recette !");
    findUpvote();
    loadingUpVote.value = false;
  });
};

const removeUpVoteRecipe = () => {
  loadingUpVote.value = true;
  UpVoteApi.removeUpVoteRecipe(upVoteCredentials.value).then((res) => {
    notifyMessage("success", "Recommandation retirée pour cette recette !");
    findUpvote();
    loadingUpVote.value = false;
  });
};

const findUpvote = () => {
  UpVoteApi.isUpvotedByUser(upVoteCredentials.value).then((res) => {
    isUpVoted.value = res.data.result;
  });
};
</script>
<template>
  <div class="container mx-auto p-8 bg-ivory" v-if="recipe">
    <h1 class="text-3xl font-bold mb-8">{{ recipe.title }}</h1>
    <div v-if="!loadingUpVote">
      <button @click="upVoteRecipe" v-if="!isUpVoted">
        J'aime cette recette !
      </button>
      <button @click="removeUpVoteRecipe" v-else>
        Je n'aime plus cette recette</button
      ><br />
    </div>
    <span class="text-sm">Pour {{ recipe.forHowManyPeople }} personnes</span>
    <div
      class="w-56 h-56 bg-cover bg-center rounded-xl"
      :style="{ backgroundImage: `url(${recipe.imageUrl})` }"
    ></div>
    <div class="flex justify-between mb-8">
      <div class="flex flex-wrap gap-4">
        <div class="flex items-center">
          <span class="text-sm">Calories:</span>
          <span class="text-sm ml-2">{{ recipe.calories }}</span>
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
