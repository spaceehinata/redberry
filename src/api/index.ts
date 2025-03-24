import axios from "axios";

const api = axios.create({
  baseURL: "https://momentum.redberryinternship.ge/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer 9e7bc10b-4420-4d99-b580-80128e0484bb`,
  },
  withCredentials: true,
});

export default api;
