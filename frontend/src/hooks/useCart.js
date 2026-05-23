import { useEffect, useMemo, useState } from "react";

const storageKey = "gizmogird_cart";

const getStoredCart = () => {
	try {
		const raw = localStorage.getItem(storageKey);
		return raw ? JSON.parse(raw) : [];
	} catch (error) {
		return [];
	}
};

const useCart = () => {
	const [items, setItems] = useState(getStoredCart);

	useEffect(() => {
		localStorage.setItem(storageKey, JSON.stringify(items));
	}, [items]);

	const addItem = (product) => {
		setItems((prev) => {
			const existing = prev.find((item) => item.id === product.id);
			if (existing) {
				return prev.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			}
			return [...prev, { ...product, quantity: 1 }];
		});
	};

	const removeItem = (id) => {
		setItems((prev) => prev.filter((item) => item.id !== id));
	};

	const clearCart = () => setItems([]);

	const total = useMemo(
		() => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
		[items]
	);

	return { items, addItem, removeItem, clearCart, total };
};

export default useCart;
