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
</script>

<template>
  <header class="bg-ivory h-12 flex drop-shadow-sm sticky top-0 w-screen z-10">
    <nav class="flex justify-around items-center font-Fontin text-sm w-full">
      <RouterLink to="/" class="mr-4"
        ><p class="font-Fontin text-xl text-tomato">
          Y'a quoi à manger ?
        </p></RouterLink
      >
      <RouterLink class="p-3" to="/most-recent">Les plus récents</RouterLink>
      <RouterLink v-if="user" class="p-3" to="/recipe/add"
        >Ajouter ma recette</RouterLink
      >
      <RouterLink class="p-3" to="/search">Je recherche mon plat</RouterLink>
      <RouterLink v-if="!user" class="p-3" to="/login">Connexion</RouterLink>
      <div class="cursor-pointer p-3" v-else @click="logout">Deconnexion</div>
      <RouterLink v-if="user" class="p-3" to="/profile">Profil</RouterLink>
    </nav>
  </header>
  <RouterView></RouterView>
  <footer class="bg-darkJet text-lightJet p-8 mt-auto">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap justify-between items-center mb-6">
        <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-6 md:mb-0">
          <h5 class="uppercase font-bold mb-2 tracking-wider">À propos</h5>
          <p class="mt-2">
            Y'a quoi à manger ? est un site communautaire dédié aux amateurs de
            cuisine. Nous proposons des recettes faciles et rapides pour tous
            les goûts.
          </p>
        </div>
        <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-6 md:mb-0">
          <h5 class="uppercase font-bold mb-2 tracking-wider">Liens utiles</h5>
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
