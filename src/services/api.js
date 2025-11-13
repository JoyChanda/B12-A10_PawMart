import axios from "axios";
const baseURL =
  import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim().length > 0
    ? import.meta.env.VITE_API_URL
    : "/api";

const API = axios.create({
  baseURL,
  withCredentials: true,
});
export default API;
