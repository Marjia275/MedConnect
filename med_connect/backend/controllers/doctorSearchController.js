const User        = require("../models/User");
const Appointment = require("../models/Appointment");

const getDoctors = async (req, res) => {
  try {
    const { name, specialty, location, maxFee } = req.query;
    const filter = { role: "doctor", isActive: true, isApproved: true };

    if (specialty) filter["doctorInfo.specialty"] = specialty;
    if (location)  filter.city = location;
    if (maxFee)    filter["doctorInfo.consultationFee"] = { $lte: Number(maxFee) };

    let doctors = await User.find(filter).select("-password");
    if (name) {
      const q = name.toLowerCase();
      doctors = doctors.filter(d => d.fullName.toLowerCase().includes(q));
    }

    const result = doctors.map(d => ({
      id: d._id, fullName: d.fullName, email: d.email,
      phone: d.phone, city: d.city, doctorInfo: d.doctorInfo, createdAt: d.createdAt
    }));

    res.status(200).json({ doctors: result, total: result.length });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await User.findById(req.params.id).select("-password");
    if (!doctor || doctor.role !== "doctor")
      return res.status(404).json({ message: "Doctor not found" });

    const totalAppointments = await Appointment.countDocuments({
      doctor: doctor._id, status: "completed"
    });
    res.status(200).json({ doctor, totalAppointments });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getDoctors, getDoctorById };
