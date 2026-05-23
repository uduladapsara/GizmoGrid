import { useEffect, useState } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { FiUsers, FiPackage, FiShoppingBag, FiTrendingUp } from "react-icons/fi";
import Loader from "../../components/common/Loader.jsx";
import api from "../../services/api.js";

const chartData = [
	{ name: "Jan", users: 120, orders: 90 },
	{ name: "Feb", users: 180, orders: 140 },
	{ name: "Mar", users: 240, orders: 170 },
	{ name: "Apr", users: 210, orders: 190 },
	{ name: "May", users: 280, orders: 230 },
];

const AdminDashboard = () => {
	const [stats, setStats] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			try {
				const [reports, users, sellers] = await Promise.all([
					api.get("/admin/reports"),
					api.get("/admin/users"),
					api.get("/admin/sellers"),
				]);
				setStats({
					totalUsers: users.data?.length || reports.data?.totalUsers || 0,
					totalSellers: sellers.data?.length || 0,
					totalProducts: reports.data?.totalProducts || 0,
					totalOrders: reports.data?.totalOrders || 0,
				});
			} catch {
				setStats({ totalUsers: 0, totalSellers: 0, totalProducts: 0, totalOrders: 0 });
			} finally {
				setLoading(false);
			}
		};
		load();
	}, []);

	if (loading) return <Loader />;

	const cards = [
		{ label: "Total users", value: stats.totalUsers, icon: FiUsers },
		{ label: "Sellers", value: stats.totalSellers, icon: FiTrendingUp },
		{ label: "Products", value: stats.totalProducts, icon: FiPackage },
		{ label: "Orders", value: stats.totalOrders, icon: FiShoppingBag },
	];

	return (
		<div className="space-y-6">
			<div className="grid gap-4 md:grid-cols-4">
				{cards.map((card) => (
					<div key={card.label} className="glass-card rounded-2xl p-5">
						<div className="flex items-center justify-between">
							<p className="text-xs uppercase tracking-[0.2em] text-slate-500">
								{card.label}
							</p>
							<card.icon className="text-slate-400" />
						</div>
						<p className="mt-4 text-2xl font-semibold text-slate-900">
							{card.value.toLocaleString()}
						</p>
						<p className="mt-1 text-xs text-slate-500">Live data</p>
					</div>
				))}
			</div>

			<div className="glass-card rounded-2xl p-6">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-semibold">Growth overview</h3>
					<span className="rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
						Healthy
					</span>
				</div>
				<div className="mt-4 h-64">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={chartData}>
							<XAxis dataKey="name" stroke="#94a3b8" />
							<YAxis stroke="#94a3b8" />
							<Tooltip />
							<Bar dataKey="users" fill="#0f766e" radius={[6, 6, 0, 0]} />
							<Bar dataKey="orders" fill="#0f172a" radius={[6, 6, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
