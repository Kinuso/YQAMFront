import axios from "./api";

class RecipeApi {
  getBaseUrl() {
    return "/recipe";
  }

  getToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return {
      headers: { Authorization: `Bearer ${user.token}` },
    };
  }

  index() {
    const url = this.getBaseUrl() + "s";
    return axios.get(url);
  }

  mostRecents() {
    const url = this.getBaseUrl() + "/recent";
    return axios.get(url);
  }

  specific(title) {
    const url = this.getBaseUrl() + `/specific/${title}`;
    return axios.get(url);
  }

  new(data) {
    const config = this.getToken();
    const url = this.getBaseUrl() + "/admin/new";
    return axios.post(url, data, config);
  }

  update(data) {
    const config = this.getToken();
    const url = this.getBaseUrl() + "/admin/update";
    return axios.post(url, data, config);
  }

  delete(data) {
    const config = this.getToken();
    const url = this.getBaseUrl() + "/admin/delete";
    return axios.post(url, data, config);
  }

  types() {
    const config = this.getToken();
    const url = this.getBaseUrl() + "/types";
    return axios.get(url, config);
  }

  categories() {
    const config = this.getToken();
    const url = this.getBaseUrl() + "/categories";
    return axios.get(url, config);
  }

  upVoteRecipe(data) {
    const config = this.getToken();
    const url = this.getBaseUrl() + "/admin/upVote";
    return axios.post(url, data);
  }

  removeUpVoteRecipe(data) {
    const config = this.getToken();
    const url = this.getBaseUrl() + "/removeUpVote";
    return axios.post(url, data);
  }
}

export default new RecipeApi();
