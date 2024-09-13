import { defineStore } from "pinia";

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
          router.push({ name: "home" });
        })
        .catch((err) => console.log(err));
    },
    loginExternal(data) {
      this.user = data;
      router.push({ name: "home" });
    },
  },
});
