import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";

export default function LoginForm() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      window.location.href = "/";
    } catch (err) {
      setError("Невірний email або пароль");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Вхід</h2>

      {error && <ErrorMessage message={error} />}
      {loading && <Loading />}

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

      <button type="submit" style={styles.button}>
        Увійти
      </button>

      {/* 🔥 ДОПОВНЕННЯ: посилання на реєстрацію */}
      <div style={styles.linkWrapper}>
        <span>Немає акаунту? </span>
        <Link to="/register" style={styles.link}>
          Зареєструватись
        </Link>
      </div>
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
  },
  linkWrapper: {
    marginTop: "15px",
    textAlign: "center"
  },
  link: {
    color: "#333",
    fontWeight: "bold",
    marginLeft: "5px",
    textDecoration: "underline",
    cursor: "pointer"
  }
};

