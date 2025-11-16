import { useState } from "react";
import itemsApi from "../api/itemsApi";
import ErrorMessage from "./ErrorMessage";

export default function AdminItemRow({ item, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: item.name,
    description: item.description,
    price: item.price
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveChanges = async () => {
    try {
      const updated = await itemsApi.update(item.id, form);
      onUpdate(updated.data);
      setEditing(false);
    } catch (err) {
      setError("Не вдалося оновити товар");
    }
  };

  const deleteItem = async () => {
    if (!window.confirm(`Видалити товар "${item.name}"?`)) return;

    try {
      await itemsApi.delete(item.id);
      onDelete(item.id);
    } catch (err) {
      setError("Помилка при видаленні товару");
    }
  };

  return (
    <>
      {error && <ErrorMessage message={error} />}

      <tr>
        <td>
          {editing ? (
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
            />
          ) : (
            item.name
          )}
        </td>

        <td>
          {editing ? (
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              style={styles.input}
            />
          ) : (
            item.description
          )}
        </td>

        <td>
          {editing ? (
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              style={styles.input}
            />
          ) : (
            item.price
          )}
        </td>

        <td>
          {!editing ? (
            <>
              <button style={styles.edit} onClick={() => setEditing(true)}>
                Редагувати
              </button>
              <button style={styles.delete} onClick={deleteItem}>
                Видалити
              </button>
            </>
          ) : (
            <>
              <button style={styles.save} onClick={saveChanges}>
                Зберегти
              </button>
              <button style={styles.cancel} onClick={() => setEditing(false)}>
                Скасувати
              </button>
            </>
          )}
        </td>
      </tr>
    </>
  );
}

const styles = {
  input: {
    padding: "4px",
    width: "100%"
  },
  select: {
    padding: "4px"
  },
  actions: {
    display: "flex",
    gap: "8px"
  },
  edit: {
    background: "#333",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer"
  },
  delete: {
    background: "#cc0000",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer"
  },
  save: {
    background: "#28a745",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer"
  },
  cancel: {
    background: "#777",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer"
  }
};
