<script setup>
import { ref } from "vue";
import { useUserStore } from "../../stores/user";
import router from "../../router/index";
import UserApi from "../../service/UserApi";
import { useToast } from "vue-toast-notification";

const userStore = useUserStore();

const $toast = useToast();

const notifyMessage = (type, message) => {
  $toast.open({
    message: message,
    type: type,
    duration: 5000,
  });
};

if (localStorage.getItem("user")) {
  router.push("/");
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;

function validateEmail(email) {
  return emailRegex.test(email);
}

function validatePassword(password) {
  return passwordRegex.test(password);
}

function register() {
  if (!validateEmail(formLogin.value.email)) {
    notifyMessage("warning", "Veuillez entrer une adresse email valide");
    return;
  }
  if (!validatePassword(formLogin.value.password)) {
    notifyMessage(
      "warning",
      "Mot de passe trop faible (Une longueur de 8 caractères minimum, une majuscule, une miniscule, un numéro et un caractère spécial sont attendues"
    );
    return;
  }

  if (formLogin.value.password !== formLogin.value.passwordValidate) {
    notifyMessage("warning", "Les mots de passe ne correspondent pas");
    return;
  }

  UserApi.register(formLogin.value)
    .then((res) => {
      notifyMessage(res.data.status, res.data.message);
      router.push("/login");
    })
    .catch((error) => {
      notifyMessage("error", error.response.data.message);
    });
}

const formLogin = ref({
  email: null,
  password: null,
  passwordValidate: null,
  firstname: null,
  lastname: null,
  dgpr: null,
});
</script>

<template>
  <div
    class="flex flex-col justify-center items-center h-screen bg-ivory text-lightJet"
  >
    <h1 class="text-5xl m-10 font-Fontin">S'inscrire</h1>
    <form
      @submit.prevent="register"
      class="flex flex-col justify-center items-center border-y-2 border-lightJet p-10"
    >
      <div class="mb-4">
        <input
          type="email"
          v-model="formLogin.email"
          placeholder="Adresse Email"
          required
          class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
        />
      </div>
      <div class="mb-4">
        <input
          type="text"
          v-model="formLogin.firstname"
          placeholder="Prénom"
          required
          class="font-Montserrat input input-bordered w-full max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
        />
      </div>
      <div class="mb-4">
        <input
          type="text"
          v-model="formLogin.lastname"
          placeholder="Nom"
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
      <div class="mb-6 flex">
        <input
          class="font-Montserrat input input-bordered mr-6 max-w-xs border-2 indent-2 rounded-lg border-lightJet p-1 bg-ivory my-2"
          v-model="formLogin.dgpr"
          required
          id="dgpr"
          type="checkbox"
        />
        <label for="dgpr" class="h-8"
          >J’accepte les Conditions <br />
          Générales d'Utilisation</label
        >
      </div>
      <button type="submit" class="text-darkJet bg-melon p-1 rounded-lg px-4">
        S'inscrire
      </button>
    </form>
    <router-link to="/login" class="font-Montserrat pt-4 text-center"
      >Déjà un compte ?
      <span class="text-tomato">Je me connecte</span>
    </router-link>
  </div>
</template>

<style lang="scss" scoped></style>
