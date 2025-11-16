import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api",
  headers: {
    "Content-Type": "application/json"
  }
});

// Додаємо JWT автоматично
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    // гарантуємо формат Bearer <token>
    if (!token.startsWith("Bearer ")) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      config.headers["Authorization"] = token;
    }
  }

  return config;
});

// Якщо токен прострочений — викидаємо
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;

