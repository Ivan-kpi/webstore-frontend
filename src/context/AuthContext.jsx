import { createContext, useContext, useEffect, useState } from "react";
import authApi from "../api/authApi";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🔥 Перевірка токена при завантаженні сторінки
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    // ⚡ Отримуємо реального користувача через /api/me
    axiosClient
      .get("/api/me")
      .then(res => {
        setUser(res.data);
        setIsAuthenticated(true);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 🔑 Login
  const login = async (email, password) => {
    const data = await authApi.login(email, password);

    setIsAuthenticated(true);
    setUser(data.user);

    return data;
  };

  // 🆕 Register
  const register = async (first_name, last_name, email, password) => {
    const data = await authApi.register(first_name, last_name, email, password);

    setIsAuthenticated(true);
    setUser(data.user);

    return data;
  };

  // 🚪 Logout
  const logout = async () => {
    try {
      await authApi.logout();
    } catch (e) {}

    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,   // ⭐ ДОДАНО СЮДИ ⭐
        isAuthenticated,
        loading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

