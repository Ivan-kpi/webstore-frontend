import { useEffect, useState } from "react";
import itemsApi from "../api/itemsApi";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { Link } from "react-router-dom";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState(""); // 🔍 пошуковий текст

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const response = await itemsApi.getAll();
      setItems(response.data);
    } catch (err) {
      setError("Не вдалося завантажити список товарів");
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Фільтруємо товари
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.wrapper}>
      <h2>Список товарів</h2>

      {/* 🔍 Поле пошуку */}
      <input
        type="text"
        placeholder="Пошук товарів..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.search}
      />

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      <div style={styles.list}>
        {filteredItems.length === 0 && !loading && (
          <p>Нічого не знайдено...</p>
        )}

        {filteredItems.map((item) => (
          <div key={item.id} style={styles.item}>
            <h3>
              <Link to={`/items/${item.id}`} style={styles.link}>
                {item.name}
              </Link>
            </h3>

            <p style={styles.desc}>{item.description}</p>
            <strong>{item.price} грн</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: "800px",
    margin: "20px auto",
  },
  search: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    marginBottom: "20px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  item: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    background: "#fff",
  },
  desc: {
    opacity: 0.7,
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold",
  },
};



