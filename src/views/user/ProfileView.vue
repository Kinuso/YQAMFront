<script setup>
import { useUserStore } from "../../stores/user";
import UserApi from "../../service/UserApi";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toast-notification";
import RecipeApi from "../../service/RecipeApi";
import UpVoteApi from "../../service/UpVoteApi";
const $toast = useToast();

const user = ref(JSON.parse(localStorage.getItem("user")));
const userStore = useUserStore();
const userRecipes = ref({});
const likedRecipes = ref({});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;

const formLogin = ref({
  email: JSON.parse(localStorage.getItem("user")).email,
  password: null,
  passwordValidate: null,
  firstname: JSON.parse(localStorage.getItem("user")).firstname,
  lastname: JSON.parse(localStorage.getItem("user")).lastname,
});

const updateAccount = ref(false);
const showRecipeDeleteModal = ref(false);
const showAccountDeleteModal = ref(false);
const showEditModal = ref(false);

const recipeToDelete = ref(null);
const accountToDelete = ref({
  email: JSON.parse(localStorage.getItem("user")).email,
});

const notifyMessage = (type, message) => {
  $toast.open({
    message: message,
    type: type,
    duration: 5000,
  });
};

onMounted(() => {
  getUserRecipes();
  getCategories();
  getTypes();
  getLikedRecipes();
});
function validateEmail(email) {
  return emailRegex.test(email);
}

function validatePassword(password) {
  return passwordRegex.test(password);
}

function handleUpdate() {
  if (!validateEmail(formLogin.value.email)) {
    notifyMessage("warning", "Veuillez entrer une adresse email valide");
    return;
  }
  if (!validatePassword(formLogin.value.password)) {
    notifyMessage(
      "warning",
      "Mot de passe trop faible (Une longueur de 8 caractères minimum, une majuscule, une minuscule, un numéro et un caractère spécial sont attendus)"
    );
    return;
  }

  UserApi.updateAccount(formLogin.value).then((res) => {
    if (res.data == "error") {
      notifyMessage(res.data.status, res.data.message);
    } else {
      notifyMessage(res.data.status, res.data.message);
      localStorage.removeItem("user");
      location.reload();
      router.push("/login");
    }
  });
}

const showAccountUpdateForm = () => {
  if (updateAccount.value === true) {
    updateAccount.value = false;
  } else {
    updateAccount.value = true;
  }
};

const getUserRecipes = () => {
  UserApi.getUserRecipes(user.value.id).then((res) => {
    userRecipes.value = res.data.recipes;
  });
};

const handleDeleteRecipe = () => {
  UserApi.deleteRecipe(recipeToDelete.value).then((res) => {
    notifyMessage(res.data.status, res.data.message);
    showRecipeDeleteModal.value = false;
    getUserRecipes();
  });
};

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
  id: null,
  user: null,
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

function handleRecipeUpdate() {
  delete formRecipe.value.upVote;
  RecipeApi.update(formRecipe.value)
    .then((res) => {
      notifyMessage(res.data.status, res.data.message);
      showEditModal.value = false;
      getUserRecipes();
    })
    .catch((error) => {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      notifyMessage("error", errorMessage);
    });
}

let ingredientCounter = ref(0);
let stepCounter = ref(0);

function deleteAccount() {
  UserApi.deleteAccount(accountToDelete.value)
    .then((res) => {
      UserApi.logOut();
      router.push({ name: "home" });
      notifyMessage(res.data.status, res.data.message);
    })
    .catch((error) => {
      const errorMessage = error.response.data.message;
      notifyMessage("error", errorMessage);
    });
}

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

const openEditModal = (recipe) => {
  showEditModal.value = true;
  formRecipe.value = recipe;
  formRecipe.value.user = user.value.email;
};

