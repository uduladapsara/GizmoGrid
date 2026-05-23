import { useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import formatCurrency from "../../utils/formatCurrency.js";
import { addCartItem } from "../../services/cartService.js";
import useAuth from "../../hooks/useAuth.js";

const ProductCard = ({ product }) => {
	const { user } = useAuth();
	const [adding, setAdding] = useState(false);
	const [added, setAdded] = useState(false);
	const [err, setErr] = useState("");

	const handleAddToCart = async (e) => {
		e.preventDefault();
		if (!user || user.role !== "user") return;
		setAdding(true);
		setErr("");
		try {
			await addCartItem({ productId: product._id || product.id, quantity: 1 });
			setAdded(true);
			setTimeout(() => setAdded(false), 2000);
		} catch (error) {
			setErr("Failed to add");
		} finally {
			setAdding(false);
		}
	};

	return (
		<Link
			to={`/products/${product._id || product.id}`}
			className="glass-card flex h-full flex-col overflow-hidden rounded-2xl p-4 hover:shadow-md transition-shadow"
		>
			<div className="flex h-40 items-center justify-center overflow-hidden rounded-xl bg-slate-100 text-sm text-slate-400">
				{product.images?.length ? (
					<img
						src={product.images[0]}
						alt={product.name}
						className="h-full w-full object-cover"
					/>
				) : (
					<span>{product.imageLabel || "Product image"}</span>
				)}
			</div>
			<div className="mt-4 flex-1">
				<div className="flex items-center justify-between text-xs text-slate-500">
					<span className="brand-chip rounded-full px-2 py-1">{product.category || "New"}</span>
					<span>{product.ratingsAverage ? `${product.ratingsAverage.toFixed(1)}★` : ""}</span>
				</div>
				<h3 className="mt-3 text-base font-semibold text-slate-900">
					{product.name}
				</h3>
				<p className="mt-1 text-xs text-slate-400 line-clamp-2">{product.description}</p>
			</div>
			<div className="mt-4 flex items-center justify-between">
				<span className="text-lg font-semibold">
					{formatCurrency(product.price)}
				</span>
				<div className="flex gap-2">
					{user?.role === "user" && (
						<button
							onClick={handleAddToCart}
							disabled={adding}
							className={`rounded-full px-3 py-2 text-xs font-medium transition ${
								added
									? "bg-emerald-100 text-emerald-700"
									: "bg-emerald-900 text-white hover:bg-emerald-800"
							}`}
						>
							{added ? "Added!" : adding ? "..." : <FiShoppingCart />}
						</button>
					)}
					<button
						onClick={(e) => e.preventDefault()}
						className="rounded-full border border-slate-200 p-2 text-slate-600"
					>
						<FiHeart />
					</button>
				</div>
			</div>
			{err && <p className="mt-1 text-xs text-rose-500">{err}</p>}
		</Link>
	);
};

export default ProductCard;
