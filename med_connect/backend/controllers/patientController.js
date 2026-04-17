const User = require("../models/User");
const Appointment = require("../models/Appointment");
const calculateProfileCompletion = (patient) => {
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
    patient.country,
    patient.height,
    patient.weight,
    patient.emergencyContactName,
    patient.emergencyContactPhone
  ];
  const filledFields = fieldsToCheck.filter(
    (field) => field && String(field).trim() !== ""
  ).length;

  return Math.round((filledFields / fieldsToCheck.length) * 100);
};

const getPatientDashboard = async (req, res) => {
  try {
    const { userId } = req.params;

    const patient = await User.findById(userId).select("-password");

    if (!patient || patient.role !== "patient") {
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

    const profileCompletion = calculateProfileCompletion(patient);

    res.status(200).json({
      patient,
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

const getPatientProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const patient = await User.findById(userId).select("-password");

    if (!patient || patient.role !== "patient") {
      return res.status(404).json({ message: "Patient not found" });
    }

    const profileCompletion = calculateProfileCompletion(patient);

    res.status(200).json({
      patient,
      profileCompletion
    });
  } catch (error) {
  console.error("Update profile error:", error);
  res.status(500).json({
    message: "Server error",
    error: error.message
  });
  }
};

const updatePatientProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const patient = await User.findById(userId);

    if (!patient || patient.role !== "patient") {
      return res.status(404).json({ message: "Patient not found" });
    }

    const {
      firstName,
      lastName,
      phone,
      gender,
      dateOfBirth,
      bloodGroup,
      address,
      city,
      country,
      height,
      weight,
      allergies,
      medicalConditions,
      emergencyContactName,
      emergencyContactRelationship,
      emergencyContactPhone
    } = req.body;

    patient.firstName = firstName || patient.firstName;
    patient.lastName = lastName || patient.lastName;
    patient.fullName = `${patient.firstName} ${patient.lastName}`;
    patient.phone = phone || patient.phone;
    patient.gender = gender || "";
    patient.dateOfBirth = dateOfBirth || "";
    patient.bloodGroup = bloodGroup || "";
    patient.address = address || "";
    patient.city = city || "";
    patient.country = country || "Bangladesh";
    patient.height = height || "";
    patient.weight = weight || "";
    patient.allergies = allergies || "";
    patient.medicalConditions = medicalConditions || "";
    patient.emergencyContactName = emergencyContactName || "";
    patient.emergencyContactRelationship = emergencyContactRelationship || "";
    patient.emergencyContactPhone = emergencyContactPhone || "";

    await patient.save();

    const updatedPatient = await User.findById(userId).select("-password");
    const profileCompletion = calculateProfileCompletion(updatedPatient);

    res.status(200).json({
      message: "Profile updated successfully",
      patient: updatedPatient,
      profileCompletion
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = {
  getPatientDashboard,
  getPatientProfile,
  updatePatientProfile
};