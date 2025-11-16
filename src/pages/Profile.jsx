import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import usersApi from "../api/usersApi";
import ErrorMessage from "../components/ErrorMessage";

export default function ProfilePage() {
  const { user, setUser } = useAuth();

  const [form, setForm] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || ""
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    password: "",
    password_confirmation: ""
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  // -----------------------
  // ✏️ Оновлення профілю
  // -----------------------
  const handleProfileChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitProfileUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await usersApi.update(user.id, form);

      setUser((prev) => ({
        ...prev,
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email
      }));

      setSuccess("Дані успішно оновлено!");
    } catch (err) {
      setError("Не вдалося оновити дані.");
    }
  };

  // -----------------------
  // 🔑 Зміна пароля
  // -----------------------
  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const submitPasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);
    setLoadingPassword(true);

    try {
      await usersApi.update(user.id, passwordForm);

      setPasswordForm({
        current_password: "",
        password: "",
        password_confirmation: ""
      });

      setPasswordSuccess("Пароль успішно змінено!");
    } catch (err) {
      setPasswordError("Помилка: невірний поточний пароль або некоректний новий пароль.");
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Особистий кабінет</h2>

      {/* ------- Оновлення профілю ------- */}
      <h3>Редагування особистих даних</h3>

      {error && <ErrorMessage message={error} />}
      {success && <p style={styles.success}>{success}</p>}

      <form onSubmit={submitProfileUpdate} style={styles.form}>
        <label>Імʼя</label>
        <input
          type="text"
          name="first_name"
          value={form.first_name}
          onChange={handleProfileChange}
          style={styles.input}
          required
        />

        <label>Прізвище</label>
        <input
          type="text"
          name="last_name"
          value={form.last_name}
          onChange={handleProfileChange}
          style={styles.input}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleProfileChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Зберегти
        </button>
      </form>

      {/* ------- Зміна пароля ------- */}
      <h3 style={{ marginTop: "30px" }}>Зміна пароля</h3>

      {passwordError && <ErrorMessage message={passwordError} />}
      {passwordSuccess && <p style={styles.success}>{passwordSuccess}</p>}

      <form onSubmit={submitPasswordChange} style={styles.form}>
        <label>Поточний пароль</label>
        <input
          type="password"
          name="current_password"
          value={passwordForm.current_password}
          onChange={handlePasswordChange}
          style={styles.input}
          required
        />

        <label>Новий пароль</label>
        <input
          type="password"
          name="password"
          value={passwordForm.password}
          onChange={handlePasswordChange}
          style={styles.input}
          required
        />

        <label>Підтвердити пароль</label>
        <input
          type="password"
          name="password_confirmation"
          value={passwordForm.password_confirmation}
          onChange={handlePasswordChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button} disabled={loadingPassword}>
          {loadingPassword ? "Зміна..." : "Змінити пароль"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "20px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "8px",
    border: "1px solid #ddd"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px"
  },
  button: {
    padding: "10px 15px",
    background: "#333",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "5px"
  },
  success: {
    background: "#d4edda",
    color: "#155724",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "15px"
  }
};


