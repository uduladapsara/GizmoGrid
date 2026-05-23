const express = require("express");
const {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
	addReview,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const { requireRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, requireRoles("seller", "admin"), createProduct);
router.put("/:id", protect, requireRoles("seller", "admin"), updateProduct);
router.delete("/:id", protect, requireRoles("seller", "admin"), deleteProduct);
router.post("/:id/reviews", protect, requireRoles("user"), addReview);

module.exports = router;
