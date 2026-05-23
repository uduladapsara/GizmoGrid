const Order = require("../models/Order");
const Cart = require("../models/Cart");
const { asyncHandler } = require("../utils/helpers");

const createOrder = asyncHandler(async (req, res) => {
	const { items, totalPrice, shippingAddress, paymentProvider } = req.body;

	let orderItems = items;
	if (!orderItems || orderItems.length === 0) {
		const cart = await Cart.findOne({ user: req.user._id });
		if (!cart || cart.items.length === 0) {
			res.status(400);
			throw new Error("Order items are required");
		}
		orderItems = cart.items.map((item) => ({
			product: item.product,
			quantity: item.quantity,
			unitPrice: item.unitPrice,
		}));
	}

	if (!totalPrice || totalPrice <= 0) {
		res.status(400);
		throw new Error("Total price is required");
	}

	const order = await Order.create({
		user: req.user._id,
		items: orderItems,
		totalPrice,
		shippingAddress,
		paymentProvider: paymentProvider || "",
	});

	// Clear cart after order
	await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });

	res.status(201).json(order);
});

const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
	res.json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		"items.product",
		"name price"
	);
	if (!order) {
		res.status(404);
		throw new Error("Order not found");
	}

	if (req.user.role !== "admin" && order.user.toString() !== req.user._id.toString()) {
		res.status(403);
		throw new Error("Access denied");
	}

	res.json(order);
});

const updateOrderStatus = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate("items.product", "seller");
	if (!order) {
		res.status(404);
		throw new Error("Order not found");
	}

	// Sellers can only update orders that contain their products
	if (req.user.role === "seller") {
		const hasSellerProduct = order.items.some(
			(item) =>
				item.product &&
				item.product.seller &&
				item.product.seller.toString() === req.user._id.toString()
		);
		if (!hasSellerProduct) {
			res.status(403);
			throw new Error("Access denied");
		}
	}

	const { deliveryStatus, paymentStatus } = req.body;
	if (deliveryStatus) order.deliveryStatus = deliveryStatus;
	if (paymentStatus) order.paymentStatus = paymentStatus;

	const updated = await order.save();
	res.json(updated);
});

module.exports = {
	createOrder,
	getMyOrders,
	getOrderById,
	updateOrderStatus,
};
