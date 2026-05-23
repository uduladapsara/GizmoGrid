import { Outlet } from "react-router-dom";
import SellerSidebar from "../components/dashboard/SellerSidebar.jsx";

const SellerLayout = () => {
	return (
		<div className="page-shell min-h-screen">
			<div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[240px_1fr]">
				<SellerSidebar />
				<section className="space-y-6">
					<div className="glass-card flex items-center justify-between rounded-2xl px-6 py-4 shadow-soft">
						<div>
							<p className="text-xs uppercase text-slate-500">Seller workspace</p>
							<h2 className="text-lg font-semibold">Growth Studio</h2>
						</div>
						<span className="rounded-full bg-emerald-600 px-3 py-1 text-xs text-white">
							Healthy
						</span>
					</div>
					<Outlet />
				</section>
			</div>
		</div>
	);
};

export default SellerLayout;
