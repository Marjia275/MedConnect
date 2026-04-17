const User = require("../models/User");
const Appointment = require("../models/Appointment");

const getDoctorDashboard = async (req, res) => {
  try {
    const { userId } = req.params;

    const doctor = await User.findById(userId).select("-password");

    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const appointments = await Appointment.find({ doctor: userId })
      .sort({ createdAt: -1 })
      .populate("patient", "firstName lastName fullName email phone");

    const today = new Date().toISOString().split("T")[0];

    const todayAppointments = appointments.filter(
      (item) => item.appointmentDate === today
    );

    const pendingRequests = appointments.filter(
      (item) => item.status === "pending"
    );

    const completedAppointments = appointments.filter(
      (item) => item.status === "completed"
    );

    const uniquePatients = new Set(
      appointments.map((item) => String(item.patient?._id || item.patient))
    );

    const consultationFee = Number(doctor.doctorInfo?.consultationFee || 0);
    const monthlyEarnings = completedAppointments.length * consultationFee;

    res.status(200).json({
      doctor,
      stats: {
        todayAppointments: todayAppointments.length,
        pendingRequests: pendingRequests.length,
        totalPatients: uniquePatients.size,
        completedAppointments: completedAppointments.length,
        monthlyEarnings
      },
      todaySchedule: todayAppointments,
      recentAppointments: appointments.slice(0, 8)
    });
  } catch (error) {
    console.error("Doctor dashboard error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = {
  getDoctorDashboard
};