import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import itemsApi from "../api/itemsApi";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

export default function ItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadItem();
  }, []);

  const loadItem = async () => {
    try {
      const res = await itemsApi.get(id);
      setItem(res.data);
    } catch {
      setError("Не вдалося завантажити товар");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existing = cart.find((i) => i.id === item.id);

    if (existing) {
      existing.quantity += Number(quantity);
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: Number(quantity),
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Товар додано до кошика!");
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!item) return <p>Товар не знайдено</p>;

  return (
    <div style={styles.wrapper}>
      <h2>{item.name}</h2>

      <p style={styles.desc}>{item.description}</p>

      <strong style={styles.price}>{item.price} грн</strong>

      <div style={styles.qtyBlock}>
        <label style={styles.label}>Кількість:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={styles.input}
        />
      </div>

      <button style={styles.button} onClick={addToCart}>
        Додати в кошик
      </button>
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: "600px",
    margin: "30px auto",
    padding: "25px",
    background: "#fff",
    borderRadius: "10px",
    border: "1px solid #ddd",
  },
  desc: {
    marginTop: "10px",
    fontSize: "16px",
    opacity: 0.8,
  },
  price: {
    display: "block",
    marginTop: "20px",
    fontSize: "22px",
    fontWeight: "bold",
  },
  qtyBlock: {
    marginTop: "25px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  label: {
    fontSize: "16px",
  },
  input: {
    width: "80px",
    padding: "6px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    marginTop: "25px",
    padding: "12px 20px",
    fontSize: "16px",
    background: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};






