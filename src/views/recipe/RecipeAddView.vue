<script setup>
import { ref } from "vue";
import RecipeApi from "@/service/RecipeApi";

onMounted(() => {

  try {
    
  } catch (e) {
    
  }

})


const formRecipe = ref({
  title: null,
  description: null,
  protein: null,
  carbs: null,
  fat: null,
  calories: null,
  ingredients: [{name: ""}],
  steps: [{name: ""}],
});

function handleRecipe() {
  console.log(formRecipe.value);
}

let ingredientCounter = ref(0);
let stepCounter = ref(0);

function addIngredient() {
  ingredientCounter.value++;
  formRecipe.value.ingredients.push({ name: "" });
}

function removeIngredient(index) {
  formRecipe.value.ingredients.splice(index, 1);
  ingredientCounter.value--;
}

function addStep() {
  stepCounter.value++;
  formRecipe.value.steps.push({ name: "" });
}

function removeStep(index) {
  formRecipe.value.steps.splice(index, 1);
  stepCounter.value--;
}
</script>

<template>
  <div
    class="flex flex-col justify-center items-center h-screen bg-ivory text-lightJet mt-20"
  >
    <h1 class="text-5xl mt-10 font-Fontin">Je créer ma recette</h1>

    <form
      @submit.prevent="handleRecipe"
      class="flex flex-col justify-center items-center border-y-2 border-lightJet p-10"
    >
      <div class="mb-6">
        <input
          type="text"
          v-model="formRecipe.title"
          placeholder="Titre"
          class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
        />
      </div>

      <div class="mb-6">
        <textarea
          class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
          placeholder="Description de la recette"
          v-model="formRecipe.description"
        ></textarea>
      </div>

      <div class="mb-6">
        <input
          class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
          v-model="formRecipe.protein"
          type="text"
          placeholder="Protéine (en gramme)"
        />
      </div>

      <div class="mb-6">
        <input
          class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
          v-model="formRecipe.carbs"
          type="text"
          placeholder="Glucides (en gramme)"
        />
      </div>

      <div class="mb-6">
        <input
          class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
          v-model="formRecipe.fat"
          type="text"
          placeholder="Lipides (en gramme)"
        />
      </div>

      <div class="mb-6">
        <input
          class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
          v-model="formRecipe.calories"
          type="text"
          placeholder="Calories (en Kcal)"
        />
      </div>

      <h2 class="mt-10 text-3xl font-Fontin border-t-2 border-lightJet p-10">
        Ingrédients
      </h2>

      <div id="ingredient">
        <div
          v-for="(ingredient, index) in formRecipe.ingredients"
          :key="index"
          class="mb-6"
        >
          <input
            class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
            v-model="formRecipe.ingredients[index].name"
            type="text"
            placeholder="Ingrédient"
          />

          <button
            @click="removeIngredient(index)"
            class="ml-2 text-red-500 hover:text-red-700"
          >
            Supprimer
          </button>
        </div>
      </div>

      <button
        @click="addIngredient"
        class="bg-melon hover:bg-tomato text-darkJet font-bold p-1 px-4 rounded-lg mb-4"
      >
        Ajouter un ingrédient
      </button>

      <h2 class="mt-10 text-3xl font-Fontin border-t-2 border-lightJet p-10">
        Étapes
      </h2>

      <div id="step">
        <div
          v-for="(step, index) in formRecipe.steps"
          :key="index"
          class="mb-6"
        >
          <label class="block mb-1">{{
            index === 0 ? "Étape 1" : `Étape ${index + 1}`
          }}</label>
          <input
            class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
            v-model="formRecipe.steps[index].name"
            type="text"
            placeholder="Ingrédient"
          />

          <button
            @click="removeStep(index)"
            class="ml-2 text-red-500 hover:text-red-700"
          >
            Supprimer
          </button>
        </div>
      </div>

      <button
        @click="addStep"
        class="bg-melon hover:bg-tomato text-darkJet font-bold p-1 px-4 rounded-lg mb-4"
      >
        Ajouter une étape
      </button>

      <button type="submit" class="text-darkJet bg-melon p-1 rounded-lg px-4">
        Je créer ma recette
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
