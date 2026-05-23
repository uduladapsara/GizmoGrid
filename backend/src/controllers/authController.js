const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { asyncHandler } = require("../utils/helpers");

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, role } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Name, email, and password are required");
	}

	const existing = await User.findOne({ email });
	if (existing) {
		res.status(400);
		throw new Error("User already exists");
	}

	const safeRole = role === "seller" ? "seller" : "user";
	const user = await User.create({
		name,
		email,
		password,
		role: safeRole,
		sellerApproved: safeRole === "seller" ? false : true,
	});

	res.status(201).json({
		id: user._id,
		name: user.name,
		email: user.email,
		role: user.role,
		token: generateToken({ id: user._id }),
	});
});

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		res.status(401);
		throw new Error("Invalid credentials");
	}

	if (user.isBlocked) {
		res.status(403);
		throw new Error("User is blocked");
	}

	if (user.role === "seller" && !user.sellerApproved) {
		res.status(403);
		throw new Error("Seller approval pending");
	}

	const matches = await user.matchPassword(password);
	if (!matches) {
		res.status(401);
		throw new Error("Invalid credentials");
	}

	res.json({
		id: user._id,
		name: user.name,
		email: user.email,
		role: user.role,
		token: generateToken({ id: user._id }),
	});
});

module.exports = {
	registerUser,
	loginUser,
};
