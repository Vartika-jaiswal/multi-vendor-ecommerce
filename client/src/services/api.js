import axios from "axios";

const api = axios.create({
  baseURL: "https://multi-vendor-backend-h589.onrender.com/api",
  withCredentials: true,
});

export default api;  