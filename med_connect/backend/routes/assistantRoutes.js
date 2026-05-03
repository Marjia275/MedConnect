const express = require("express");
const router  = express.Router();
const { getAssistantDashboard, getAssistantAppointments, updateAppointment } = require("../controllers/assistantController");
const { protect, requireRole } = require("../middleware/authMiddleware");

router.get("/dashboard/:userId",    protect, requireRole("assistant"), getAssistantDashboard);
router.get("/appointments/:userId", protect, requireRole("assistant"), getAssistantAppointments);
router.patch("/appointments/:id",   protect, requireRole("assistant"), updateAppointment);

module.exports = router;
