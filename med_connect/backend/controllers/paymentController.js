const Payment     = require("../models/Payment");
const Appointment = require("../models/Appointment");

const createPayment = async (req, res) => {
  try {
    const { appointmentId, transactionId, bkashNumber, amount } = req.body;
    if (!appointmentId)
      return res.status(400).json({ message: "Appointment ID required" });

    const appt = await Appointment.findById(appointmentId);
    if (!appt) return res.status(404).json({ message: "Appointment not found" });

    if (appt.status !== "accepted")
      return res.status(400).json({
        message: `Cannot pay for an appointment with status '${appt.status}'. It must be accepted first.`
      });

    if (appt.paymentStatus === "paid")
      return res.status(400).json({ message: "This appointment has already been paid" });

    const payment = await Payment.create({
      appointment:   appt._id,
      patient:       appt.patient,
      doctor:        appt.doctor,
      amount:        amount || appt.consultationFee + 30,
      method:        "bkash",
      transactionId: transactionId || `SIM-${Date.now()}`,
      bkashNumber:   bkashNumber || "",
      status:        "completed",
      paidAt:        new Date()
    });

    if (!appt.serialNumber) {
      const count = await Appointment.countDocuments({
        doctor: appt.doctor, appointmentDate: appt.appointmentDate,
        status: { $in: ["accepted","confirmed","completed"] }
      });
      appt.serialNumber = String(count + 1).padStart(2, "0");
    }
    appt.paymentStatus = "paid";
    appt.status = "confirmed";
    await appt.save();

    res.status(201).json({ message: "Payment recorded", serialNumber: appt.serialNumber, payment, appointment: appt });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getPayment = async (req, res) => {
  try {
    const payment = await Payment.findOne({ appointment: req.params.appointmentId });
    if (!payment) return res.status(404).json({ message: "No payment found" });
    res.status(200).json({ payment });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { createPayment, getPayment };
