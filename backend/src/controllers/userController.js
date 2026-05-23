const User = require("../models/User");
const { asyncHandler } = require("../utils/helpers");

const getProfile = asyncHandler(async (req, res) => {
	res.json(req.user);
});

const updateProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (!user) {
		res.status(404);
		throw new Error("User not found");
	}

	const { name, address, phone, password } = req.body;
	if (name !== undefined) user.name = name;
	if (address !== undefined) user.address = address;
	if (phone !== undefined) user.phone = phone;
	if (password) user.password = password;

	const updated = await user.save();
	res.json({
		id: updated._id,
		name: updated.name,
		email: updated.email,
		role: updated.role,
		address: updated.address,
		phone: updated.phone,
	});
});

module.exports = {
	getProfile,
	updateProfile,
};
