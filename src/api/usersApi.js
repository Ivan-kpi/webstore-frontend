import axiosClient from "./axiosClient";

const usersApi = {
  getAll() {
    return axiosClient.get("/users");
  },

  get(id) {
    return axiosClient.get(`/users/${id}`);
  },

  create(data) {
    return axiosClient.post("/users", { user: data });
  },

  update(id, data) {
    return axiosClient.put(`/users/${id}`, { user: data });
  },

  delete(id) {
    return axiosClient.delete(`/users/${id}`);
  }
};

export default usersApi;
