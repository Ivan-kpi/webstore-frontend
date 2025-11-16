import axiosClient from "./axiosClient";

const ordersApi = {
  getMyOrders() {
    return axiosClient.get("/orders");
  },

  getOrder(id) {
    return axiosClient.get(`/orders/${id}`);
  },

  createOrder(items) {
    return axiosClient.post("/orders", { items });
  }
};

export default ordersApi;
