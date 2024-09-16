import axios from "axios";
import router from "../router/index.js";

axios.defaults.baseURL = import.meta.env.VITE_API_BACKEND;

axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axios.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error.response.status) {
      if (error.response.status === 401) {
        // localStorage.removeItem("user");
        router.push("/login");
      } else if (error.response.status === 403) {
        // localStorage.removeItem("user");
        router.push("/login");
      }
      return Promise.reject(error.response);
    }
  }
);

export default axios;
