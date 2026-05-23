const Product = require("../models/Product");
const Review = require("../models/Review");
const { asyncHandler } = require("../utils/helpers");

const getProducts = asyncHandler(async (req, res) => {
	const keyword = req.query.keyword
		? { name: { $regex: req.query.keyword, $options: "i" } }
		: {};

	const products = await Product.find({ isActive: true, ...keyword }).populate(
		"seller",
		"name"
	);
	res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id).populate(
		"seller",
		"name"
	);
	if (!product) {
		res.status(404);
		throw new Error("Product not found");
	}
	res.json(product);
});

const createProduct = asyncHandler(async (req, res) => {
	const { name, price, description, images, category, stock } = req.body;

	const product = await Product.create({
		name,
		price,
		description,
		images: images || [],
		category,
		stock,
		seller: req.user._id,
	});

	res.status(201).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		res.status(404);
		throw new Error("Product not found");
	}

	const isSellerOwner =
		req.user.role === "seller" &&
		product.seller &&
		product.seller.toString() === req.user._id.toString();

	if (req.user.role !== "admin" && !isSellerOwner) {
		res.status(403);
		throw new Error("Access denied");
	}

	const { name, price, description, images, category, stock, isActive } =
		req.body;

	if (name !== undefined) product.name = name;
	if (price !== undefined) product.price = price;
	if (description !== undefined) product.description = description;
	if (images !== undefined) product.images = images;
	if (category !== undefined) product.category = category;
	if (stock !== undefined) product.stock = stock;
	if (isActive !== undefined) product.isActive = isActive;

	const updated = await product.save();
	res.json(updated);
});

const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		res.status(404);
		throw new Error("Product not found");
	}

	const isSellerOwner =
		req.user.role === "seller" &&
		product.seller &&
		product.seller.toString() === req.user._id.toString();

	if (req.user.role !== "admin" && !isSellerOwner) {
		res.status(403);
		throw new Error("Access denied");
	}

	await product.deleteOne();
	res.json({ message: "Product removed" });
});

const addReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;
	const product = await Product.findById(req.params.id);
	if (!product) {
		res.status(404);
		throw new Error("Product not found");
	}

	const review = await Review.create({
		product: product._id,
		user: req.user._id,
		rating,
		comment,
	});

	const reviews = await Review.find({ product: product._id });
	product.ratingsCount = reviews.length;
	product.ratingsAverage =
		reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
	await product.save();

	res.status(201).json(review);
});

module.exports = {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
	addReview,
};
