import axiosClient from "./axiosClient";

const usersApi = {
  getAll() {
    return axiosClient.get("/api/users");
  },

  get(id) {
    return axiosClient.get(`/api/users/${id}`);
  },

  create(data) {
    return axiosClient.post("/api/users", { user: data });
  },

  update(id, data) {
    return axiosClient.put(`/api/users/${id}`, { user: data });
  },

  delete(id) {
    return axiosClient.delete(`/api/users/${id}`);
  }
};

export default usersApi;
