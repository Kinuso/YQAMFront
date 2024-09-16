<script setup>
import { RouterLink, RouterView } from "vue-router";
import { getActivePinia } from "pinia";
import router from "./router";
import UserApi from "./service/UserApi";

const user = localStorage.getItem("user");

function logout(params) {
  UserApi.logOut();
  getActivePinia()._s.forEach((store) => store.$reset());
  window.location.reload();
}
</script>

<template>
  <header class="bg-ivory h-12 flex drop-shadow-sm sticky top-0">
    <nav class="flex justify-around w-full items-center font-Fontin text-xs">
      <RouterLink to="/" class="mr-4"
        ><p class="font-Fontin text-xl text-tomato pr-40">
          Y'a quoi à manger ?
        </p></RouterLink
      >
      <RouterLink to="/filter">Filtrer les plats</RouterLink>
      <RouterLink to="/most-rated">Les mieux notés</RouterLink>
      <RouterLink to="/most-recent">Les plus récents</RouterLink>
      <input
        type="text"
        placeholder="Je cherche mon plat..."
        class="rounded-2xl bg-melon text-darkJet indent-2 border-tomato border-4 outline-none"
      />
      <div v-if="!user"><RouterLink to="/login">Connexion</RouterLink></div>
      <div class="cursor-pointer" v-else @click="logout">Deconnexion</div>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>
::placeholder {
  color: #383235;
  font-size: 10px;
}
</style>
