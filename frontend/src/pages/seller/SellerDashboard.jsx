import { useEffect, useState } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import Loader from "../../components/common/Loader.jsx";
import api from "../../services/api.js";
import formatCurrency from "../../utils/formatCurrency.js";

const chartData = [
	{ name: "Mon", sales: 400 },
	{ name: "Tue", sales: 620 },
	{ name: "Wed", sales: 540 },
	{ name: "Thu", sales: 800 },
	{ name: "Fri", sales: 720 },
	{ name: "Sat", sales: 980 },
	{ name: "Sun", sales: 860 },
];

const SellerDashboard = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			try {
				const [productsRes, reportsRes] = await Promise.all([
					api.get("/seller/products"),
					api.get("/seller/reports"),
				]);
				setData({
					totalProducts: productsRes.data?.length || 0,
					totalSales: reportsRes.data?.totalSales || 0,
					totalOrders: reportsRes.data?.totalOrders || 0,
				});
			} catch {
				setData({ totalProducts: 0, totalSales: 0, totalOrders: 0 });
			} finally {
				setLoading(false);
			}
		};
		load();
	}, []);

	if (loading) return <Loader />;

	const cards = [
		{ label: "Total sales", value: formatCurrency(data.totalSales) },
		{ label: "Orders", value: data.totalOrders },
		{ label: "Products", value: data.totalProducts },
	];

	return (
		<div className="space-y-6">
			<div className="grid gap-4 md:grid-cols-3">
				{cards.map((card) => (
					<div key={card.label} className="glass-card rounded-2xl p-5 shadow-soft">
						<p className="text-xs uppercase text-slate-500">{card.label}</p>
						<p className="mt-3 text-2xl font-semibold text-slate-900">{card.value}</p>
					</div>
				))}
			</div>

			<div className="glass-card rounded-2xl p-6 shadow-soft">
				<h3 className="text-lg font-semibold">Weekly revenue trend</h3>
				<div className="mt-4 h-56">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={chartData}>
							<XAxis dataKey="name" stroke="#94a3b8" />
							<YAxis stroke="#94a3b8" />
							<Tooltip />
							<Line
								type="monotone"
								dataKey="sales"
								stroke="#10b981"
								strokeWidth={3}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
};

export default SellerDashboard;
