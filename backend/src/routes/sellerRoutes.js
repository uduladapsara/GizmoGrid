const express = require("express");
const {
	getMyProducts,
	getMyOrders,
	getSalesReport,
} = require("../controllers/sellerController");
const { protect } = require("../middleware/authMiddleware");
const { requireRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/products", protect, requireRoles("seller"), getMyProducts);
router.get("/orders", protect, requireRoles("seller"), getMyOrders);
router.get("/reports", protect, requireRoles("seller"), getSalesReport);

module.exports = router;
