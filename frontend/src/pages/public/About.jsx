const About = () => {
	return (
		<div className="space-y-8">
			<div className="glass-card rounded-3xl p-8 shadow-soft">
				<h1 className="text-3xl font-semibold">About GizmoGrid</h1>
				<p className="mt-4 text-sm text-slate-600">
					GizmoGrid is a marketplace that blends thoughtful design with trusted
					sellers. We focus on clarity, fast checkout, and curated product
					discovery so every purchase feels intentional.
				</p>
			</div>
			<div className="grid gap-6 lg:grid-cols-3">
				{["Trust", "Speed", "Curation"].map((value) => (
					<div key={value} className="glass-card rounded-3xl p-6 shadow-soft">
						<h3 className="text-lg font-semibold">{value}</h3>
						<p className="mt-3 text-sm text-slate-600">
							Built for modern customers and sellers who value a calm, premium
							experience.
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default About;
