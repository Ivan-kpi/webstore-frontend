import axiosClient from "./axiosClient";

function extractToken(headers) {
  const header =
    headers["authorization"] ||
    headers["Authorization"] ||
    headers["AUTHORIZATION"];

  if (!header) return null;

  return header.replace("Bearer ", "").trim();
}

const authApi = {
  async login(email, password) {
    const response = await axiosClient.post("/users/sign_in", {
      user: { email, password }
    });

    const token = extractToken(response.headers);
    if (token) localStorage.setItem("token", token);

    return response.data;
  },

  async register(first_name, last_name, email, password) {
    const response = await axiosClient.post("/users", {
      user: { first_name, last_name, email, password }
    });

    const token = extractToken(response.headers);
    if (token) localStorage.setItem("token", token);

    return response.data;
  },

  async logout() {
    try {
      await axiosClient.delete("/users/sign_out");
    } catch {}

    localStorage.removeItem("token");
  }
};

export default authApi;


