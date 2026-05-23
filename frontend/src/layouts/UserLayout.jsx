import { Outlet } from "react-router-dom";
import UserSidebar from "../components/dashboard/UserSidebar.jsx";

const UserLayout = () => {
	return (
		<div className="page-shell min-h-screen">
			<div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[240px_1fr]">
				<UserSidebar />
				<section className="space-y-6">
					<div className="glass-card flex items-center justify-between rounded-2xl px-6 py-4 shadow-soft">
						<div>
							<p className="text-xs uppercase text-slate-500">Welcome back</p>
							<h2 className="text-lg font-semibold">Your Space</h2>
						</div>
						<span className="rounded-full bg-blue-600 px-3 py-1 text-xs text-white">
							Active
						</span>
					</div>
					<Outlet />
				</section>
			</div>
		</div>
	);
};

export default UserLayout;
