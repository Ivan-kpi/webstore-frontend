import { useEffect, useState } from "react";
import ordersApi from "../api/ordersApi";
import OrderCard from "../components/OrderCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await ordersApi.getMyOrders();
      setOrders(response.data);
    } catch (err) {
      setError("Не вдалося завантажити замовлення.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2>Мої замовлення</h2>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      <div style={styles.list}>
        {orders.map(order => (
          <OrderCard key={order.id} order={order} />
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
  list: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  }
};
