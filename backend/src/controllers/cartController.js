const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { asyncHandler } = require("../utils/helpers");

const getCart = asyncHandler(async (req, res) => {
	const cart = await Cart.findOne({ user: req.user._id }).populate(
		"items.product",
		"name price"
	);
	res.json(cart || { user: req.user._id, items: [] });
});

const addToCart = asyncHandler(async (req, res) => {
	const { productId, quantity } = req.body;
	const product = await Product.findById(productId);
	if (!product) {
		res.status(404);
		throw new Error("Product not found");
	}

	const cart =
		(await Cart.findOne({ user: req.user._id })) ||
		(await Cart.create({ user: req.user._id, items: [] }));

	const existing = cart.items.find(
		(item) => item.product.toString() === productId
	);

	if (existing) {
		existing.quantity += quantity || 1;
	} else {
		cart.items.push({
			product: product._id,
			quantity: quantity || 1,
			unitPrice: product.price,
		});
	}

	const updated = await cart.save();
	res.status(201).json(updated);
});

const removeFromCart = asyncHandler(async (req, res) => {
	const { productId } = req.params;
	const cart = await Cart.findOne({ user: req.user._id });
	if (!cart) {
		res.status(404);
		throw new Error("Cart not found");
	}

	cart.items = cart.items.filter(
		(item) => item.product.toString() !== productId
	);
	const updated = await cart.save();
	res.json(updated);
});

const clearCart = asyncHandler(async (req, res) => {
	const cart = await Cart.findOne({ user: req.user._id });
	if (!cart) {
		res.status(404);
		throw new Error("Cart not found");
	}

	cart.items = [];
	await cart.save();
	res.json({ message: "Cart cleared" });
});

module.exports = {
	getCart,
	addToCart,
	removeFromCart,
	clearCart,
};
