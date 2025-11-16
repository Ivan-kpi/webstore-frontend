import { useState } from "react";

export default function OrderCard({ order }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={{ margin: 0 }}>Замовлення №{order.id}</h3>
        <p style={styles.date}>{order.created_at}</p>

        <button onClick={() => setOpen(!open)} style={styles.toggle}>
          {open ? "Сховати деталі ▲" : "Показати деталі ▼"}
        </button>
      </div>

      {/* Якщо open === true -> показуємо таблицю */}
      {open && (
        <div style={styles.details}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Товар</th>
                <th>Ціна</th>
                <th>Кількість</th>
                <th>Сума</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price} грн</td>
                  <td>{item.quantity}</td>
                  <td>{item.total} грн</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={styles.total}>
            Разом: <strong>{order.amount} грн</strong>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    padding: "20px",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "6px"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  date: {
    opacity: 0.7,
    marginRight: "20px"
  },
  toggle: {
    padding: "6px 12px",
    cursor: "pointer",
    background: "#333",
    color: "white",
    border: "none",
    borderRadius: "4px"
  },
  details: {
    marginTop: "15px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "15px"
  },
  total: {
    textAlign: "right",
    fontSize: "18px",
    marginTop: "10px"
  }
};
