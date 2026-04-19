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

const getDoctorProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const doctor = await User.findById(userId).select("-password");

    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({
      doctor
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

const updateDoctorProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      fullName,
      email,
      phone,
      gender,
      city,
      dateOfBirth,
      specialty,
      degree,
      experience,
      bmdc,
      consultationFee,
      maxPatientsPerDay,
      chamberName,
      chamberAddress,
      about,
      availability
    } = req.body;

    const doctor = await User.findById(userId);

    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    if (!fullName || !email || !phone) {
      return res.status(400).json({ message: "Full name, email and phone are required" });
    }

    const emailExists = await User.findOne({
      email: email.toLowerCase(),
      _id: { $ne: userId }
    });

    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    doctor.firstName = firstName;
    doctor.lastName = lastName || firstName;
    doctor.fullName = fullName.trim();
    doctor.email = email.toLowerCase().trim();
    doctor.phone = phone.trim();
    doctor.gender = gender || "";
    doctor.city = city || "";
    doctor.dateOfBirth = dateOfBirth || "";

    doctor.doctorInfo.specialty = specialty || "";
    doctor.doctorInfo.degree = degree || "";
    doctor.doctorInfo.experience = Number(experience || 0);
    doctor.doctorInfo.bmdc = bmdc || "";
    doctor.doctorInfo.consultationFee = Number(consultationFee || 0);
    doctor.doctorInfo.maxPatientsPerDay = Number(maxPatientsPerDay || 0);
    doctor.doctorInfo.chamberName = chamberName || "";
    doctor.doctorInfo.chamberAddress = chamberAddress || "";
    doctor.doctorInfo.about = about || "";

    if (Array.isArray(availability)) {
      doctor.doctorInfo.availability = availability.map((item) => ({
        day: item.day || "",
        enabled: Boolean(item.enabled),
        from: item.from || "",
        to: item.to || ""
      }));
    }

    await doctor.save();

    res.status(200).json({
      message: "Doctor profile updated successfully",
      doctor: {
        id: doctor._id,
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        fullName: doctor.fullName,
        email: doctor.email,
        phone: doctor.phone,
        gender: doctor.gender,
        city: doctor.city,
        dateOfBirth: doctor.dateOfBirth,
        role: doctor.role,
        doctorInfo: doctor.doctorInfo
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

const changeDoctorPassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current password and new password are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters" });
    }

    const doctor = await User.findById(userId);

    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const isMatch = await doctor.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    doctor.password = newPassword;
    await doctor.save();

    res.status(200).json({
      message: "Password updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = {
  getDoctorDashboard,
  getDoctorProfile,
  updateDoctorProfile,
  changeDoctorPassword
};