import { useEffect, useState } from "react";
import usersApi from "../api/usersApi";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import AdminUserRow from "../components/AdminUserRow";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await usersApi.getAll();
      setUsers(response.data);
    } catch (err) {
      setError("Не вдалося завантажити користувачів.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleUpdate = (updatedUser) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
  };

  return (
    <div style={styles.wrapper}>
      <h2>Адмін-панель: користувачі</h2>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Імʼя</th>
              <th>Прізвище</th>
              <th>Email</th>
              <th>Роль</th>
              <th>Дії</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <AdminUserRow
                key={user.id}
                user={user}
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
