import { useState } from "react";
import { Link } from "react-router-dom";
import {
	FiHeart,
	FiShoppingCart,
	FiEye,
	FiStar,
	FiCheck,
} from "react-icons/fi";

import formatCurrency from "../../utils/formatCurrency.js";
import { addCartItem } from "../../services/cartService.js";
import useAuth from "../../hooks/useAuth.js";

const ProductCard = ({ product }) => {
	const { user } = useAuth();

	const [adding, setAdding] = useState(false);
	const [added, setAdded] = useState(false);
	const [err, setErr] = useState("");

	const handleAddToCart = async (e) => {
		e.preventDefault();

		if (!user || user.role !== "user") return;

		setAdding(true);
		setErr("");

		try {
			await addCartItem({
				productId: product._id || product.id,
				quantity: 1,
			});

			setAdded(true);

			setTimeout(() => {
				setAdded(false);
			}, 2000);
		} catch (error) {
			setErr("Failed to add product");
		} finally {
			setAdding(false);
		}
	};

	return (
		<Link
			to={`/products/${product._id || product.id}`}
			className="
				group
				relative
				flex
				h-full
				flex-col
				overflow-hidden
				rounded-3xl
				border
				border-slate-200/60
				bg-white
				dark:border-slate-700
				dark:bg-slate-900
				shadow-sm
				transition-all
				duration-300
				hover:-translate-y-2
				hover:shadow-2xl
			"
		>
			{/* PRODUCT IMAGE */}
			<div className="relative overflow-hidden bg-slate-100 dark:bg-slate-800">
				{product.images?.length ? (
					<img
						src={product.images[0]}
						alt={product.name}
						className="
							h-72
							w-full
							object-cover
							transition-transform
							duration-500
							group-hover:scale-110
						"
					/>
				) : (
					<div className="flex h-72 items-center justify-center text-slate-400">
						Product Image
					</div>
				)}

				{/* DISCOUNT BADGE */}
				<div className="absolute left-4 top-4 rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
					20% OFF
				</div>

				{/* QUICK ACTIONS */}
				<div
					className="
						absolute
						right-4
						top-4
						flex
						flex-col
						gap-2
						opacity-0
						transition-all
						duration-300
						group-hover:opacity-100
					"
				>
					<button
						onClick={(e) => e.preventDefault()}
						className="
							rounded-full
							bg-white
							p-3
							text-slate-700
							shadow-lg
							transition
							hover:bg-rose-500
							hover:text-white
						"
					>
						<FiHeart size={18} />
					</button>

					<button
						onClick={(e) => e.preventDefault()}
						className="
							rounded-full
							bg-white
							p-3
							text-slate-700
							shadow-lg
							transition
							hover:bg-blue-600
							hover:text-white
						"
					>
						<FiEye size={18} />
					</button>
				</div>
			</div>

			{/* CONTENT */}
			<div className="flex flex-1 flex-col p-5">
				{/* CATEGORY + RATING */}
				<div className="flex items-center justify-between">
					<span
						className="
							rounded-full
							bg-blue-100
							px-3
							py-1
							text-xs
							font-medium
							text-blue-700
							dark:bg-blue-900/40
							dark:text-blue-300
						"
					>
						{product.category || "New Arrival"}
					</span>

					<div className="flex items-center gap-1 text-amber-500">
						<FiStar className="fill-amber-400" />
						<span className="text-sm font-medium">
							{product.ratingsAverage
								? product.ratingsAverage.toFixed(1)
								: "4.8"}
						</span>
					</div>
				</div>

				{/* PRODUCT NAME */}
				<h3
					className="
						mt-4
						line-clamp-1
						text-lg
						font-bold
						text-slate-900
						dark:text-white
					"
				>
					{product.name}
				</h3>

				{/* DESCRIPTION */}
				<p
					className="
						mt-2
						line-clamp-2
						text-sm
						text-slate-500
						dark:text-slate-400
					"
				>
					{product.description ||
						"Premium quality product with modern design and high performance."}
				</p>

				{/* PRICE */}
				<div className="mt-5 flex items-center gap-3">
					<span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
						{formatCurrency(product.price)}
					</span>

					<span className="text-sm text-slate-400 line-through">
						{formatCurrency(product.price + 40)}
					</span>
				</div>

				{/* BUTTONS */}
				<div className="mt-6 flex items-center justify-between gap-3">
					{user?.role === "user" ? (
						<button
							onClick={handleAddToCart}
							disabled={adding}
							className={`
								flex
								flex-1
								items-center
								justify-center
								gap-2
								rounded-2xl
								px-5
								py-3
								text-sm
								font-semibold
								transition-all
								duration-300
								${
									added
										? "bg-emerald-500 text-white"
										: "bg-blue-600 text-white hover:bg-blue-700"
								}
							`}
						>
							{added ? (
								<>
									<FiCheck />
									Added
								</>
							) : adding ? (
								"Adding..."
							) : (
								<>
									<FiShoppingCart />
									Add To Cart
								</>
							)}
						</button>
					) : (
						<div className="flex-1 rounded-2xl bg-slate-100 py-3 text-center text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-400">
							Login as User
						</div>
					)}

					<button
						onClick={(e) => e.preventDefault()}
						className="
							rounded-2xl
							border
							border-slate-200
							bg-white
							p-3
							text-slate-700
							transition
							hover:border-rose-500
							hover:bg-rose-500
							hover:text-white
							dark:border-slate-700
							dark:bg-slate-800
							dark:text-slate-300
						"
					>
						<FiHeart size={20} />
					</button>
				</div>

				{/* ERROR */}
				{err && (
					<p className="mt-3 text-sm font-medium text-rose-500">
						{err}
					</p>
				)}
			</div>
		</Link>
	);
};

export default ProductCard;