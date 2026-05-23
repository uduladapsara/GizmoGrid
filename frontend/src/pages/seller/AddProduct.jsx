import { useEffect, useState } from "react";
import ProductForm from "../../components/products/ProductForm.jsx";
import {
	createProduct,
	uploadProductImages,
} from "../../services/productService.js";

const MAX_IMAGES = 5;

const AddProduct = () => {
	const [formData, setFormData] = useState({
		name: "",
		price: "",
		description: "",
		category: "",
		stock: "",
	});
	const [imageFiles, setImageFiles] = useState([]);
	const [imagePreviews, setImagePreviews] = useState([]);
	const [status, setStatus] = useState({ loading: false, error: "", success: "" });

	useEffect(() => {
		if (!imageFiles.length) {
			setImagePreviews([]);
			return undefined;
		}

		const previews = imageFiles.map((file) => ({
			name: file.name,
			url: URL.createObjectURL(file),
		}));
		setImagePreviews(previews);

		return () => {
			previews.forEach((preview) => URL.revokeObjectURL(preview.url));
		};
	}, [imageFiles]);

	const handleChange = (event) => {
		setFormData((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	const handleFilesChange = (files) => {
		const incoming = Array.from(files || []);
		if (!incoming.length) return;
		setImageFiles((prev) => [...prev, ...incoming].slice(0, MAX_IMAGES));
	};

	const handleRemoveImage = (index) => {
		setImageFiles((prev) => prev.filter((_, i) => i !== index));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setStatus({ loading: true, error: "", success: "" });

		try {
			let uploadedImages = [];
			if (imageFiles.length) {
				const { data } = await uploadProductImages(imageFiles);
				uploadedImages = data?.images || [];
			}

			await createProduct({
				...formData,
				price: Number(formData.price),
				stock: Number(formData.stock),
				images: uploadedImages,
			});
			setStatus({ loading: false, error: "", success: "Product created." });
			setFormData({
				name: "",
				price: "",
				description: "",
				category: "",
				stock: "",
			});
			setImageFiles([]);
		} catch (error) {
			setStatus({
				loading: false,
				error: error?.response?.data?.message || "Failed to add product.",
				success: "",
			});
		}
	};

	return (
		<div className="glass-card rounded-3xl p-8 shadow-soft">
			<h2 className="text-xl font-semibold">Add new product</h2>
			<p className="mt-2 text-sm text-slate-600">
				Share your latest inventory with GizmoGrid shoppers.
			</p>
			{status.error ? (
				<p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs text-rose-600">
					{status.error}
				</p>
			) : null}
			{status.success ? (
				<p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs text-emerald-600">
					{status.success}
				</p>
			) : null}
			<div className="mt-6">
				<ProductForm
					values={formData}
					onChange={handleChange}
					onSubmit={handleSubmit}
					loading={status.loading}
					onFilesChange={handleFilesChange}
					onRemoveImage={handleRemoveImage}
					imagePreviews={imagePreviews}
				/>
			</div>
		</div>
	);
};

export default AddProduct;
