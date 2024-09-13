import axios from "axios";


class UserApi {

  login(data) {
    return axios.post("/login", data);
  }

}
