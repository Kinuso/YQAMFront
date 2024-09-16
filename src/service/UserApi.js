import axios from "./api";

class UserApi {
  login(data) {
    return axios.post("/login", data);
  }

  register(data) {
    return axios.post("/register", data);
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
  }
  
}



export default new UserApi();
