const Footer = () => {
	return (
		<footer className="border-t border-slate-200 bg-white">
			<div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
				<div>
					<h3 className="text-lg font-semibold">GizmoGrid</h3>
					<p className="mt-3 text-sm text-slate-600">
						Curated tech, lifestyle, and home essentials delivered with care.
					</p>
				</div>
				<div>
					<h4 className="text-sm font-semibold uppercase text-slate-500">Explore</h4>
					<ul className="mt-3 space-y-2 text-sm text-slate-600">
						<li>New arrivals</li>
						<li>Best sellers</li>
						<li>Collections</li>
					</ul>
				</div>
				<div>
					<h4 className="text-sm font-semibold uppercase text-slate-500">Support</h4>
					<ul className="mt-3 space-y-2 text-sm text-slate-600">
						<li>Help center</li>
						<li>Returns</li>
						<li>Shipping</li>
					</ul>
				</div>
				<div>
					<h4 className="text-sm font-semibold uppercase text-slate-500">Contact</h4>
					<ul className="mt-3 space-y-2 text-sm text-slate-600">
						<li>support@gizmogird.com</li>
						<li>+1 (800) 555-0199</li>
						<li>Colombo, Sri Lanka</li>
					</ul>
				</div>
			</div>
			<div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
				© 2026 GizmoGrid. All rights reserved.
			</div>
		</footer>
	);
};

export default Footer;
