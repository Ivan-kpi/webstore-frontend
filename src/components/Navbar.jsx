import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/" style={styles.logo}>WebStore</Link>

        {isAuthenticated && (
          <>
            <Link to="/items" style={styles.link}>Товари</Link>
            <Link to="/cart" style={styles.link}>Кошик</Link>
            <Link to="/orders" style={styles.link}>Мої замовлення</Link>

            {user?.role === "admin" && (
              <>
                <Link to="/admin/users" style={styles.link}>
                  Адмін панель – Користувачі
                </Link>

                <Link to="/admin/items" style={styles.link}>
                  Адмін панель – Товари
                </Link>
              </>
            )}
          </>
        )}
      </div>

      <div style={styles.right}>
        {!isAuthenticated ? (
          <>
            <Link to="/login" style={styles.link}>Увійти</Link>
            <Link to="/register" style={styles.link}>Реєстрація</Link>
          </>
        ) : (
          <>
            <Link to="/profile" style={styles.profileLink}>
              {user?.first_name} {user?.last_name}
            </Link>

            <button style={styles.button} onClick={logout}>Вийти</button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    padding: "10px 20px",
    background: "#333",
    color: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  right: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
  profileLink: {
    color: "#00eaff",
    textDecoration: "none",
    fontWeight: "bold",
  },
  logo: {
    fontWeight: "bold",
    color: "#fff",
    textDecoration: "none",
    marginRight: "25px"
  },
  button: {
    background: "#ff4444",
    border: "none",
    padding: "5px 12px",
    color: "white",
    cursor: "pointer",
    borderRadius: "4px"
  }
};
