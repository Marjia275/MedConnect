const User = require("../models/User");
const Appointment = require("../models/Appointment");

const getPatientDashboard = async (req, res) => {
  try {
    const { userId } = req.params;

    const patient = await User.findById(userId).select("-password");

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const appointments = await Appointment.find({ patient: userId }).sort({ createdAt: -1 });

    const totalAppointments = appointments.length;

    const upcomingAppointments = appointments.filter(
      (item) =>
        item.status === "pending" ||
        item.status === "accepted" ||
        item.status === "confirmed"
    ).length;

    const completedAppointments = appointments.filter(
      (item) => item.status === "completed"
    ).length;

    const fieldsToCheck = [
      patient.firstName,
      patient.lastName,
      patient.email,
      patient.phone,
      patient.gender,
      patient.dateOfBirth,
      patient.bloodGroup,
      patient.address,
      patient.city,
      patient.country
    ];

    const filledFields = fieldsToCheck.filter(
      (field) => field && String(field).trim() !== ""
    ).length;

    const profileCompletion = Math.round(
      (filledFields / fieldsToCheck.length) * 100
    );

    res.status(200).json({
      patient: {
        _id: patient._id,
        firstName: patient.firstName,
        lastName: patient.lastName,
        email: patient.email,
        phone: patient.phone,
        gender: patient.gender,
        dateOfBirth: patient.dateOfBirth,
        bloodGroup: patient.bloodGroup,
        address: patient.address,
        city: patient.city,
        country: patient.country
      },
      stats: {
        totalAppointments,
        upcomingAppointments,
        completedAppointments,
        profileCompletion
      },
      recentAppointments: appointments.slice(0, 5),
      appointments
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = { getPatientDashboard };