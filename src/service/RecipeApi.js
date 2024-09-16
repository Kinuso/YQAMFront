import axios from "./api";
import { useUserStore } from "@/stores/user";

class RecipeApi {
  getToken() {
    const userStore = useUserStore();
    return {
      headers: { Authorization: `Bearer ${userStore.user.token}` },
    };
  }

  new(data) {
    const config = this.getToken();
    const url = this.getBaseUrl() + "new";
    return axios.post(config, url, data);
  }

  update(data) {
    const config = this.getToken();
    const url = this.getBaseUrl() + "update";
    return axios.post(config, url, data);
  }

  delete(data) {
        const config = this.getToken();
        const url = this.getBaseUrl() + "delete";
        return axios.post(config, url, data);
  }

  index(data) {
    return axios.post("/recipes", data);
  }

  types() {
    return axios.get("/recipe/types");
  }

  categories() {
    return axios.get("/recipe/categories");
  }
}

export default new RecipeApi();
