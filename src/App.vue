<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header class="bg-ivory h-12 flex drop-shadow-sm">
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
      <RouterLink to="/login">Connexion</RouterLink>
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
