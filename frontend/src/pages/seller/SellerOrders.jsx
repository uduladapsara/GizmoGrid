import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader.jsx";
import api from "../../services/api.js";
import formatCurrency from "../../utils/formatCurrency.js";

const statusColor = {
	pending: "bg-amber-100 text-amber-700",
	shipped: "bg-blue-100 text-blue-700",
	delivered: "bg-emerald-100 text-emerald-700",
	cancelled: "bg-rose-100 text-rose-700",
};

const SellerOrders = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const load = async () => {
		setLoading(true);
		try {
			const response = await api.get("/seller/orders");
			setOrders(response.data || []);
		} catch (err) {
			setError(err?.response?.data?.message || "Failed to load orders.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => { load(); }, []);

	const handleStatusChange = async (orderId, deliveryStatus) => {
		try {
			await api.put(`/orders/${orderId}`, { deliveryStatus });
			load();
		} catch (err) {
			setError("Status update failed.");
		}
	};

	if (loading) return <Loader />;

	return (
		<div className="glass-card rounded-3xl p-8 shadow-soft">
			<h2 className="text-xl font-semibold">Order management</h2>
			{error && (
				<p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs text-rose-600">
					{error}
				</p>
			)}
			{orders.length === 0 && !error ? (
				<p className="mt-6 text-sm text-slate-500">No orders yet.</p>
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
							<div className="flex items-center gap-3">
								<span className="text-sm font-semibold text-slate-900">
									{formatCurrency(order.totalPrice)}
								</span>
								<select
									className="rounded-full border border-slate-200 px-3 py-2 text-xs"
									value={order.deliveryStatus}
									onChange={(e) => handleStatusChange(order._id, e.target.value)}
								>
									<option value="pending">Pending</option>
									<option value="shipped">Shipped</option>
									<option value="delivered">Delivered</option>
									<option value="cancelled">Cancelled</option>
								</select>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default SellerOrders;
