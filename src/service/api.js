import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BACKEND;

axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axios.interceptors.response.use((response) => {
  if (response.status === 200 || response.status === 201) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
});

export default axios;
