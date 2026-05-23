const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { asyncHandler } = require("../utils/helpers");

const protect = asyncHandler(async (req, res, next) => {
	const authHeader = req.headers.authorization || "";
	const token = authHeader.startsWith("Bearer ")
		? authHeader.split(" ")[1]
		: null;

	if (!token) {
		res.status(401);
		throw new Error("Not authorized, token missing");
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.id).select("-password");

		if (!user) {
			res.status(401);
			throw new Error("Not authorized, user not found");
		}

		if (user.isBlocked) {
			res.status(403);
			throw new Error("User is blocked");
		}

		req.user = user;
		next();
	} catch (error) {
		res.status(401);
		throw new Error("Not authorized, token invalid");
	}
});

module.exports = {
	protect,
};
