import { useState } from "react";
import itemsApi from "../api/itemsApi";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

export default function AdminNewItemPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: ""
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await itemsApi.create({
        name: form.name,
        description: form.description,
        price: form.price,
      });

      navigate("/admin/items");
    } catch (err) {
      setError("Помилка при створенні товару");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Створення нового товару</h2>

        {error && <ErrorMessage message={error} />}

        <form onSubmit={submit} style={styles.form}>
          <label style={styles.label}>Назва товару</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
            placeholder="Наприклад: PowerBank 10000mAh"
          />

          <label style={styles.label}>Опис</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            style={{ ...styles.input, height: "80px", resize: "vertical" }}
            placeholder="Короткий опис товару"
          />

          <label style={styles.label}>Ціна (₴)</label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            style={styles.input}
            placeholder="Наприклад: 999"
          />

          <button type="submit" style={styles.button}>
            ➕ Створити товар
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "40px",
  },

  card: {
    width: "100%",
    maxWidth: "450px",
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },

  title: {
    marginBottom: "20px",
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "600",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  label: {
    fontWeight: "500",
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    outline: "none",
    transition: "0.2s",
  },

  button: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "8px",
    background: "#2ecc71",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    color: "white",
    fontWeight: "600",
    transition: "0.2s",
  },
};

// hover effects через inline style додати неможливо,
// якщо хочеш — можемо винести стилі в CSS файл!
