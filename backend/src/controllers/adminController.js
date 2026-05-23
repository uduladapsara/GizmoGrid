const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { asyncHandler } = require("../utils/helpers");

const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({ role: "user" }).select("-password");
	res.json(users);
});

const getSellers = asyncHandler(async (req, res) => {
	const sellers = await User.find({ role: "seller" }).select("-password");
	res.json(sellers);
});

const approveSeller = asyncHandler(async (req, res) => {
	const seller = await User.findById(req.params.id);
	if (!seller || seller.role !== "seller") {
		res.status(404);
		throw new Error("Seller not found");
	}

	seller.sellerApproved = true;
	await seller.save();
	res.json({ message: "Seller approved" });
});

const blockUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		res.status(404);
		throw new Error("User not found");
	}

	user.isBlocked = !user.isBlocked;
	await user.save();
	res.json({ message: `User ${user.isBlocked ? "blocked" : "unblocked"}` });
});

const getAllProducts = asyncHandler(async (req, res) => {
	const products = await Product.find().populate("seller", "name email");
	res.json(products);
});

const getAllOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find()
		.populate("user", "name email")
		.sort({ createdAt: -1 });
	res.json(orders);
});

const getReports = asyncHandler(async (req, res) => {
	const totalUsers = await User.countDocuments();
	const totalOrders = await Order.countDocuments();
	const totalProducts = await Product.countDocuments();

	res.json({ totalUsers, totalOrders, totalProducts });
});

module.exports = {
	getUsers,
	getSellers,
	approveSeller,
	blockUser,
	getAllProducts,
	getAllOrders,
	getReports,
};
