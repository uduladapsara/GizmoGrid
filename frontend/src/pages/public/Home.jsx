import { Link } from "react-router-dom";
import ProductList from "../../components/products/ProductList.jsx";

const featuredProducts = [
	{
		id: "p1",
		name: "Nebula Headset",
		category: "Audio",
		price: 149,
		imageLabel: "Headset",
		description: "Immersive soundstage with adaptive noise cancellation.",
	},
	{
		id: "p2",
		name: "Lumen Smart Lamp",
		category: "Home",
		price: 89,
		imageLabel: "Lamp",
		description: "Adaptive lighting that responds to your environment.",
	},
	{
		id: "p3",
		name: "Pulse Fit Band",
		category: "Fitness",
		price: 129,
		imageLabel: "Band",
		description: "Track health metrics with precision and style.",
	},
];

const categories = [
	"Electronics",
	"Fashion",
	"Beauty",
	"Home",
	"Gaming",
	"Fitness",
];

const Home = () => {
	return (
		<div className="space-y-16">
			<section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
				<div className="glass-card rounded-[32px] p-10">
					<span className="brand-chip rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em]">
						Curated market
					</span>
					<h1 className="mt-6 text-4xl font-semibold text-slate-900 md:text-5xl">
						Find the next iconic gadget, style piece, and home essential.
					</h1>
					<p className="mt-4 text-sm text-slate-600 md:text-base">
						Premium collections sourced from verified sellers with transparent
						pricing, rapid delivery, and calm checkout flows.
					</p>
					<div className="mt-6 flex flex-wrap gap-3">
						<Link
							to="/products"
							className="rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
						>
							Shop now
						</Link>
						<Link
							to="/products"
							className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
						>
							Explore collections
						</Link>
					</div>
					<div className="mt-8 grid gap-4 sm:grid-cols-3">
						{[
							{ label: "Delivery", value: "24-48h" },
							{ label: "Trusted sellers", value: "2,100+" },
							{ label: "Returns", value: "7 days" },
						].map((item) => (
							<div
								key={item.label}
								className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
							>
								<p className="text-xs uppercase text-slate-500">{item.label}</p>
								<p className="text-lg font-semibold text-slate-900">{item.value}</p>
							</div>
						))}
					</div>
				</div>
				<div className="relative overflow-hidden rounded-[32px] bg-emerald-950 p-8 text-white">
					<div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-400/30" />
					<div className="absolute -bottom-16 left-10 h-44 w-44 rounded-full bg-amber-300/20" />
					<div className="relative">
						<p className="text-xs uppercase tracking-[0.2em] text-emerald-200">
							Flash sale
						</p>
						<h2 className="mt-4 text-3xl font-semibold">
							48-hour drop: Nova Smart Watch
						</h2>
						<p className="mt-3 text-sm text-emerald-100">
							Graphite finish, adaptive tracking, and a week-long battery.
						</p>
						<div className="mt-6 flex items-center gap-3">
							<Link
								to="/products"
								className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-900"
							>
								Grab deal
							</Link>
							<span className="text-sm text-emerald-100">Only 320 left</span>
						</div>
					</div>
				</div>
			</section>

			<section>
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-semibold">Shop by category</h2>
					<Link to="/products" className="text-sm text-slate-600 hover:text-slate-900">View all</Link>
				</div>
				<div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{categories.map((category) => (
						<Link
							key={category}
							to={`/products`}
							className="glass-card rounded-2xl px-6 py-6 hover:shadow-md transition-shadow"
						>
							<p className="text-xs uppercase tracking-[0.2em] text-slate-400">
								Trending
							</p>
							<h3 className="mt-3 text-xl font-semibold text-slate-900">
								{category}
							</h3>
							<p className="mt-2 text-sm text-slate-500">
								Discover seasonal favorites
							</p>
						</Link>
					))}
				</div>
			</section>

			<section>
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-semibold">Featured products</h2>
					<Link to="/products" className="text-sm text-slate-600 hover:text-slate-900">See more</Link>
				</div>
				<div className="mt-6">
					<ProductList products={featuredProducts} />
				</div>
			</section>

			<section className="glass-card grid gap-6 rounded-[32px] p-8 lg:grid-cols-[1.2fr_0.8fr]">
				<div>
					<h2 className="text-2xl font-semibold">Stay in the loop</h2>
					<p className="mt-3 text-sm text-slate-600">
						Weekly drops, insider bundles, and curated seller previews.
					</p>
				</div>
				<div className="flex flex-col gap-3 sm:flex-row">
					<input
						className="w-full rounded-full border border-slate-200 px-4 py-3 text-sm"
						placeholder="Enter your email"
					/>
					<button className="rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white whitespace-nowrap">
						Subscribe
					</button>
				</div>
			</section>
		</div>
	);
};

export default Home;
