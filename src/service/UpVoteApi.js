import axios from "./api";

class RecipeApi {
  getToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return {
      headers: { Authorization: `Bearer ${user.token}` },
    };
  }

  upVoteRecipe(data) {
    const config = this.getToken();
    const url = "/upVote";
    return axios.post(url, data, config);
  }

  removeUpVoteRecipe(data) {
    const config = this.getToken();
    const url = "/removeUpVote";
    return axios.post(url, data, config);
  }

  isUpvotedByUser(data) {
    const config = this.getToken();
    const url = "/isUpVotedByUser";
    return axios.post(url, data, config);
  }

  likedRecipe(data) {
    const url = `/likedRecipe/${data}`;
    return axios.get(url);
  }
}

export default new RecipeApi();
