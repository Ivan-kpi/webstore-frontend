import { useState } from "react";
import usersApi from "../api/usersApi";
import ErrorMessage from "./ErrorMessage";

export default function AdminUserRow({ user, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveChanges = async () => {
    try {
      const updated = await usersApi.update(user.id, form);
      onUpdate(updated.data);
      setEditing(false);
    } catch (err) {
      setError("Не вдалося оновити користувача");
    }
  };

  const deleteUser = async () => {
    if (!window.confirm(`Видалити користувача ${user.email}?`)) return;

    try {
      await usersApi.delete(user.id);
      onDelete(user.id);
    } catch (err) {
      setError("Помилка при видаленні");
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
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              style={styles.input}
            />
          ) : (
            user.first_name
          )}
        </td>

        <td>
          {editing ? (
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              style={styles.input}
            />
          ) : (
            user.last_name
          )}
        </td>

        <td>{user.email}</td>

        <td>
          {editing ? (
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          ) : (
            user.role
          )}
        </td>

        <td style={styles.actions}>
          {!editing ? (
            <>
              <button style={styles.edit} onClick={() => setEditing(true)}>
                Редагувати
              </button>
              <button style={styles.delete} onClick={deleteUser}>
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
