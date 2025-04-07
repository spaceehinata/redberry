// src/api/apiConfig.ts

export const API_URL = "https://momentum.redberryinternship.ge/api";
export const TOKEN = "9e85a2d7-4757-4769-9e4e-f7d01e4f8d08";

export const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${TOKEN}`,
});
