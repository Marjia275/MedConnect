const Appointment = require("../models/Appointment");
//const Payment     = require("../models/Payment");
const User        = require("../models/User");


async function generateSerial(doctorId, date) {
  const count = await Appointment.countDocuments({
    doctor: doctorId,
    appointmentDate: date,
    status: { $in: ["accepted", "confirmed", "completed"] }
  });
  return String(count + 1).padStart(2, "0");
}

const createAppointment = async (req, res) => {
  try {
    const {
      doctorId, patientName, patientPhone,
      appointmentDate, appointmentTime, notes
    } = req.body;

    if (!doctorId || !patientName || !appointmentDate || !appointmentTime) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }
    if (!doctor.isApproved) {
      return res.status(400).json({ message: "This doctor is not yet approved" });
    }

    const patientId = req.user._id;

    const appt = await Appointment.create({
      patient: patientId,
      doctor:  doctorId,
      patientName,
      patientPhone: patientPhone || "",
      doctorName:   doctor.fullName,
      specialty:    doctor.doctorInfo?.specialty || "",
      appointmentDate,
      appointmentTime,
      consultationFee: doctor.doctorInfo?.consultationFee || 0,
      notes: notes || "",
      status: "pending",
      paymentStatus: "unpaid"
    });

    res.status(201).json({ message: "Appointment requested", appointment: appt });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const getAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id)
      .populate("patient", "firstName lastName fullName email phone bloodGroup")
      .populate("doctor",  "firstName lastName fullName email phone doctorInfo");
    if (!appt) return res.status(404).json({ message: "Appointment not found" });
    res.status(200).json({ appointment: appt });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const valid = ["pending","accepted","confirmed","completed","cancelled","no-show"];
    if (!valid.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ message: "Appointment not found" });

  
    if (status === "accepted" && appt.status === "pending") {
      const serial = await generateSerial(appt.doctor, appt.appointmentDate);
      appt.serialNumber = serial;
    }

    appt.status = status;
    await appt.save();

    res.status(200).json({ message: "Status updated", appointment: appt });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const confirmPayment = async (req, res) => {
  try {
    const { transactionId, bkashNumber, amount } = req.body;

    const appt = await Appointment.findById(req.params.id)
      .populate("doctor", "fullName doctorInfo");
    if (!appt) return res.status(404).json({ message: "Appointment not found" });


    if (!["accepted", "pending"].includes(appt.status)) {
      return res.status(400).json({ message: "Appointment is not in a payable state" });
    }


    const payment = await Payment.create({
      appointment: appt._id,
      patient:     appt.patient,
      doctor:      appt.doctor,
      amount:      amount || appt.consultationFee + 30,
      method:      "bkash",
      transactionId: transactionId || `SIM-${Date.now()}`,
      bkashNumber:   bkashNumber || "",
      status:        "completed",
      paidAt:        new Date()
    });


    if (!appt.serialNumber) {
      const serial = await generateSerial(appt.doctor._id || appt.doctor, appt.appointmentDate);
      appt.serialNumber = serial;
    }

    appt.paymentStatus = "paid";
    appt.status = "confirmed";
    await appt.save();

    res.status(200).json({
      message: "Payment confirmed",
      serialNumber: appt.serialNumber,
      appointment: appt,
      payment
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const listAppointments = async (req, res) => {
  try {
    const { doctor, patient, date, status } = req.query;
    const filter = {};
    if (doctor)  filter.doctor  = doctor;
    if (patient) filter.patient = patient;
    if (date)    filter.appointmentDate = date;
    if (status)  filter.status  = status;

    const appts = await Appointment.find(filter)
      .sort({ createdAt: -1 })
      .populate("patient", "firstName lastName fullName phone bloodGroup")
      .populate("doctor",  "firstName lastName fullName doctorInfo");

    res.status(200).json({ appointments: appts });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createAppointment,
  getAppointment,
  updateStatus,
  confirmPayment,
  listAppointments
};