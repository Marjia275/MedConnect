const express = require("express");
const router = express.Router();
const { getDoctorDashboard } = require("../controllers/doctorcontroller");

router.get("/dashboard/:userId", getDoctorDashboard);

module.exports = router;