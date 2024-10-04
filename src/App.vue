<script setup>
import { RouterLink, RouterView } from "vue-router";
import { getActivePinia } from "pinia";
import UserApi from "./service/UserApi";

const user = localStorage.getItem("user");

function logout() {
  UserApi.logOut();
  // getActivePinia()._s.forEach((store) => store.$reset());
}
</script>

<template>
  <header class="bg-ivory h-12 flex drop-shadow-sm sticky top-0 w-screen z-10">
    <nav class="flex justify-around items-center font-Fontin text-xs w-full">
      <RouterLink to="/" class="mr-4"
        ><p class="font-Fontin text-xl text-tomato">
          Y'a quoi à manger ?
        </p></RouterLink
      >
      <RouterLink class="p-3" to="/most-rated">Les mieux notés</RouterLink>
      <RouterLink class="p-3" to="/most-recent">Les plus récents</RouterLink>
      <RouterLink v-if="user" class="p-3" to="/recipe/add"
        >Ajouter ma recette</RouterLink
      >
      <input
        type="text"
        placeholder=" Je cherche mon plat..."
        class="rounded-2xl bg-melon text-darkJet indent-2 border-tomato border-4 outline-none p-1"
      />
      <RouterLink v-if="!user" class="p-3" to="/login">Connexion</RouterLink>
      <div class="cursor-pointer p-3" v-else @click="logout">Deconnexion</div>
    </nav>
  </header>
  <RouterView></RouterView>
</template>

<style scoped>
::placeholder {
  color: #383235;
  font-size: 10px;
}
</style>
