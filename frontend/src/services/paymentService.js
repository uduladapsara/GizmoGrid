import api from "./api.js";

export const createPayment = (payload) => api.post("/payments/create", payload);
export const confirmPayment = (payload) => api.post("/payments/confirm", payload);
