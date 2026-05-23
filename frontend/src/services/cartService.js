import api from "./api.js";

export const fetchCart = () => api.get("/cart");
export const addCartItem = (payload) => api.post("/cart", payload);
export const removeCartItem = (id) => api.delete(`/cart/${id}`);
