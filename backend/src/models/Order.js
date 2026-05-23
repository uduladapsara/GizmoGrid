const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
	{
		product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
		quantity: { type: Number, default: 1 },
		unitPrice: { type: Number, default: 0 },
	},
	{ _id: false }
);

const orderSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		items: [orderItemSchema],
		totalPrice: { type: Number, required: true },
		paymentStatus: {
			type: String,
			enum: ["pending", "paid", "failed", "refunded"],
			default: "pending",
		},
		deliveryStatus: {
			type: String,
			enum: ["pending", "shipped", "delivered", "cancelled"],
			default: "pending",
		},
		paymentProvider: { type: String, default: "" },
		paymentId: { type: String, default: "" },
		shippingAddress: { type: String, default: "" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
