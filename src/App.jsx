import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ItemsPage from "./pages/Items";
import ItemPage from "./pages/Item";
import OrdersPage from "./pages/Orders";
import AdminUsersPage from "./pages/AdminUsers";
import AdminItemsPage from "./pages/AdminItems";
import AdminNewItemPage from "./pages/AdminNewItem";
import CartPage from "./pages/Cart";
import ProfilePage from "./pages/Profile";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <div style={{ padding: "20px" }}>
          <Routes>

            {/* Публічні сторінки */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Логінений користувач — список товарів */}
            <Route
              path="/items"
              element={
                <ProtectedRoute>
                  <ItemsPage />
                </ProtectedRoute>
              }
            />

            {/* ⭐ Сторінка конкретного товару */}
           <Route
              path="/items/:id"
              element={
                <ProtectedRoute>
                  <ItemPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                <CartPage />
                </ProtectedRoute>
              }
            />

            {/* Мої замовлення */}
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />

            {/* Адмін — користувачі */}
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute role="admin">
                  <AdminUsersPage />
                </ProtectedRoute>
              }
            />

            {/* Адмін — товари */}
            <Route
              path="/admin/items"
              element={
                <ProtectedRoute role="admin">
                  <AdminItemsPage />
                </ProtectedRoute>
              }
            />

            {/* Адмін — створити товар */}
            <Route
              path="/admin/items/new"
              element={
                <ProtectedRoute role="admin">
                  <AdminNewItemPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            {/* Головна */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <ItemsPage />
                </ProtectedRoute>
              }
            />

          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
