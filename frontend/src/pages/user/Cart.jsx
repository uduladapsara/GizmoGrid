import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "../../components/cart/CartItem.jsx";
import CartSummary from "../../components/cart/CartSummary.jsx";
import Loader from "../../components/common/Loader.jsx";
import { fetchCart, removeCartItem } from "../../services/cartService.js";

const Cart = () => {
	const [cart, setCart] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const loadCart = async () => {
		setLoading(true);
		try {
			const response = await fetchCart();
			setCart(response.data);
		} catch (err) {
			setError(err?.response?.data?.message || "Failed to load cart.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadCart();
	}, []);

	const handleRemove = async (productId) => {
		try {
			await removeCartItem(productId);
			loadCart();
		} catch (err) {
			setError(err?.response?.data?.message || "Failed to remove item.");
		}
	};

	if (loading) return <Loader />;

	const items = cart?.items || [];
	const total = items.reduce(
		(sum, item) => sum + (item.unitPrice ?? 0) * item.quantity,
		0
	);

	return (
		<div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
			<div className="space-y-4">
				<h2 className="text-xl font-semibold">Your cart</h2>
				{error && (
					<p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs text-rose-600">
						{error}
					</p>
				)}
				{items.length === 0 ? (
					<div className="glass-card rounded-2xl p-8 text-center">
						<p className="text-slate-500">Your cart is empty.</p>
						<Link
							to="/products"
							className="mt-4 inline-block rounded-full bg-emerald-900 px-6 py-2 text-sm font-semibold text-white"
						>
							Shop now
						</Link>
					</div>
				) : (
					items.map((item, index) => (
						<CartItem
							key={item.product?._id || index}
							item={item}
							onRemove={handleRemove}
						/>
					))
				)}
			</div>
			<CartSummary total={total} />
		</div>
	);
};

export default Cart;
