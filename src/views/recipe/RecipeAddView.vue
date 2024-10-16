<script setup>
import { onMounted, ref } from "vue";
import RecipeApi from "../../service/RecipeApi";
import { useUserStore } from "../../stores/user";
import { useToast } from "vue-toast-notification";
import router from "../../router";

const userStore = useUserStore();
const $toast = useToast();

onMounted(() => {
  getCategories();
  getTypes();
});

const notifyMessage = (type, message) => {
  $toast.open({
    message: message,
    type: type,
    duration: 5000,
  });
};

const user = localStorage.getItem("user");

const getCategories = () => {
  RecipeApi.categories().then((response) => {
    categories.value = response.data.categories;
  });
};

const getTypes = () => {
  RecipeApi.types().then((response) => {
    types.value = response.data.types;
  });
};

const categories = ref([]);
const types = ref([]);

const formRecipe = ref({
  user: JSON.parse(user).email,
  title: null,
  description: null,
  protein: null,
  carbs: null,
  fat: null,
  calories: null,
  ingredient: [{ name: "", quantity: null }],
  step: [{ name: "" }],
  categories: [],
  type: [],
  forHowManyPeople: null,
  imageUrl: null,
});

function handleRecipe() {
  RecipeApi.new(formRecipe.value)
    .then((res) => {
      notifyMessage(res.data.status, res.data.message);
      router.push({ name: "profile" });
    })
    .catch((error) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      notifyMessage("error", errorMessage);
    });
}

let ingredientCounter = ref(0);
let stepCounter = ref(0);

function addIngredient() {
  ingredientCounter.value++;
  formRecipe.value.ingredient.push({ name: "" });
}

function removeIngredient(index) {
  formRecipe.value.ingredient.splice(index, 1);
  ingredientCounter.value--;
}

function addStep() {
  stepCounter.value++;
  formRecipe.value.step.push({ name: "" });
}

function removeStep(index) {
  formRecipe.value.step.splice(index, 1);
  stepCounter.value--;
}
</script>

<template>
  <div class="flex flex-col justify-center items-center bg-ivory text-lightJet">
    <h1 class="text-5xl mt-10 font-Fontin pb-4">Je créer ma recette</h1>

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

      <div class="">
        <textarea
          class="font-Montserrat input input-bordered border-2 w-full indent-2 rounded-lg border-lightJet p-3 bg-ivory my-2 mb-8"
          placeholder="Description de la recette"
          v-model="formRecipe.description"
        ></textarea>
      </div>

      <div class="mb-6">
        <input
          class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
          v-model="formRecipe.forHowManyPeople"
          type="number"
          min="1"
          placeholder="Nombre de personne"
        />
      </div>

      <div class="mb-6">
        <input
          class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
          v-model="formRecipe.protein"
          type="number"
          min="0"
          placeholder="Protéine (en gramme)"
        />
      </div>

      <div class="mb-6">
        <input
          class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
          v-model="formRecipe.carbs"
          min="0"
          type="number"
          placeholder="Glucides (en gramme)"
        />
      </div>

      <div class="mb-6">
        <input
          class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
          v-model="formRecipe.fat"
          type="number"
          placeholder="Lipides (en gramme)"
        />
      </div>

      <div class="mb-6">
        <input
          class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
          v-model="formRecipe.calories"
          min="0"
          type="number"
          placeholder="Calories (en Kcal)"
        />
      </div>
      <div class="mb-6">
        <input
          class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
          v-model="formRecipe.imageUrl"
          type="text"
          placeholder="Lien de l'image"
        />
      </div>
      <div class="grid grid-cols-2 gap-8 mb-12">
        <div>
          <h2
            class="mt-10 text-3xl font-Fontin border-t-2 border-lightJet p-10 text-center"
          >
            Ingrédients
          </h2>
          <div id="ingredient">
            <div
              v-for="(ingredient, index) in formRecipe.ingredient"
              :key="index"
              class="mb-6 flex items-start"
            >
              <div class="flex flex-col">
                <div class="flex-grow mr-4">
                  <label class="block mb-1">{{
                    index === 0 ? "Ingrédient 1" : `Ingrédient ${index + 1}`
                  }}</label>
                  <input
                    class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
                    v-model="formRecipe.ingredient[index].name"
                    type="text"
                    placeholder="Ingrédient"
                  />
                </div>

                <input
                  class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
                  v-model="formRecipe.ingredient[index].quantity"
                  type="text"
                  placeholder="Quantité"
                />
                <button
                  type="button"
                  @click="removeIngredient(index)"
                  class="ml-2 text-red-500 hover:text-red-700"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>

          <button
            @click="addIngredient"
            type="button"
            class="text-darkJet bg-melon p-1 rounded-lg px-4"
          >
            Ajouter un ingrédient
          </button>
        </div>

        <div>
          <h2
            class="mt-10 text-3xl font-Fontin border-t-2 border-lightJet p-10 text-center"
          >
            Étapes
          </h2>

          <div id="step">
            <div
              v-for="(step, index) in formRecipe.step"
              :key="index"
              class="mb-6"
            >
              <label class="block mb-1">{{
                index === 0 ? "Étape 1" : `Étape ${index + 1}`
              }}</label>
              <textarea
                class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
                v-model="formRecipe.step[index].description"
                placeholder="Étape"
              />

              <button
                type="button"
                @click="removeStep(index)"
                class="ml-2 text-red-500 hover:text-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>

          <button
            @click="addStep"
            type="button"
            class="text-darkJet bg-melon p-1 rounded-lg px-4"
          >
            Ajouter une étape
          </button>
        </div>
      </div>

      <div
        class="grid grid-cols-2 gap-8 mb-12 border-b-2 border-lightJet w-full text-center"
      >
        <div>
          <h2
            class="mt-10 text-3xl font-Fontin border-t-2 border-lightJet p-10"
          >
            Catégories
          </h2>

          <div id="categories">
            <div
              v-for="(category, index) in categories"
              :key="index"
              class="mb-4 flex items-center"
            >
              <label class="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="formRecipe.categories"
                  :value="category.name"
                  class="mr-2"
                />
                <span>{{ category.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <h2
            class="text-center mt-10 text-3xl font-Fontin border-t-2 border-lightJet p-10"
          >
            Types
          </h2>

          <div id="types">
            <div
              v-for="(type, index) in types"
              :key="index"
              class="mb-4 flex items-center"
            >
              <label class="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="formRecipe.type"
                  :value="type.name"
                  class="mr-2"
                />
                <span>{{ type.name }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="bg-melon hover:bg-tomato hover:text-ivory text-darkJet font-bold p-1 px-4 rounded-lg mb-4"
      >
        Je créer ma recette
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
