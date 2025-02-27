import axios from "axios";

export const baseURL = "https://tureappapiforreact.onrender.com/api";

export const AxiosInstance = axios.create({
  baseURL,
});

AxiosInstance.interceptors.request.use(
  async function (config) {
    const token =
      localStorage.getItem("user_token") ||
      sessionStorage.getItem("user_token");
    if (token !== null || token !== undefined) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);
