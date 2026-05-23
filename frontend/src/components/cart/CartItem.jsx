import formatCurrency from "../../utils/formatCurrency.js";

const CartItem = ({ item, onRemove }) => {
	const price = item.unitPrice ?? item.price ?? 0;
	const name = item.name ?? item.product?.name ?? "Product";

	return (
		<div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
			<div>
				<h4 className="text-sm font-semibold text-slate-900">{name}</h4>
				<p className="text-xs text-slate-500">Qty: {item.quantity}</p>
			</div>
			<div className="flex items-center gap-3">
				<span className="text-sm font-semibold">
					{formatCurrency(price * item.quantity)}
				</span>
				{onRemove && (
					<button
						onClick={() => onRemove(item.product?._id || item.id)}
						className="rounded-full border border-rose-200 px-2 py-1 text-xs text-rose-500 hover:bg-rose-50"
					>
						Remove
					</button>
				)}
			</div>
		</div>
	);
};

export default CartItem;
