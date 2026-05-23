import { useEffect, useState } from "react";
import api from "../../services/api.js";

const ManageSellers = () => {
	const [sellers, setSellers] = useState([]);
	const [error, setError] = useState("");

	const loadSellers = async () => {
		try {
			const response = await api.get("/admin/sellers");
			setSellers(response.data || []);
		} catch (err) {
			setError(err?.response?.data?.message || "Failed to load sellers.");
		}
	};

	useEffect(() => {
		loadSellers();
	}, []);

	const handleApprove = async (id) => {
		await api.put(`/admin/approve-seller/${id}`);
		loadSellers();
	};

	return (
		<div className="glass-card rounded-3xl p-8 shadow-soft">
			<h2 className="text-xl font-semibold">Seller approvals</h2>
			{error ? (
				<p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs text-rose-600">
					{error}
				</p>
			) : null}
			<div className="mt-6 space-y-4">
				{sellers.map((seller) => (
					<div
						key={seller._id}
						className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4"
					>
						<div>
							<p className="text-sm font-semibold text-slate-900">{seller.name}</p>
							<p className="text-xs text-slate-500">
								{seller.sellerApproved ? "Approved" : "Pending"}
							</p>
						</div>
						<div className="flex gap-2">
							{!seller.sellerApproved ? (
								<button
									className="rounded-full bg-emerald-500 px-3 py-2 text-xs text-white"
									onClick={() => handleApprove(seller._id)}
								>
									Approve
								</button>
							) : null}
							<button className="rounded-full border border-slate-200 px-3 py-2 text-xs">
								Review
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ManageSellers;
