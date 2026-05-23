import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/Loader.jsx";
import { fetchCart } from "../../services/cartService.js";
import { createOrder } from "../../services/orderService.js";
import formatCurrency from "../../utils/formatCurrency.js";

const Checkout = () => {
	const navigate = useNavigate();
	const [cart, setCart] = useState(null);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");
	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		address: "",
		paymentProvider: "paypal",
	});

	useEffect(() => {
		const load = async () => {
			try {
				const response = await fetchCart();
				setCart(response.data);
			} catch (err) {
				setError("Failed to load cart.");
			} finally {
				setLoading(false);
			}
		};
		load();
	}, []);

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.name || !formData.address) {
			setError("Name and address are required.");
			return;
		}
		setSubmitting(true);
		setError("");
		try {
			const items = cart?.items || [];
			const total = items.reduce(
				(sum, item) => sum + (item.unitPrice ?? 0) * item.quantity,
				0
			);
			await createOrder({
				items: items.map((item) => ({
					product: item.product._id || item.product,
					quantity: item.quantity,
					unitPrice: item.unitPrice,
				})),
				totalPrice: total + 12,
				shippingAddress: `${formData.name}, ${formData.phone}, ${formData.address}`,
				paymentProvider: formData.paymentProvider,
			});
			navigate("/user/orders");
		} catch (err) {
			setError(err?.response?.data?.message || "Order placement failed.");
		} finally {
			setSubmitting(false);
		}
	};

	if (loading) return <Loader />;

	const items = cart?.items || [];
	const subtotal = items.reduce(
		(sum, item) => sum + (item.unitPrice ?? 0) * item.quantity,
		0
	);

	return (
		<div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
			<form className="glass-card rounded-3xl p-8 shadow-soft" onSubmit={handleSubmit}>
				<h2 className="text-xl font-semibold">Checkout</h2>
				{error && (
					<p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs text-rose-600">
						{error}
					</p>
				)}
				<div className="mt-6 grid gap-4 md:grid-cols-2">
					<input
						className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
						placeholder="Full name *"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
					<input
						className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
						placeholder="Phone"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
					/>
					<input
						className="md:col-span-2 rounded-xl border border-slate-200 px-4 py-3 text-sm"
						placeholder="Shipping address *"
						name="address"
						value={formData.address}
						onChange={handleChange}
						required
					/>
					<select
						className="md:col-span-2 rounded-xl border border-slate-200 px-4 py-3 text-sm"
						name="paymentProvider"
						value={formData.paymentProvider}
						onChange={handleChange}
					>
						<option value="paypal">PayPal</option>
						<option value="payhere">PayHere</option>
						<option value="card">Card (Cash on delivery)</option>
					</select>
				</div>
				<button
					type="submit"
					disabled={submitting || items.length === 0}
					className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
				>
					{submitting ? "Placing order..." : "Place order"}
				</button>
			</form>
			<div className="glass-card rounded-3xl p-8 shadow-soft">
				<h3 className="text-lg font-semibold">Order summary</h3>
				<div className="mt-4 space-y-3 text-sm text-slate-600">
					{items.map((item, i) => (
						<div key={i} className="flex justify-between">
							<span>{item.product?.name || "Product"} × {item.quantity}</span>
							<span>{formatCurrency((item.unitPrice ?? 0) * item.quantity)}</span>
						</div>
					))}
					<hr className="border-slate-200" />
					<div className="flex justify-between">
						<span>Subtotal</span>
						<span>{formatCurrency(subtotal)}</span>
					</div>
					<div className="flex justify-between">
						<span>Shipping</span>
						<span>{formatCurrency(12)}</span>
					</div>
					<div className="flex justify-between font-semibold text-slate-900">
						<span>Total</span>
						<span>{formatCurrency(subtotal + 12)}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
