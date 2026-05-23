const { asyncHandler } = require("../utils/helpers");

const createPayment = asyncHandler(async (req, res) => {
	const { amount, provider } = req.body;
	if (!amount) {
		res.status(400);
		throw new Error("Payment amount is required");
	}

	res.json({
		message: "Payment initiation placeholder",
		provider: provider || "paypal",
		amount,
	});
});

const confirmPayment = asyncHandler(async (req, res) => {
	const { paymentId, status } = req.body;
	if (!paymentId) {
		res.status(400);
		throw new Error("Payment id is required");
	}

	res.json({ message: "Payment confirmation placeholder", paymentId, status });
});

module.exports = {
	createPayment,
	confirmPayment,
};
