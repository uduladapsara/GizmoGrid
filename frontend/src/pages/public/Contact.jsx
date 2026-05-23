const Contact = () => {
	return (
		<div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
			<div className="glass-card rounded-3xl p-8 shadow-soft">
				<h1 className="text-3xl font-semibold">Contact us</h1>
				<p className="mt-3 text-sm text-slate-600">
					Reach out for order support, partnerships, or press inquiries.
				</p>
				<div className="mt-6 space-y-4 text-sm text-slate-600">
					<p>Email: support@gizmogird.com</p>
					<p>Phone: +1 (800) 555-0199</p>
					<p>Office: 21/4 Union Place, Colombo</p>
				</div>
			</div>
			<form className="glass-card rounded-3xl p-8 shadow-soft">
				<div className="grid gap-4">
					<input
						className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
						placeholder="Your name"
					/>
					<input
						className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
						placeholder="Email address"
					/>
					<textarea
						className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
						rows="5"
						placeholder="How can we help?"
					/>
					<button className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
						Send message
					</button>
				</div>
			</form>
		</div>
	);
};

export default Contact;
