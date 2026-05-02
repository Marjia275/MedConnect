const express = require("express");
const router = express.Router();

const {
  getDoctorDashboard,
  getDoctorProfile,
  updateDoctorProfile,
  changeDoctorPassword,
  getAllDoctors,
  getDoctorById
} = require("../controllers/doctorcontroller");

router.get("/", getAllDoctors);

// FIX: /dashboard/:userId and /profile/:userId MUST come before /:id
// Otherwise Express matches "dashboard" as the :id param and returns "Doctor not found"
router.get("/dashboard/:userId", getDoctorDashboard);
router.get("/profile/:userId", getDoctorProfile);
router.put("/profile/:userId", updateDoctorProfile);
router.put("/change-password/:userId", changeDoctorPassword);

// Generic /:id route goes LAST
router.get("/:id", getDoctorById);

module.exports = router;