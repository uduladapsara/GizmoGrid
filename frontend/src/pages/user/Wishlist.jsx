const Wishlist = () => {
	const items = [
		{ id: 1, name: "Aurora Backpack", price: "$79" },
		{ id: 2, name: "Pulse Fit Band", price: "$129" },
	];

	return (
		<div className="glass-card rounded-3xl p-8 shadow-soft">
			<h2 className="text-xl font-semibold">Wishlist</h2>
			<div className="mt-6 space-y-4">
				{items.map((item) => (
					<div
						key={item.id}
						className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4"
					>
						<div>
							<p className="text-sm font-semibold text-slate-900">{item.name}</p>
							<p className="text-xs text-slate-500">{item.price}</p>
						</div>
						<button className="rounded-full bg-slate-900 px-4 py-2 text-xs text-white">
							Move to cart
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Wishlist;
