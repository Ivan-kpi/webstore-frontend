import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { isAuthenticated, loading, user } = useAuth();

  // Поки AuthContext перевіряє токен
  if (loading) {
    return <div>Завантаження...</div>;
  }

  // Якщо юзер не залогінений
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Якщо сторінка тільки для ADMIN
  if (role === "admin" && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Якщо все добре — рендеримо компонент
  return children;
}
