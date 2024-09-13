<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email) {
  return emailRegex.test(email);
}

function login() {
  if (!validateEmail(formLogin.value.email)) {
    alert("Please enter a valid email address.");
    return;
  }
}

const formLogin = ref({
  email: null,
  password: null,
  passwordValidate: null,
  firstname: null,
  lastname: null,
});
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
          v-model="formLogin.firstname"
          placeholder="Prénom"
          required
          class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
        />
      </div>
      <div class="mb-6">
        <input
          class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
          v-model="formLogin.passwordValidate"
          required
          id="password"
          type="password"
          placeholder="Confirmation mot de passe"
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
      <div class="mb-6">
        <input
          class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
          v-model="formLogin.passwordValidate"
          required
          id="password"
          type="password"
          placeholder="Confirmation mot de passe"
        />
      </div>
      <button type="submit" class="text-darkJet bg-melon p-1 rounded-lg px-4">
        S'inscrire
      </button>
    </form>
    <router-link to="/login" class="font-Montserrat pt-4 text-center"
      >Déjà un compte ?<br />
      Je me connecte
    </router-link>
  </div>
</template>

<style lang="scss" scoped></style>
