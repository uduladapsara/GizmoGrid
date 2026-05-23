import { Link } from "react-router-dom";
import formatCurrency from "../../utils/formatCurrency.js";

const SHIPPING = 12;

const CartSummary = ({ total }) => (
	<div className="glass-card rounded-2xl p-6 shadow-soft">
		<h3 className="text-sm font-semibold text-slate-600">Order summary</h3>
		<div className="mt-4 flex items-center justify-between text-sm">
			<span className="text-slate-500">Subtotal</span>
			<span className="font-semibold">{formatCurrency(total)}</span>
		</div>
		<div className="mt-2 flex items-center justify-between text-sm">
			<span className="text-slate-500">Shipping</span>
			<span className="font-semibold">{total > 0 ? formatCurrency(SHIPPING) : formatCurrency(0)}</span>
		</div>
		<div className="mt-4 flex items-center justify-between text-base font-semibold">
			<span>Total</span>
			<span>{formatCurrency(total > 0 ? total + SHIPPING : 0)}</span>
		</div>
		{total > 0 ? (
			<Link
				to="/user/checkout"
				className="mt-6 block w-full rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white"
			>
				Proceed to checkout
			</Link>
		) : (
			<button
				disabled
				className="mt-6 w-full rounded-xl bg-slate-300 px-4 py-3 text-sm font-semibold text-white cursor-not-allowed"
			>
				Proceed to checkout
			</button>
		)}
	</div>
);

export default CartSummary;
