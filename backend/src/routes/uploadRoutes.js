const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { requireRoles } = require("../middleware/roleMiddleware");
const { upload } = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post(
	"/products",
	protect,
	requireRoles("seller", "admin"),
	upload.array("images", 5),
	(req, res) => {
		if (!req.files || !req.files.length) {
			return res.status(400).json({ message: "No images uploaded" });
		}

		const images = req.files.map(
			(file) => `/uploads/products/${file.filename}`
		);
		return res.status(201).json({ images });
	}
);

module.exports = router;
