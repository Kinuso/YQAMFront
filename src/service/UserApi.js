import { config } from "@vue/test-utils";
import axios from "./api";

class UserApi {
  getToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return {
      headers: { Authorization: `Bearer ${user.token}` },
    };
  }

  login(data) {
    return axios.post("/login", data);
  }

  register(data) {
    return axios.post("/register", data);
  }

  updateAccount(data) {
    const url = "/updateAccount";
    const config = this.getToken();
    return axios.post(url, data, config);
  }

  getUser() {
    const token = JSON.parse(localStorage.getItem("user"));
    if (token) {
      if (Object.keys(token).length === 0) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    localStorage.removeItem("user");
    window.location.reload();
  }

  getUserRecipes(data) {
    const url = `/admin/userRecipes/${data}`;
    const config = this.getToken();
    return axios.get(url, data, config);
  }

  deleteRecipe(data) {
    const url = `/recipe/admin/delete`;
    const config = this.getToken();
    return axios.post(url, data, config);
  }

  deleteAccount(data) {
    const url = `/admin/user/deleteAccount`;
    const config = this.getToken();
    return axios.post(url, data, config);
  }
}

export default new UserApi();
