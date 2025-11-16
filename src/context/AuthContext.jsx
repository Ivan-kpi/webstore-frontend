import axiosClient from "../api/axiosClient";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Автоматична перевірка токену при старті
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axiosClient
        .get("/me")
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("token");
        });
    }
  }, []);

  // Логін
  const login = async (email, password) => {
    const response = await axiosClient.post("/users/sign_in", {
      user: { email, password },
    });

    localStorage.setItem("token", response.headers.authorization);
    const me = await axiosClient.get("/me");
    setUser(me.data);
  };

  // Реєстрація
  const register = async (first_name, last_name, email, password) => {
    await axiosClient.post("/users", {
      user: { first_name, last_name, email, password },
    });
  };

  // Вихід
  const logout = async () => {
    await axiosClient.delete("/users/sign_out");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


