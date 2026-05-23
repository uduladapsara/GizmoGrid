import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader.jsx";
import api from "../../services/api.js";
import formatCurrency from "../../utils/formatCurrency.js";

const ManageProducts = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [deleting, setDeleting] = useState(null);

	const load = async () => {
		setLoading(true);
		try {
			const response = await api.get("/seller/products");
			setProducts(response.data || []);
		} catch (err) {
			setError(err?.response?.data?.message || "Failed to load products.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => { load(); }, []);

	const handleDelete = async (id) => {
		if (!confirm("Delete this product?")) return;
		setDeleting(id);
		try {
			await api.delete(`/products/${id}`);
			load();
		} catch (err) {
			setError(err?.response?.data?.message || "Delete failed.");
		} finally {
			setDeleting(null);
		}
	};

	const handleToggleActive = async (product) => {
		try {
			await api.put(`/products/${product._id}`, { isActive: !product.isActive });
			load();
		} catch (err) {
			setError("Update failed.");
		}
	};

	if (loading) return <Loader />;

	return (
		<div className="glass-card rounded-3xl p-8 shadow-soft">
			<h2 className="text-xl font-semibold">Manage products</h2>
			{error && (
				<p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs text-rose-600">
					{error}
				</p>
			)}
			{products.length === 0 && !error ? (
				<p className="mt-6 text-sm text-slate-500">No products yet. Add your first product!</p>
			) : (
				<div className="mt-6 space-y-4">
					{products.map((product) => (
						<div
							key={product._id}
							className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4"
						>
							<div className="flex-1 min-w-0">
								<p className="text-sm font-semibold text-slate-900 truncate">{product.name}</p>
								<p className="text-xs text-slate-500">
									Stock: {product.stock} · {formatCurrency(product.price)} ·{" "}
									<span className={product.isActive ? "text-emerald-600" : "text-rose-500"}>
										{product.isActive ? "Active" : "Inactive"}
									</span>
								</p>
							</div>
							<div className="flex gap-2 ml-4 shrink-0">
								<button
									className="rounded-full border border-slate-200 px-3 py-2 text-xs hover:bg-slate-50"
									onClick={() => handleToggleActive(product)}
								>
									{product.isActive ? "Deactivate" : "Activate"}
								</button>
								<button
									className="rounded-full bg-rose-500 px-3 py-2 text-xs text-white hover:bg-rose-600 disabled:opacity-60"
									onClick={() => handleDelete(product._id)}
									disabled={deleting === product._id}
								>
									{deleting === product._id ? "..." : "Delete"}
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ManageProducts;
