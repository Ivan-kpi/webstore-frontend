import axiosClient from "./axiosClient";

const itemsApi = {
  getAll() {
    return axiosClient.get("/api/items");
  },

  get(id) {
    return axiosClient.get(`/api/items/${id}`);
  },

  create(item) {
    return axiosClient.post("/api/items", { item });
  },

  update(id, item) {
    return axiosClient.put(`/api/items/${id}`, { item });
  },

  delete(id) {
    return axiosClient.delete(`/api/items/${id}`);
  }
};

export default itemsApi;

