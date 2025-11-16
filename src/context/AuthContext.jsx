import { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

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

  const login = async (email, password) => {
    const response = await axiosClient.post("/users/sign_in", {
      user: { email, password },
    });

    localStorage.setItem("token", response.headers.authorization);

    const me = await axiosClient.get("/me");
    setUser(me.data);
  };

  const register = async (first_name, last_name, email, password) => {
    await axiosClient.post("/users", {
      user: { first_name, last_name, email, password },
    });
  };

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

// HOOK (потрібний для білда!)
export function useAuth() {
  return useContext(AuthContext);
}



