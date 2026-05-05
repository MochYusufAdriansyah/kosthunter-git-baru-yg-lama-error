import axios from "axios";

const API = axios.create({
  baseURL: "https://kosthunter-git-baru-yg-lama-error-production.up.railway.app",
});

export default API;
