import axiosClient from "./axiosClient";

const itemsApi = {
  getAll() {
    return axiosClient.get("/items");
  },

  get(id) {
    return axiosClient.get(`/items/${id}`);
  },

  create(item) {
    return axiosClient.post("/items", { item });
  },

  update(id, item) {
    return axiosClient.put(`/items/${id}`, { item });
  },

  delete(id) {
    return axiosClient.delete(`/items/${id}`);
  }
};

export default itemsApi;

