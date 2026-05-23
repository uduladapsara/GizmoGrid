import { Link } from "react-router-dom";

const ForgotPassword = () => {
	return (
		<div className="mx-auto max-w-lg">
			<div className="glass-card rounded-3xl p-8 shadow-soft">
				<h1 className="text-2xl font-semibold">Reset password</h1>
				<p className="mt-2 text-sm text-slate-600">
					Enter your email to receive reset instructions.
				</p>
				<form className="mt-6 space-y-4">
					<input
						className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
						placeholder="Email address"
					/>
					<button className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
						Send reset link
					</button>
				</form>
				<p className="mt-4 text-sm text-slate-600">
					Remembered your password?{" "}
					<Link to="/login" className="font-semibold text-slate-900">
						Back to login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default ForgotPassword;
