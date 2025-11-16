import { createContext, useState, useEffect } from "react";
import authApi from "../api/authApi";
import axiosClient from "../api/axiosClient";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Поки не знаємо чи юзер залогінений

  // ========== LOAD USER ON APP START ==========
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    axiosClient
      .get("/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // ========== LOGIN ==========
  const login = async (email, password) => {
    const data = await authApi.login(email, password);

    // Після логіну одразу вантажимо юзера
    const me = await axiosClient.get("/me");

    setUser(me.data);
    return me.data;
  };

  // ========== REGISTER ==========
  const register = async (first_name, last_name, email, password) => {
    const data = await authApi.register(first_name, last_name, email, password);

    const me = await axiosClient.get("/me");

    setUser(me.data);
    return me.data;
  };

  // ========== LOGOUT ==========
  const logout = async () => {
    try {
      await authApi.logout();
    } catch {}
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}


