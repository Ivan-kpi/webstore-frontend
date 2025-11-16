import { createContext, useContext, useState, useEffect } from "react";
import authApi from "../api/authApi";
import axiosClient from "../api/axiosClient";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on startup
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    axiosClient
      .get("/me")
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // LOGIN
  const login = async (email, password) => {
    await authApi.login(email, password);
    const me = await axiosClient.get("/me");
    setUser(me.data);
  };

  // REGISTER
  const register = async (first_name, last_name, email, password) => {
    await authApi.register(first_name, last_name, email, password);
    const me = await axiosClient.get("/me");
    setUser(me.data);
  };

  // LOGOUT
  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading, isAuthenticated: !!user }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

// hook
export function useAuth() {
  return useContext(AuthContext);
}




