import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login as loginRequest } from "../../services/authService.js";
import useAuth from "../../hooks/useAuth.js";

const Login = () => {
	const navigate = useNavigate();
	const { login, loading } = useAuth();
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = (event) => {
		setFormData((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");

		try {
			const response = await loginRequest(formData);
			const payload = response.data;
			login(payload);

			switch (payload.role) {
				case "admin":
					navigate("/admin/dashboard");
					break;
				case "seller":
					navigate("/seller/dashboard");
					break;
				default:
					navigate("/user/dashboard");
			}
		} catch (err) {
			setError(
				err?.response?.data?.message || "Login failed. Please try again."
			);
		}
	};
	return (
		<div className="mx-auto max-w-4xl">
			<div className="grid overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl md:grid-cols-[1fr_1.1fr]">
				<div className="hidden flex-col justify-between bg-emerald-950 p-10 text-white md:flex">
					<div>
						<p className="text-xs uppercase tracking-[0.2em] text-emerald-200">
							GizmoGrid access
						</p>
						<h2 className="mt-6 text-3xl font-semibold">
							Unlock curated drops and exclusive seller storefronts.
						</h2>
						<p className="mt-4 text-sm text-emerald-100">
							Sign in to manage your orders, wishlist, and account settings.
						</p>
					</div>
					<div className="text-xs text-emerald-200">
						Trusted by 2,000+ sellers worldwide
					</div>
				</div>
				<div className="p-8 md:p-10">
					<h1 className="text-2xl font-semibold">Welcome back</h1>
					<p className="mt-2 text-sm text-slate-600">
						Sign in to manage orders, wishlists, and your profile.
					</p>
					<form className="mt-6 space-y-4" onSubmit={handleSubmit}>
						<input
							className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
							placeholder="Email address"
							name="email"
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
						{error ? (
							<p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs text-rose-600">
								{error}
							</p>
						) : null}
						<button
							disabled={loading}
							className="w-full rounded-xl bg-emerald-900 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
						>
							{loading ? "Signing in..." : "Sign in"}
						</button>
					</form>
					<div className="mt-4 flex items-center justify-between text-sm text-slate-600">
						<Link to="/forgot-password" className="hover:text-slate-900">
							Forgot password?
						</Link>
						<Link to="/register" className="font-semibold text-slate-900">
							Create account
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
