import axiosClient from "./axiosClient";

const ordersApi = {
  getMyOrders() {
    return axiosClient.get("/api/orders");
  },

  getOrder(id) {
    return axiosClient.get(`/api/orders/${id}`);
  },

  createOrder(items) {
    return axiosClient.post("/api/orders", { items });
  }
};

export default ordersApi;
