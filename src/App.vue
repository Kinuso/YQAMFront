<script setup>
import { RouterLink, RouterView } from "vue-router";
import { getActivePinia } from "pinia";
import UserApi from "./service/UserApi";
import { ref } from "vue";

const user = localStorage.getItem("user");

function logout() {
  UserApi.logOut();
  // getActivePinia()._s.forEach((store) => store.$reset());
}

const currentYear = ref(new Date().getFullYear());
const isMenuOpen = ref(false);
</script>

<template>
  <header
    class="bg-ivory h-12 flex justify-between items-center drop-shadow-sm sticky top-0 w-screen z-10"
  >
    <div class="ml-4">
      <RouterLink to="/">
        <h1 class="font-Fontin text-xl text-tomato p-5">Y'a quoi à manger ?</h1>
      </RouterLink>
    </div>

    <div
      class="md:hidden mr-4 cursor-pointer"
      @click="isMenuOpen = !isMenuOpen"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    </div>

    <nav
      class="hidden md:flex justify-around items-center font-Fontin text-sm w-full"
    >
      <RouterLink class="p-3" to="/most-recent">Les plus récents</RouterLink>
      <RouterLink v-if="user" class="p-3" to="/recipe/add"
        >Ajouter ma recette</RouterLink
      >
      <RouterLink class="p-3" to="/search">Je recherche mon plat</RouterLink>
      <RouterLink v-if="!user" class="p-3" to="/login">Connexion</RouterLink>
      <div class="cursor-pointer p-3" v-else @click="logout">Déconnexion</div>
      <RouterLink v-if="user" class="p-3" to="/profile">Profil</RouterLink>
    </nav>

    <nav
      v-if="isMenuOpen"
      class="md:hidden absolute top-12 left-0 w-full bg-ivory shadow-lg flex flex-col items-center font-Fontin text-sm"
    >
      <RouterLink class="p-3 w-full text-center border-b" to="/most-recent"
        >Les plus récents</RouterLink
      >
      <RouterLink
        v-if="user"
        class="p-3 w-full text-center border-b"
        to="/recipe/add"
        >Ajouter ma recette</RouterLink
      >
      <RouterLink class="p-3 w-full text-center border-b" to="/search"
        >Je recherche mon plat</RouterLink
      >
      <RouterLink
        v-if="!user"
        class="p-3 w-full text-center border-b"
        to="/login"
        >Connexion</RouterLink
      >
      <div
        class="cursor-pointer p-3 w-full text-center border-b"
        v-else
        @click="logout"
      >
        Déconnexion
      </div>
      <RouterLink v-if="user" class="p-3 w-full text-center" to="/profile"
        >Profil</RouterLink
      >
    </nav>
  </header>

  <main>
    <RouterView></RouterView>
  </main>

  <footer class="bg-darkJet text-lightJet p-8 mt-auto">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap justify-between items-center mb-6">
        <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-6 md:mb-0">
          <h2 class="uppercase font-bold mb-2 tracking-wider">À propos</h2>
          <p class="mt-2">
            Y'a quoi à manger ? est un site communautaire dédié aux amateurs de
            cuisine. Nous proposons des recettes faciles et rapides pour tous
            les goûts, avec une grande variété de plats, des entrées aux
            desserts.
          </p>
        </div>
        <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-6 md:mb-0">
          <h2 class="uppercase font-bold mb-2 tracking-wider">Liens utiles</h2>
          <ul class="list-none mb-0">
            <li class="mt-2">
              <RouterLink
                class="p-3 text-melon hover:text-tomato"
                to="/politique-confidentialite"
                >Politique de confidentialité</RouterLink
              >
            </li>
            <li class="mt-2">
              <RouterLink
                class="p-3 text-melon hover:text-tomato"
                to="/condition-utilisation"
                >Conditions d'utilisation</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 mt-5 border-t border-gray-300">
      <div class="flex flex-wrap items-center justify-between mt-6">
        <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-6 md:mb-0">
          <span>&copy; {{ new Date().getFullYear() }} Y'a quoi à manger ?</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: #333;
  color: #fff;
}

::placeholder {
  color: #383235;
  font-size: 10px;
}
</style>
