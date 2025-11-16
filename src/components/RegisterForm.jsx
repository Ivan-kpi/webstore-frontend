import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";

export default function RegisterForm() {
  const { register } = useAuth();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== password_confirmation) {
      setError("Паролі не співпадають!");
      return;
    }

    setLoading(true);

    try {
      await register(first_name, last_name, email, password);
      window.location.href = "/"; // redirect after register
    } catch (err) {
      setError("Не вдалося створити акаунт. Перевірте дані.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Реєстрація</h2>

      {error && <ErrorMessage message={error} />}
      {loading && <Loading />}

      <div style={styles.group}>
        <label>Імʼя:</label>
        <input
          type="text"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.group}>
        <label>Прізвище:</label>
        <input
          type="text"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.group}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.group}>
        <label>Пароль:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.group}>
        <label>Підтвердження паролю:</label>
        <input
          type="password"
          value={password_confirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
          style={styles.input}
        />
      </div>

      <button type="submit" style={styles.button}>
        Створити акаунт
      </button>
    </form>
  );
}

const styles = {
  form: {
    maxWidth: "350px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    background: "#fafafa"
  },
  group: {
    marginBottom: "15px"
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #aaa"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#333",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px"
  }
};
