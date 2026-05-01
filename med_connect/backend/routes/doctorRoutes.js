const express = require("express");
const router = express.Router();

const {
  getDoctorDashboard,
  getDoctorProfile,
  updateDoctorProfile,
  changeDoctorPassword,
  getAllDoctors
} = require("../controllers/doctorcontroller");

router.get("/", getAllDoctors);
router.get("/dashboard/:userId", getDoctorDashboard);
router.get("/profile/:userId", getDoctorProfile);
router.put("/profile/:userId", updateDoctorProfile);
router.put("/change-password/:userId", changeDoctorPassword);

module.exports = router;