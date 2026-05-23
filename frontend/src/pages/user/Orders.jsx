import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader.jsx";
import { fetchOrders } from "../../services/orderService.js";
import formatCurrency from "../../utils/formatCurrency.js";

const statusColor = {
	pending: "bg-amber-100 text-amber-700",
	shipped: "bg-blue-100 text-blue-700",
	delivered: "bg-emerald-100 text-emerald-700",
	cancelled: "bg-rose-100 text-rose-700",
};

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const load = async () => {
			try {
				const response = await fetchOrders();
				setOrders(response.data || []);
			} catch (err) {
				setError(err?.response?.data?.message || "Failed to load orders.");
			} finally {
				setLoading(false);
			}
		};
		load();
	}, []);

	if (loading) return <Loader />;

	return (
		<div className="glass-card rounded-3xl p-8 shadow-soft">
			<h2 className="text-xl font-semibold">Order history</h2>
			{error && (
				<p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs text-rose-600">
					{error}
				</p>
			)}
			{orders.length === 0 && !error ? (
				<p className="mt-6 text-sm text-slate-500">No orders found.</p>
			) : (
				<div className="mt-6 space-y-4">
					{orders.map((order) => (
						<div
							key={order._id}
							className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4"
						>
							<div>
								<p className="text-sm font-semibold text-slate-900">
									#{order._id.slice(-8).toUpperCase()}
								</p>
								<p className="text-xs text-slate-500">
									{new Date(order.createdAt).toLocaleDateString()}
								</p>
								<span
									className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
										statusColor[order.deliveryStatus] || "bg-slate-100 text-slate-600"
									}`}
								>
									{order.deliveryStatus}
								</span>
							</div>
							<div className="text-right">
								<p className="text-sm font-semibold text-slate-900">
									{formatCurrency(order.totalPrice)}
								</p>
								<p className="text-xs text-slate-500">{order.paymentStatus}</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Orders;
