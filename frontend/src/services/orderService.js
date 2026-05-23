import api from "./api.js";

export const createOrder = (payload) => api.post("/orders", payload);
export const fetchOrders = () => api.get("/orders");
export const fetchOrderById = (id) => api.get(`/orders/${id}`);
export const updateOrder = (id, payload) => api.put(`/orders/${id}`, payload);
