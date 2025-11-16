import axiosClient from "./axiosClient";

const authApi = {
  async login(email, password) {
    const response = await axiosClient.post("/users/sign_in", {
      user: { email, password }
    });

    const token = response.headers["authorization"];

    if (token) {
      localStorage.setItem("token", token);
    }

    return response.data;
  },

  async register(first_name, last_name, email, password) {
    const response = await axiosClient.post("/users", {
      user: { first_name, last_name, email, password }
    });

    const token = response.headers["authorization"];
    if (token) localStorage.setItem("token", token);

    return response.data;
  },

  async logout() {
    await axiosClient.delete("/users/sign_out");
    localStorage.removeItem("token");
  }
};

export default authApi;
