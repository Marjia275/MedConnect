const express = require("express");
const router = express.Router();
const {   getPatientDashboard,
  getPatientProfile,
  updatePatientProfile } = require("../controllers/patientController");

router.get("/dashboard/:userId", getPatientDashboard);
router.get("/profile/:userId", getPatientProfile);
router.put("/profile/:userId", updatePatientProfile);
module.exports = router;