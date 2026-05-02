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
    const todayAppointments = appointments.filter((item) => item.appointmentDate === today);
    const pendingRequests = appointments.filter((item) => item.status === "pending");
    const completedAppointments = appointments.filter((item) => item.status === "completed");
    const uniquePatients = new Set(appointments.map((item) => String(item.patient?._id || item.patient)));
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
    res.status(500).json({ message: error.message });
  }
};

const getDoctorProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const doctor = await User.findById(userId).select("-password");
    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ doctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDoctorProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      fullName, email, phone, gender, city, dateOfBirth,
      specialty, degree, experience, bmdc, consultationFee,
      maxPatientsPerDay, chamberName, chamberAddress, about, availability
    } = req.body;
    const doctor = await User.findById(userId);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }
    const emailExists = await User.findOne({ email: email.toLowerCase(), _id: { $ne: userId } });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const nameParts = fullName.trim().split(" ");
    doctor.firstName = nameParts[0];
    doctor.lastName = nameParts.slice(1).join(" ");
    doctor.fullName = fullName;
    doctor.email = email.toLowerCase();
    doctor.phone = phone;
    doctor.gender = gender;
    doctor.city = city;
    doctor.dateOfBirth = dateOfBirth;
    doctor.doctorInfo.specialty = specialty;
    doctor.doctorInfo.degree = degree;
    doctor.doctorInfo.experience = Number(experience || 0);
    doctor.doctorInfo.bmdc = bmdc;
    doctor.doctorInfo.consultationFee = Number(consultationFee || 0);
    doctor.doctorInfo.maxPatientsPerDay = Number(maxPatientsPerDay || 0);
    doctor.doctorInfo.chamberName = chamberName;
    doctor.doctorInfo.chamberAddress = chamberAddress;
    doctor.doctorInfo.about = about;
    if (Array.isArray(availability)) {
      doctor.doctorInfo.availability = availability;
    }
    await doctor.save();

    // FIX: was only returning { message } — frontend's saveSection() needs data.doctor
    // to call fillDoctorProfile() and update localStorage. Re-fetch to exclude password.
    const updatedDoctor = await User.findById(userId).select("-password");
    res.status(200).json({ message: "Doctor profile updated", doctor: updatedDoctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changeDoctorPassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentPassword, newPassword } = req.body;
    const doctor = await User.findById(userId);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }
    const isMatch = await doctor.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }
    doctor.password = newPassword;
    await doctor.save();
    res.status(200).json({ message: "Password updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("-password");
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await User.findById(req.params.id).select("-password");
    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ doctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDoctorDashboard,
  getDoctorProfile,
  updateDoctorProfile,
  changeDoctorPassword,
  getAllDoctors,
  getDoctorById
};