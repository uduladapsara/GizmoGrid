import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader.jsx";
import api from "../../services/api.js";
import useAuth from "../../hooks/useAuth.js";

const Profile = () => {
	const { user, login } = useAuth();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		address: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	useEffect(() => {
		if (user) {
			setFormData({
				name: user.name || "",
				email: user.email || "",
				phone: user.phone || "",
				address: user.address || "",
				password: "",
			});
		}
	}, [user]);

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setSuccess("");
		try {
			const payload = { ...formData };
			if (!payload.password) delete payload.password;
			const response = await api.put("/users/me", payload);
			// Update stored user
			login({ ...user, ...response.data });
			setSuccess("Profile updated successfully.");
		} catch (err) {
			setError(err?.response?.data?.message || "Update failed.");
		} finally {
			setLoading(false);
		}
	};

	if (!user) return <Loader />;

	return (
		<div className="glass-card rounded-3xl p-8 shadow-soft">
			<h2 className="text-xl font-semibold">Profile settings</h2>
			{error && (
				<p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs text-rose-600">
					{error}
				</p>
			)}
			{success && (
				<p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs text-emerald-600">
					{success}
				</p>
			)}
			<form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
				<div className="grid gap-1">
					<label className="text-xs text-slate-500">Full name</label>
					<input
						className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
						placeholder="Full name"
						name="name"
						value={formData.name}
						onChange={handleChange}
					/>
				</div>
				<div className="grid gap-1">
					<label className="text-xs text-slate-500">Email address</label>
					<input
						className="rounded-xl border border-slate-200 px-4 py-3 text-sm bg-slate-50"
						placeholder="Email address"
						name="email"
						value={formData.email}
						disabled
					/>
				</div>
				<div className="grid gap-1">
					<label className="text-xs text-slate-500">Phone</label>
					<input
						className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
						placeholder="Phone"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
					/>
				</div>
				<div className="grid gap-1">
					<label className="text-xs text-slate-500">Delivery address</label>
					<input
						className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
						placeholder="Delivery address"
						name="address"
						value={formData.address}
						onChange={handleChange}
					/>
				</div>
				<div className="grid gap-1 md:col-span-2">
					<label className="text-xs text-slate-500">New password (leave blank to keep current)</label>
					<input
						className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
						placeholder="New password"
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
					/>
				</div>
				<button
					type="submit"
					disabled={loading}
					className="md:col-span-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
				>
					{loading ? "Updating..." : "Update profile"}
				</button>
			</form>
		</div>
	);
};

export default Profile;
