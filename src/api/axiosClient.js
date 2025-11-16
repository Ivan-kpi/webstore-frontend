import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000", // Rails API
  headers: {
    "Content-Type": "application/json"
  }
});

// Додаємо JWT автоматично
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers["Authorization"] = token;
  }

  return config;
});

// Якщо токен протухнув — викидаємо на логін
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
