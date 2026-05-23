import { useEffect, useState } from "react";
import api from "../../services/api.js";

const ManageUsers = () => {
	const [users, setUsers] = useState([]);
	const [error, setError] = useState("");

	const loadUsers = async () => {
		try {
			const response = await api.get("/admin/users");
			setUsers(response.data || []);
		} catch (err) {
			setError(err?.response?.data?.message || "Failed to load users.");
		}
	};

	useEffect(() => {
		loadUsers();
	}, []);

	const handleApprove = async (id) => {
		await api.put(`/admin/approve-user/${id}`);
		loadUsers();
	};

	const handleBlock = async (id) => {
		await api.put(`/admin/block-user/${id}`);
		loadUsers();
	};

	return (
		<div className="glass-card rounded-3xl p-8 shadow-soft">
			<h2 className="text-xl font-semibold">User management</h2>
			{error ? (
				<p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs text-rose-600">
					{error}
				</p>
			) : null}
			<div className="mt-6 space-y-4">
				{users.map((user) => (
					<div
						key={user._id}
						className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4"
					>
						<div>
							<p className="text-sm font-semibold text-slate-900">{user.name}</p>
							<p className="text-xs text-slate-500">
								{user.isBlocked ? "Blocked" : "Active"}
								{user.userApproved ? "" : " • Pending"}
							</p>
						</div>
						<div className="flex gap-2">
							{!user.userApproved ? (
								<button
									className="rounded-full bg-emerald-500 px-3 py-2 text-xs text-white"
									onClick={() => handleApprove(user._id)}
								>
									Approve
								</button>
							) : null}
							<button
								className="rounded-full border border-slate-200 px-3 py-2 text-xs"
								onClick={() => handleBlock(user._id)}
							>
								Toggle block
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ManageUsers;
