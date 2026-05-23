import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import Loader from "../../components/common/Loader.jsx";
import formatCurrency from "../../utils/formatCurrency.js";
import { fetchProductById } from "../../services/productService.js";
import { addCartItem } from "../../services/cartService.js";
import useAuth from "../../hooks/useAuth.js";

const ProductDetails = () => {
	const { id } = useParams();
	const { user } = useAuth();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [adding, setAdding] = useState(false);
	const [added, setAdded] = useState(false);

	useEffect(() => {
		const load = async () => {
			try {
				const response = await fetchProductById(id);
				setProduct(response.data);
			} catch (err) {
				setError("Product not found.");
			} finally {
				setLoading(false);
			}
		};
		if (id) load();
	}, [id]);

	const handleAddToCart = async () => {
		if (!user || user.role !== "user") return;
		setAdding(true);
		try {
			await addCartItem({ productId: product._id, quantity: 1 });
			setAdded(true);
			setTimeout(() => setAdded(false), 2500);
		} catch (err) {
			setError(err?.response?.data?.message || "Failed to add to cart.");
		} finally {
			setAdding(false);
		}
	};

	if (loading) return <Loader />;
	if (!product) return (
		<div className="glass-card rounded-2xl p-8 text-center">
			<p className="text-slate-500">{error || "Product not found."}</p>
			<Link to="/products" className="mt-4 inline-block text-sm text-blue-600">← Back to products</Link>
		</div>
	);

	return (
		<div className="space-y-10">
			<div className="flex items-center gap-2 text-xs text-slate-500">
				<Link to="/products" className="hover:text-slate-900">Products</Link>
				<span>/</span>
				<span>{product.category || "General"}</span>
				<span>/</span>
				<span className="text-slate-800">{product.name}</span>
			</div>
			<div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
				<div className="glass-card rounded-[32px] p-6">
					<div className="flex h-80 items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
						{product.images?.length ? (
							<img src={product.images[0]} alt={product.name} className="h-full w-full object-contain" />
						) : (
							<span className="text-sm text-slate-400">No image available</span>
						)}
					</div>
					{product.images?.length > 1 && (
						<div className="mt-4 grid grid-cols-3 gap-3">
							{product.images.slice(1, 4).map((img, i) => (
								<div key={i} className="flex h-20 items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
									<img src={img} alt="" className="h-full w-full object-cover" />
								</div>
							))}
						</div>
					)}
				</div>
				<div className="glass-card rounded-[32px] p-8">
					<span className="brand-chip rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em]">
						{product.category || "General"}
					</span>
					<h1 className="mt-4 text-3xl font-semibold text-slate-900">{product.name}</h1>
					<p className="mt-3 text-sm text-slate-600">{product.description}</p>
					<div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
						{product.ratingsAverage > 0 && (
							<>
								<span className="font-semibold text-amber-500">{product.ratingsAverage.toFixed(1)}★</span>
								<span>({product.ratingsCount} reviews)</span>
							</>
						)}
						<span className={product.stock > 0 ? "text-emerald-600" : "text-rose-500"}>
							{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
						</span>
					</div>
					<div className="mt-6 flex items-center gap-4">
						<p className="text-3xl font-semibold">{formatCurrency(product.price)}</p>
					</div>
					{error && (
						<p className="mt-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs text-rose-600">{error}</p>
					)}
					<div className="mt-6 flex flex-wrap gap-3">
						{user?.role === "user" ? (
							<button
								onClick={handleAddToCart}
								disabled={adding || product.stock === 0}
								className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${
									added ? "bg-emerald-100 text-emerald-700" : "bg-emerald-900 text-white hover:bg-emerald-800"
								} disabled:opacity-60`}
							>
								<FiShoppingCart />
								{added ? "Added to cart!" : adding ? "Adding..." : "Add to cart"}
							</button>
						) : !user ? (
							<Link to="/login" className="flex items-center gap-2 rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white">
								Sign in to buy
							</Link>
						) : null}
						<button className="flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700">
							<FiHeart /> Wishlist
						</button>
					</div>
					<div className="mt-8 grid gap-3 text-sm">
						<div className="rounded-2xl border border-slate-200 px-4 py-3">
							<p className="text-slate-500">Seller</p>
							<p className="font-semibold">{product.seller?.name || "GizmoGrid Seller"}</p>
						</div>
						<div className="rounded-2xl border border-slate-200 px-4 py-3">
							<p className="text-slate-500">Warranty</p>
							<p className="font-semibold">2 years coverage</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
