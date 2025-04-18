import axios from "axios";

export const API_URL = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.Authorization;
  }
};

export default api;

export const fetchCurrentUser = async () => {
  try {
    const response = await api.get("/me");
    return response.data.data;
  } catch (error) {
    console.error("Ошибка при получении текущего пользователя:", error);
    return null;
  }
};
