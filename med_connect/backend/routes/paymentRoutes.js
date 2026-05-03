const express = require("express");
const router  = express.Router();
const { createPayment, getPayment } = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");

router.post("/",               protect, createPayment);
router.get("/:appointmentId",  protect, getPayment);

module.exports = router;
