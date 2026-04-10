import api from "./client";

export const authApi = {
  login: (payload) => api.post("/auth/login", payload),
  register: (payload) => api.post("/auth/register", payload),
  me: () => api.get("/users/me")
};

export const categoryApi = {
  getAll: () => api.get("/categories"),
  create: (payload) => api.post("/categories", payload),
  update: (id, payload) => api.put(`/categories/${id}`, payload),
  remove: (id) => api.delete(`/categories/${id}`)
};

export const productApi = {
  getAll: (params) => api.get("/products", { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (payload) => api.post("/products", payload),
  update: (id, payload) => api.put(`/products/${id}`, payload),
  remove: (id) => api.delete(`/products/${id}`),
  review: (id, payload) => api.post(`/products/${id}/reviews`, payload),
  upload: (formData) =>
    api.post("/products/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
};

export const cartApi = {
  get: () => api.get("/cart"),
  add: (payload) => api.post("/cart", payload),
  update: (itemId, quantity) => api.put(`/cart/${itemId}`, null, { params: { quantity } }),
  remove: (itemId) => api.delete(`/cart/${itemId}`)
};

export const wishlistApi = {
  get: () => api.get("/wishlist"),
  add: (productId) => api.post(`/wishlist/${productId}`),
  remove: (productId) => api.delete(`/wishlist/${productId}`)
};

export const orderApi = {
  checkout: (payload) => api.post("/orders/checkout", payload),
  myOrders: () => api.get("/orders/my"),
  cancel: (orderId) => api.patch(`/orders/${orderId}/cancel`),
  allOrders: () => api.get("/orders"),
  updateStatus: (orderId, status) => api.patch(`/orders/${orderId}/status`, null, { params: { status } })
};

export const adminApi = {
  dashboard: () => api.get("/admin/dashboard"),
  users: () => api.get("/users")
};
