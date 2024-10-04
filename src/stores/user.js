import { defineStore } from "pinia";
import UserApi from "../service/UserApi";
import router from "../router/index.js";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  persist: true,
  actions: {
    login(data) {
      UserApi.login(data)
        .then((response) => {
          this.user = response.data;
          localStorage.setItem("user", JSON.stringify(this.user));
          router.push({ name: "home" });
          location.reload();
        })
        .catch((err) => console.log(err));
    },
    loginExternal(data) {
      this.user = data;
      location.reload();
      router.push({ name: "home" });
    },
  },
});
