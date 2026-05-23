import api from "./api.js";

export const fetchProducts = (keyword = "") =>
	api.get(`/products${keyword ? `?keyword=${encodeURIComponent(keyword)}` : ""}`);
export const fetchProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (payload) => api.post("/products", payload);
export const updateProduct = (id, payload) => api.put(`/products/${id}`, payload);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const uploadProductImages = (files) => {
	const formData = new FormData();
	files.forEach((file) => formData.append("images", file));
	return api.post("/uploads/products", formData, {
		headers: { "Content-Type": "multipart/form-data" },
	});
};
