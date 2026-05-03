const express = require("express");
const router  = express.Router();
const {
  adminLogin, getAdminDashboard, getUsers, toggleUserStatus,
  getPendingDoctors, approveDoctor, getReports, createAssistant
} = require("../controllers/adminController");
const { protect, requireRole } = require("../middleware/authMiddleware");

router.post("/login",                adminLogin);
router.get("/dashboard",             protect, requireRole("admin"), getAdminDashboard);
router.get("/users",                 protect, requireRole("admin"), getUsers);
router.patch("/users/:id/status",    protect, requireRole("admin"), toggleUserStatus);
router.get("/doctors/pending",       protect, requireRole("admin"), getPendingDoctors);
router.patch("/doctors/:id/approve", protect, requireRole("admin"), approveDoctor);
router.get("/reports",               protect, requireRole("admin"), getReports);
router.post("/assistants",           protect, requireRole("admin"), createAssistant);

module.exports = router;
