import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/dashboard/AdminSidebar.jsx";

const AdminLayout = () => {
	return (
		<div className="page-shell min-h-screen">
			<div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[240px_1fr]">
				<AdminSidebar />
				<section className="space-y-6">
					<div className="glass-card flex items-center justify-between rounded-2xl px-6 py-4 shadow-soft">
						<div>
							<p className="text-xs uppercase text-slate-500">Admin control</p>
							<h2 className="text-lg font-semibold">Command Center</h2>
						</div>
						<span className="rounded-full bg-slate-900 px-3 py-1 text-xs text-white">
							Live
						</span>
					</div>
					<Outlet />
				</section>
			</div>
		</div>
	);
};

export default AdminLayout;
