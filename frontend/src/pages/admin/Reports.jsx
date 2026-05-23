const Reports = () => {
	return (
		<div className="grid gap-6 lg:grid-cols-2">
			<div className="glass-card rounded-3xl p-8 shadow-soft">
				<h2 className="text-xl font-semibold">Revenue reports</h2>
				<p className="mt-3 text-sm text-slate-600">
					Download month-end summaries for finance and compliance.
				</p>
				<button className="mt-6 rounded-full bg-slate-900 px-4 py-2 text-xs text-white">
					Download PDF
				</button>
			</div>
			<div className="glass-card rounded-3xl p-8 shadow-soft">
				<h2 className="text-xl font-semibold">System activity</h2>
				<ul className="mt-4 space-y-3 text-sm text-slate-600">
					<li>12 new sellers onboarded this week.</li>
					<li>3 products flagged for review.</li>
					<li>Average delivery time: 2.4 days.</li>
				</ul>
			</div>
		</div>
	);
};

export default Reports;
