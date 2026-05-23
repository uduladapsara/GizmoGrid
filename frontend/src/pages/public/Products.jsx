import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductList from "../../components/products/ProductList.jsx";
import Loader from "../../components/common/Loader.jsx";
import { fetchProducts } from "../../services/productService.js";

const Products = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [filters, setFilters] = useState({
		keyword: searchParams.get("keyword") || "",
		category: "All",
		sort: "newest",
		minPrice: "",
		maxPrice: "",
		rating: "All",
	});

	useEffect(() => {
		const loadProducts = async () => {
			setLoading(true);
			try {
				const response = await fetchProducts();
				setItems(response.data || []);
			} catch (err) {
				setError(err?.response?.data?.message || "Failed to load products.");
			} finally {
				setLoading(false);
			}
		};
		loadProducts();
	}, []);

	// Sync URL keyword param to filter
	useEffect(() => {
		const kw = searchParams.get("keyword") || "";
		setFilters((prev) => ({ ...prev, keyword: kw }));
	}, [searchParams]);

	const categories = useMemo(() => {
		const set = new Set(items.map((item) => item.category).filter(Boolean));
		return ["All", ...Array.from(set)];
	}, [items]);

	const filtered = useMemo(() => {
		let data = [...items];
		if (filters.keyword) {
			const key = filters.keyword.toLowerCase();
			data = data.filter(
				(item) =>
					item.name?.toLowerCase().includes(key) ||
					item.category?.toLowerCase().includes(key)
			);
		}
		if (filters.category !== "All") {
			data = data.filter((item) => item.category === filters.category);
		}
		if (filters.minPrice) {
			data = data.filter((item) => item.price >= Number(filters.minPrice));
		}
		if (filters.maxPrice) {
			data = data.filter((item) => item.price <= Number(filters.maxPrice));
		}
		if (filters.rating !== "All") {
			data = data.filter(
				(item) => (item.ratingsAverage || 0) >= Number(filters.rating)
			);
		}
		if (filters.sort === "low") data.sort((a, b) => a.price - b.price);
		if (filters.sort === "high") data.sort((a, b) => b.price - a.price);
		if (filters.sort === "rating")
			data.sort((a, b) => (b.ratingsAverage || 0) - (a.ratingsAverage || 0));
		return data;
	}, [items, filters]);

	const handleFilterChange = (e) => {
		const { name, value } = e.target;
		setFilters((prev) => ({ ...prev, [name]: value }));
		if (name === "keyword") {
			if (value) setSearchParams({ keyword: value });
			else setSearchParams({});
		}
	};

	return (
		<div className="space-y-8">
			<div className="glass-card rounded-[28px] p-6">
				<h1 className="text-2xl font-semibold">Products</h1>
				<p className="mt-2 text-sm text-slate-600">
					Browse our curated marketplace and filter what matters to you.
				</p>
				{error && (
					<p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs text-rose-600">
						{error}
					</p>
				)}
				<div className="mt-6 grid gap-4 lg:grid-cols-[2fr_1fr]">
					<input
						className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
						placeholder="Search by product or brand"
						name="keyword"
						value={filters.keyword}
						onChange={handleFilterChange}
					/>
					<select
						className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
						name="sort"
						value={filters.sort}
						onChange={handleFilterChange}
					>
						<option value="newest">Sort by newest</option>
						<option value="rating">Top rated</option>
						<option value="low">Price: low to high</option>
						<option value="high">Price: high to low</option>
					</select>
				</div>
			</div>

			<div className="grid gap-6 lg:grid-cols-[280px_1fr]">
				<aside className="glass-card h-fit rounded-[24px] p-6">
					<h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
						Filters
					</h2>
					<div className="mt-4 space-y-4 text-sm">
						<div>
							<label className="text-xs uppercase text-slate-400">Category</label>
							<select
								className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2"
								name="category"
								value={filters.category}
								onChange={handleFilterChange}
							>
								{categories.map((category) => (
									<option key={category} value={category}>
										{category}
									</option>
								))}
							</select>
						</div>
						<div>
							<label className="text-xs uppercase text-slate-400">Price range</label>
							<div className="mt-2 grid grid-cols-2 gap-2">
								<input
									className="rounded-xl border border-slate-200 px-3 py-2"
									placeholder="Min"
									name="minPrice"
									value={filters.minPrice}
									onChange={handleFilterChange}
								/>
								<input
									className="rounded-xl border border-slate-200 px-3 py-2"
									placeholder="Max"
									name="maxPrice"
									value={filters.maxPrice}
									onChange={handleFilterChange}
								/>
							</div>
						</div>
						<div>
							<label className="text-xs uppercase text-slate-400">Rating</label>
							<select
								className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2"
								name="rating"
								value={filters.rating}
								onChange={handleFilterChange}
							>
								<option value="All">All</option>
								<option value="4">4 stars & up</option>
								<option value="3">3 stars & up</option>
								<option value="2">2 stars & up</option>
							</select>
						</div>
					</div>
				</aside>
				<div>
					{loading ? (
						<Loader />
					) : filtered.length === 0 ? (
						<div className="glass-card rounded-2xl p-8 text-center">
							<p className="text-slate-500">No products found.</p>
						</div>
					) : (
						<ProductList products={filtered} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Products;
