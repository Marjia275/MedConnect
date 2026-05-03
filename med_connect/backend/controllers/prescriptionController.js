const Prescription = require("../models/Prescription");
const User         = require("../models/User");

const createPrescription = async (req, res) => {
  try {
    const { patientId, appointmentId, complaint, diagnosis, medicines, tests, followUp, notes } = req.body;
    if (!patientId || !diagnosis)
      return res.status(400).json({ message: "Patient and diagnosis are required" });

    const patient = await User.findById(patientId).select("fullName");
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    const rx = await Prescription.create({
      appointment: appointmentId || null,
      patient: patientId, doctor: req.user._id,
      patientName: patient.fullName, doctorName: req.user.fullName,
      complaint: complaint || "", diagnosis,
      medicines: medicines || [], tests: tests || "",
      followUp: followUp || "", notes: notes || ""
    });
    res.status(201).json({ message: "Prescription saved", prescription: rx });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updatePrescription = async (req, res) => {
  try {
    const rx = await Prescription.findById(req.params.id);
    if (!rx) return res.status(404).json({ message: "Prescription not found" });
    if (String(rx.doctor) !== String(req.user._id))
      return res.status(403).json({ message: "Not authorised to edit this prescription" });

    const { complaint, diagnosis, medicines, tests, followUp, notes } = req.body;
    if (complaint  !== undefined) rx.complaint  = complaint;
    if (diagnosis  !== undefined) rx.diagnosis  = diagnosis;
    if (medicines  !== undefined) rx.medicines  = medicines;
    if (tests      !== undefined) rx.tests      = tests;
    if (followUp   !== undefined) rx.followUp   = followUp;
    if (notes      !== undefined) rx.notes      = notes;

    await rx.save();
    res.status(200).json({ message: "Prescription updated", prescription: rx });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getPatientPrescriptions = async (req, res) => {
  try {
    const rxList = await Prescription.find({ patient: req.params.patientId })
      .sort({ createdAt: -1 }).populate("doctor", "fullName doctorInfo");
    res.status(200).json({ prescriptions: rxList });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getDoctorPrescriptions = async (req, res) => {
  try {
    const rxList = await Prescription.find({ doctor: req.params.doctorId })
      .sort({ createdAt: -1 }).populate("patient", "fullName phone bloodGroup");
    res.status(200).json({ prescriptions: rxList });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { createPrescription, updatePrescription, getPatientPrescriptions, getDoctorPrescriptions };
