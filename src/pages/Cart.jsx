import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import ordersApi from "../api/ordersApi";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  };

  const updateQuantity = (id, qty) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: Number(qty) } : item
    );
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeItem = (id) => {
    const newCart = cart.filter((i) => i.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const finalizeOrder = async () => {
    if (cart.length === 0) return alert("Кошик порожній!");

    setProcessing(true);
    setError(null);

    try {
      // 👉 ПРАВИЛЬНИЙ ВИКЛИК
      await ordersApi.createOrder(
        cart.map((c) => ({
          item_id: c.id,
          quantity: c.quantity
        }))
      );

      // Очищаємо кошик після оформлення
      localStorage.removeItem("cart");
      setCart([]);

      alert("Замовлення оформлено!");
    } catch (e) {
      setError("Не вдалося оформити замовлення");
    }

    setProcessing(false);
  };

  if (processing) return <Loading />;

  return (
    <div style={styles.wrapper}>
      <h2>Мій кошик</h2>

      {error && <ErrorMessage message={error} />}

      {cart.length === 0 ? (
        <p>Кошик порожній</p>
      ) : (
        <>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Назва</th>
                <th>Ціна</th>
                <th>Кількість</th>
                <th>Сума</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price} грн</td>

                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, e.target.value)
                      }
                      style={styles.input}
                    />
                  </td>

                  <td>{item.price * item.quantity} грн</td>

                  <td>
                    <button
                      style={styles.delete}
                      onClick={() => removeItem(item.id)}
                    >
                      Видалити
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={styles.total}>Разом: {total} грн</h3>

          <button style={styles.orderBtn} onClick={finalizeOrder}>
            Оформити замовлення
          </button>
        </>
      )}
    </div>
  );
}

const styles = {
  wrapper: { maxWidth: "900px", margin: "20px auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  input: { width: "70px", padding: "5px" },
  delete: {
    background: "#c0392b",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  total: { marginTop: "20px", fontSize: "22px" },
  orderBtn: {
    background: "#2ecc71",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "12px 20px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px"
  }
};
