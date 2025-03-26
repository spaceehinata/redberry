import axios from "axios";

const api = axios.create({
  baseURL: "https://momentum.redberryinternship.ge/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer 9e85a2d7-4757-4769-9e4e-f7d01e4f8d08",
  },
  withCredentials: true,
});

export default api;
