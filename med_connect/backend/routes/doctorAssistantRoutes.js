const express = require("express");
const router  = express.Router();
const { sendAssistantInvite, getMyAssistant, removeAssistant } = require("../controllers/doctorAssistantController");
const { protect, requireRole } = require("../middleware/authMiddleware");

router.post("/invite",                    protect, requireRole("doctor"), sendAssistantInvite);
router.get("/my-assistant/:doctorId",     protect, requireRole("doctor"), getMyAssistant);
router.delete("/remove/:assistantId",     protect, requireRole("doctor"), removeAssistant);

module.exports = router;