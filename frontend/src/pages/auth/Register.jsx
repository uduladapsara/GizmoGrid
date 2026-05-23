import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register as registerRequest } from "../../services/authService.js";

const Register = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		role: "user",
	});
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleChange = (event) => {
		setFormData((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");
		setSuccess("");

		if (!formData.name || !formData.email || !formData.password) {
			setError("All fields are required.");
			return;
		}

		try {
			await registerRequest(formData);
			setSuccess(
				formData.role === "seller"
					? "Seller account created. Awaiting admin approval before you can log in."
					: "Account created successfully! Redirecting to login..."
			);
			setTimeout(() => navigate("/login"), 1500);
		} catch (err) {
			setError(err?.response?.data?.message || "Registration failed.");
		}
	};

	return (
		<div className="mx-auto max-w-lg">
			<div className="glass-card rounded-3xl p-8 shadow-soft">
				<h1 className="text-2xl font-semibold">Create your account</h1>
				<p className="mt-2 text-sm text-slate-600">
					Join GizmoGrid to access curated drops and seller exclusives.
				</p>
				<form className="mt-6 space-y-4" onSubmit={handleSubmit}>
					<input
						className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
						placeholder="Full name"
						name="name"
						value={formData.name}
						onChange={handleChange}
					/>
					<input
						className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
						placeholder="Email address"
						name="email"
						type="email"
						value={formData.email}
						onChange={handleChange}
					/>
					<input
						className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
						placeholder="Password"
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
					/>
					<select
						className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
						name="role"
						value={formData.role}
						onChange={handleChange}
					>
						<option value="user">User (Shopper)</option>
						<option value="seller">Seller</option>
					</select>
					{formData.role === "seller" && (
						<p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-700">
							Seller accounts require admin approval before you can log in.
						</p>
					)}
					{error ? (
						<p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs text-rose-600">
							{error}
						</p>
					) : null}
					{success ? (
						<p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs text-emerald-600">
							{success}
						</p>
					) : null}
					<button className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
						Create account
					</button>
				</form>
				<p className="mt-4 text-sm text-slate-600">
					Already have an account?{" "}
					<Link to="/login" className="font-semibold text-slate-900">
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;
