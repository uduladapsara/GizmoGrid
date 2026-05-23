const express = require("express");
const {
	getCart,
	addToCart,
	removeFromCart,
	clearCart,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");
const { requireRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", protect, requireRoles("user"), getCart);
router.post("/", protect, requireRoles("user"), addToCart);
router.delete("/clear", protect, requireRoles("user"), clearCart);
router.delete("/:productId", protect, requireRoles("user"), removeFromCart);

module.exports = router;
