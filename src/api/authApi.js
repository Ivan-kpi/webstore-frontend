import axiosClient from "./axiosClient";

const authApi = {
  // ===== LOGIN =====
  async login(email, password) {
    const response = await axiosClient.post("/users/sign_in", {
      user: { email, password }
    });

    // Дістаємо JWT з заголовка відповіді
    let token = response.headers["authorization"];

    if (token) {
      // Devise повертає: "Bearer <jwt>"
      token = token.replace("Bearer ", "").trim();
      localStorage.setItem("token", token);
    }

    return response.data;
  },

  // ===== REGISTER =====
  async register(first_name, last_name, email, password) {
    const response = await axiosClient.post("/users", {
      user: {
        first_name,
        last_name,
        email,
        password
      }
    });

    let token = response.headers["authorization"];

    if (token) {
      token = token.replace("Bearer ", "").trim();
      localStorage.setItem("token", token);
    }

    return response.data;
  },

  // ===== LOGOUT =====
  async logout() {
    try {
      await axiosClient.delete("/users/sign_out");
    } catch (err) {
      // Навіть якщо бекенд не відповість — токен видаляємо
      console.warn("Logout request failed, clearing token anyway.");
    }

    localStorage.removeItem("token");
  }
};

export default authApi;

