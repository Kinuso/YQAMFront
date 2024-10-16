import { defineStore } from "pinia";
import UserApi from "../service/UserApi";
import router from "../router/index.js";
import { useToast } from "vue-toast-notification";

const $toast = useToast();

const notifyMessage = (type, message) => {
  $toast.open({
    message: message,
    type: type,
    duration: 5000,
  });
};

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  persist: true,
  actions: {
    login(data) {
      UserApi.login(data)
        .then((response) => {
          notifyMessage("success", "connexion réussie");
          this.user = response.data.user;
          localStorage.setItem("user", JSON.stringify(this.user));
          location.reload();
          router.push("/");
        })
        .catch((err) => notifyMessage("error", "identifiants incorrect"));
    },
  },
});
