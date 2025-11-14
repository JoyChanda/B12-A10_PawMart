import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL?.trim().length > 0
    ? import.meta.env.VITE_API_URL
    : "/api";

const API = axios.create({
  baseURL,
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default API;
