const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		price: { type: Number, required: true, min: 0 },
		description: { type: String, default: "" },
		images: [{ type: String }],
		category: { type: String, default: "" },
		stock: { type: Number, default: 0 },
		seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		isActive: { type: Boolean, default: true },
		ratingsAverage: { type: Number, default: 0 },
		ratingsCount: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
