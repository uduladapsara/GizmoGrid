import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/common/Loader.jsx";
import { fetchOrders } from "../../services/orderService.js";
import useAuth from "../../hooks/useAuth.js";

const UserDashboard = () => {
	const { user } = useAuth();
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			try {
				const response = await fetchOrders();
				setOrders(response.data || []);
			} catch {
				// non-critical
			} finally {
				setLoading(false);
			}
		};
		load();
	}, []);

	if (loading) return <Loader />;

	const activeOrders = orders.filter(
		(o) => o.deliveryStatus !== "delivered" && o.deliveryStatus !== "cancelled"
	).length;

	const cards = [
		{ label: "Active orders", value: activeOrders },
		{ label: "Total orders", value: orders.length },
		{ label: "Account", value: user?.role || "user" },
	];

	return (
		<div className="space-y-6">
			<div className="glass-card rounded-2xl p-5">
				<p className="text-sm text-slate-500">Welcome back,</p>
				<h2 className="text-xl font-semibold text-slate-900">{user?.name}</h2>
				<p className="text-xs text-slate-400">{user?.email}</p>
			</div>
			<div className="grid gap-4 md:grid-cols-3">
				{cards.map((card) => (
					<div key={card.label} className="glass-card rounded-2xl p-5 shadow-soft">
						<p className="text-xs uppercase text-slate-500">{card.label}</p>
						<p className="mt-3 text-2xl font-semibold text-slate-900">{card.value}</p>
					</div>
				))}
			</div>
			<div className="glass-card rounded-2xl p-6 shadow-soft">
				<h3 className="text-lg font-semibold">Quick actions</h3>
				<div className="mt-4 grid gap-4 sm:grid-cols-2">
					<Link
						to="/products"
						className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-center hover:bg-slate-50"
					>
						Browse products
					</Link>
					<Link
						to="/user/orders"
						className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-center hover:bg-slate-50"
					>
						View orders
					</Link>
					<Link
						to="/user/cart"
						className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-center hover:bg-slate-50"
					>
						View cart
					</Link>
					<Link
						to="/user/profile"
						className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-center hover:bg-slate-50"
					>
						Manage profile
					</Link>
				</div>
			</div>
		</div>
	);
};

export default UserDashboard;
