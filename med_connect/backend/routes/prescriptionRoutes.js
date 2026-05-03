const express = require("express");
const router  = express.Router();
const { createPrescription, updatePrescription, getPatientPrescriptions, getDoctorPrescriptions } = require("../controllers/prescriptionController");
const { protect, requireRole } = require("../middleware/authMiddleware");

router.post("/",                  protect, requireRole("doctor"), createPrescription);
router.put("/:id",                protect, requireRole("doctor"), updatePrescription);
router.get("/patient/:patientId", protect, getPatientPrescriptions);
router.get("/doctor/:doctorId",   protect, getDoctorPrescriptions);

module.exports = router;
