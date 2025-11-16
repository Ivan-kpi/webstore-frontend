import { useEffect, useState } from "react";
import itemsApi from "../api/itemsApi";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { Link } from "react-router-dom";
import AdminItemRow from "../components/AdminItemRow";

export default function AdminItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const res = await itemsApi.getAll();
      setItems(res.data);
    } catch (err) {
      setError("Не вдалося завантажити товари");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const handleUpdate = (updatedItem) => {
    setItems(items.map((i) => (i.id === updatedItem.id ? updatedItem : i)));
  };

  return (
    <div style={styles.wrapper}>
      <h2>Адмін: Товари</h2>

      <Link to="/admin/items/new" className="admin-btn-add">
        ➕ Додати товар
      </Link>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Назва</th>
              <th>Опис</th>
              <th>Ціна</th>
              <th>Дії</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <AdminItemRow
                key={item.id}
                item={item}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: "900px",
    margin: "20px auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    borderBottom: "2px solid #ddd",
  },

};
