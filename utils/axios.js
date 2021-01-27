import Axios from "axios";
import storage from "./storage";

export const axiosInstance = Axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "https://app.redmondeda.ru",
  timeout: 10000
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.token = storage.permanent.getValue("token") || "Helloworld";
    return config;
  },
  (error) => Promise.reject(error)
);
