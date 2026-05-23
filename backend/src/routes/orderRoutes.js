const express = require("express");
const {
	createOrder,
	getMyOrders,
	getOrderById,
	updateOrderStatus,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");
const { requireRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id", protect, requireRoles("seller", "admin"), updateOrderStatus);

module.exports = router;
