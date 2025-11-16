import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Items from "../pages/Items";
import Profile from "../pages/Profile"; // ✅ додаємо

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/items" element={<Items />} />
      <Route path="/profile" element={<Profile />} /> {/* ✅ додаємо */}
    </Routes>
  );
}