const getLikedRecipes = () => {
  UpVoteApi.likedRecipe(user.value.id).then((res) => {
    likedRecipes.value = res.data.recipes;
  });
};
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold text-center text-darkJet mb-8">Mon Profil</h1>
    <div class="flex flex-col items-center mb-8">
      <h2 class="text-xl font-semibold">
        {{ user.firstname }} {{ user.lastname }}
      </h2>

      <p class="text-sm text-gray-500">{{ user.email }}</p>
      <button
        @click="showAccountDeleteModal = true"
        class="text-tomato hover:text-darkJet transition-colors duration-200 ease-in-out mb-8"
      >
        Supprimer mon compte
      </button>
      <button
        @click="showAccountUpdateForm"
        class="text-melon hover:text-darkJet transition-colors duration-200 ease-in-out mb-8"
      >
        Modifier mon compte
      </button>

      <div class="flex flex-col justify-start">
        <form
          v-if="updateAccount"
          @submit.prevent="handleUpdate"
          class="space-y-6"
        >
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Adresse Email</label
            >
            <input
              id="email"
              type="email"
              v-model="formLogin.email"
              required
              class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
            />
          </div>

          <div>
            <label
              for="firstname"
              class="block text-sm font-medium text-gray-700"
              >Prénom</label
            >
            <input
              id="firstname"
              type="text"
              v-model="formLogin.firstname"
              required
              class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
            />
          </div>

          <div>
            <label
              for="lastname"
              class="block text-sm font-medium text-gray-700"
              >Nom</label
            >
            <input
              id="lastname"
              type="text"
              v-model="formLogin.lastname"
              required
              class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
            />
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >Mot de passe</label
            >
            <input
              id="password"
              type="password"
              v-model="formLogin.password"
              required
              class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
            />
          </div>

          <div>
            <label
              for="passwordVerify"
              class="block text-sm font-medium text-gray-700"
              >Confirmation mot de passe</label
            >
            <input
              id="passwordVerify"
              type="password"
              v-model="formLogin.passwordValidate"
              required
              class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
            />
          </div>

          <button
            type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-melon hover:bg-darkJet focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-melon"
          >
            Mettre à jour le profil
          </button>
        </form>
      </div>
    </div>
    <div>
      <div class="bg-white rounded-lg shadow-md p-8">
        <h2 class="font-Fontin text-2xl indent-5">Recettes aimées</h2>
        <div
          class="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          <RouterLink
            v-for="(recipe, index) in likedRecipes"
            :key="index"
            class="my-1 mx-5 font-Fontin rounded-xl bg-melon text-lightJet hover:text-melon hover:bg-darkJet"
            :to="{
              name: 'show-recipe',
              params: { title: recipe.recipe.title },
            }"
          >
            <div
              class="w-56 h-56 bg-cover bg-center rounded-xl"
              :style="{ backgroundImage: `url(${recipe.recipe.imageUrl})` }"
            >
              <p class="relative top-44 bg-ivory text-center">
                {{ recipe.recipe.title }}
              </p>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow-md p-8">
      <h2 class="font-Fontin text-2xl indent-5">Toutes mes recettes</h2>
      <div class="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <RouterLink
          v-for="(recipe, index) in userRecipes"
          :key="index"
          class="w-full h-32 bg-melon text-lightJet hover:text-darkJet hover:bg-darkJet relative text-center"
          :to="{ name: 'show-recipe', params: { title: recipe.title } }"
        >
          <div
            class="h-full bg-cover bg-center rounded-xl overflow-hidden"
            :style="{ backgroundImage: `url(${recipe.imageUrl})` }"
          >
            <div
              class="absolute bottom-0 left-0 w-full p-2 bg-opacity-50 bg-white flex flex-col justify-between"
            >
              <p class="font-semibold mb-2">{{ recipe.title }}</p>
              <div class="flex justify-evenly">
                <button @click.prevent="openEditModal(recipe)">
                  <img
                    src="../../assets/editer.png"
                    alt=""
                    class="w-6 h-6 hover:scale-125 transition duration-150 ease-in-out"
                  />
                </button>

                <button
                  @click.prevent="
                    showRecipeDeleteModal = true;
                    recipeToDelete = recipe.id;
                  "
                >
                  <img
                    src="../../assets/corbeille.png"
                    alt=""
                    class="w-6 h-6 hover:scale-125 transition duration-150 ease-in-out"
                  />
                </button>
              </div>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>

    <div
      v-if="showRecipeDeleteModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      @click.self="showModal = false"
    >
      <div class="bg-white rounded-lg shadow-lg mx-auto p-6">
        <h2 class="text-xl font-semibold mb-4">Supprimer la recette ?</h2>
        <div class="flex flex-row justify-around">
          <button
            @click="handleDeleteRecipe()"
            class="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
          >
            Oui
          </button>
          <button
            @click="showRecipeDeleteModal = false"
            class="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Non
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showAccountDeleteModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      @click.self="showModal = false"
    >
      <div class="bg-white rounded-lg shadow-lg mx-auto p-6">
        <h2 class="text-xl font-semibold mb-4">Supprimer le compte ?</h2>
        <p>
          (La suppression du compte n'est pas reversible, et entrainera la
          suppression des recettes associée à celui-ci)
        </p>
        <div class="flex flex-row justify-around">
          <button
            @click="
              deleteAccount();
              showAccountDeleteModal = false;
            "
            class="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
          >
            Oui
          </button>
          <button
            @click="showAccountDeleteModal = false"
            class="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Non
          </button>
        </div>
      </div>
    </div>

    <div>
      <form
        v-if="showEditModal"
        @submit.prevent="handleRecipeUpdate"
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
          Mettre à jour la recette
        </button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
