const express = require("express");
const router  = express.Router();
const {
  createAppointment, getAppointment, updateStatus,
  confirmPayment, listAppointments
} = require("../controllers/appointmentController");
const { protect } = require("../middleware/authMiddleware");

router.get("/",           protect, listAppointments);
router.post("/",          protect, createAppointment);
router.get("/:id",        protect, getAppointment);
router.patch("/:id/status",          protect, updateStatus);
router.patch("/:id/confirm-payment", protect, confirmPayment);

module.exports = router;