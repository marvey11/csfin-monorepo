import axios from "axios";

const BASE_URL = "/api";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export default instance;
