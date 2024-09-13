<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();


const formLogin = ref({
  email: null,
  password: null,
});

function login() {
  // userStore.login(formLogin.value);
  console.log(formLogin.value);
}

</script>

<template>
  <div
    class="flex flex-col justify-center items-center h-screen bg-ivory text-lightJet"
  >
    <h1 class="text-5xl m-10 font-Fontin">Se connecter</h1>
    <form
      @submit.prevent="login"
      class="flex flex-col justify-center items-center border-y-2 border-lightJet p-10"
    >
      <div class="mb-4">
        <input
          type="text"
          v-model="formLogin.email"
          placeholder="Adresse email"
          required
          class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
        />
      </div>
      <div class="mb-6">
        <input
          class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
          v-model="formLogin.password"
          required
          id="password"
          type="password"
          placeholder="Mot de passe"
        />
      </div>
      <button type="submit" class="text-darkJet bg-melon p-1 rounded-lg px-4">
        Se connecter
      </button>
    </form>
    <router-link to="/register" class="font-Montserrat pt-4"
      >Créer un compte</router-link
    >
  </div>
</template>

<style lang="scss" scoped></style>
font-Montserrat
