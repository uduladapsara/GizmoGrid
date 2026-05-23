const express = require("express");
const {
	createPayment,
	confirmPayment,
} = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", protect, createPayment);
router.post("/confirm", protect, confirmPayment);

module.exports = router;
