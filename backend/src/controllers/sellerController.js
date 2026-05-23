const Product = require("../models/Product");
const Order = require("../models/Order");
const { asyncHandler } = require("../utils/helpers");

const getMyProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({ seller: req.user._id });
	res.json(products);
});

const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ "items.product": { $exists: true } })
		.populate("items.product", "seller name price")
		.sort({ createdAt: -1 });

	const sellerOrders = orders.filter((order) =>
		order.items.some(
			(item) =>
				item.product && item.product.seller.toString() === req.user._id.toString()
		)
	);

	res.json(sellerOrders);
});

const getSalesReport = asyncHandler(async (req, res) => {
	const orders = await Order.find({ paymentStatus: "paid" }).populate(
		"items.product",
		"seller"
	);

	let totalSales = 0;
	let totalOrders = 0;

	orders.forEach((order) => {
		order.items.forEach((item) => {
			if (item.product && item.product.seller.toString() === req.user._id.toString()) {
				totalSales += item.unitPrice * item.quantity;
				totalOrders += 1;
			}
		});
	});

	res.json({ totalSales, totalOrders });
});

module.exports = {
	getMyProducts,
	getMyOrders,
	getSalesReport,
};
