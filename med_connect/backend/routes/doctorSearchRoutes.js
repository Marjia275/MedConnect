const express = require("express");
const router  = express.Router();
const { getDoctors, getDoctorById } = require("../controllers/doctorSearchController");

router.get("/",    getDoctors);
router.get("/:id", getDoctorById);

module.exports = router;
