const express = require("express");
const {
	getUsers,
	getSellers,
	approveSeller,
	approveUser,
	blockUser,
	getAllProducts,
	getAllOrders,
	getReports,
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { requireRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/users", protect, requireRoles("admin"), getUsers);
router.get("/sellers", protect, requireRoles("admin"), getSellers);
router.put("/approve-seller/:id", protect, requireRoles("admin"), approveSeller);
router.put("/approve-user/:id", protect, requireRoles("admin"), approveUser);
router.put("/block-user/:id", protect, requireRoles("admin"), blockUser);
router.get("/products", protect, requireRoles("admin"), getAllProducts);
router.get("/orders", protect, requireRoles("admin"), getAllOrders);
router.get("/reports", protect, requireRoles("admin"), getReports);

module.exports = router;
