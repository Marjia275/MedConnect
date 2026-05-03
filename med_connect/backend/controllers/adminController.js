const User        = require("../models/User");
const Appointment = require("../models/Appointment");
const Payment     = require("../models/Payment");
const bcrypt      = require("bcryptjs");
const jwt         = require("jsonwebtoken");

// POST /api/admin/login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const admin = await User.findOne({ email: email.toLowerCase(), role: "admin" });
    if (!admin) return res.status(401).json({ message: "Invalid admin credentials" });

    const match = await admin.comparePassword(password);
    if (!match) return res.status(401).json({ message: "Invalid admin credentials" });

    if (!admin.isActive)
      return res.status(403).json({ message: "Admin account deactivated" });

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Admin login successful",
      token,
      user: { id: admin._id, fullName: admin.fullName, email: admin.email, role: admin.role }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/admin/dashboard
const getAdminDashboard = async (req, res) => {
  try {
    const [
      totalPatients, totalDoctors, pendingDoctors,
      totalAppointments, completedAppointments, cancelledAppointments,
      totalUsers, recentUsers, paymentsResult
    ] = await Promise.all([
      // Count ALL patients regardless of isActive (fixes old users not counted)
      User.countDocuments({ role: "patient" }),
      // Count ALL approved doctors — old ones had no isApproved so use $ne false
      User.countDocuments({ role: "doctor", isApproved: { $ne: false } }),
      // Pending = explicitly set to false (old undefined users are NOT pending)
      User.countDocuments({ role: "doctor", isApproved: false }),
      Appointment.countDocuments({}),
      Appointment.countDocuments({ status: "completed" }),
      Appointment.countDocuments({ status: "cancelled" }),
      User.countDocuments({ role: { $in: ["patient", "doctor"] } }),
      User.find({ role: { $in: ["patient", "doctor"] } })
        .select("-password").sort({ createdAt: -1 }).limit(5),
      Payment.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }])
    ]);

    const totalRevenue = paymentsResult.length > 0 ? paymentsResult[0].total : 0;
    const today = new Date().toISOString().split("T")[0];
    const todayAppointments = await Appointment.countDocuments({ appointmentDate: today });

    res.status(200).json({
      stats: {
        totalPatients, totalDoctors, pendingDoctors,
        totalAppointments, completedAppointments, cancelledAppointments,
        totalUsers, totalRevenue, todayAppointments
      },
      recentUsers
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/admin/users?role=&search=&page=
const getUsers = async (req, res) => {
  try {
    const { role, search, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (role) filter.role = role;
    if (search) {
      const q = new RegExp(search, "i");
      filter.$or = [{ fullName: q }, { email: q }, { phone: q }];
    }
    const skip  = (Number(page) - 1) * Number(limit);
    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .select("-password").sort({ createdAt: -1 }).skip(skip).limit(Number(limit));

    res.status(200).json({ users, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// PATCH /api/admin/users/:id/status
const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role === "admin")
      return res.status(400).json({ message: "Cannot deactivate another admin" });
    user.isActive = !user.isActive;
    await user.save();
    res.status(200).json({
      message: `User ${user.isActive ? "activated" : "deactivated"}`,
      isActive: user.isActive
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/admin/doctors/pending
const getPendingDoctors = async (req, res) => {
  try {
    // Only explicitly false — old docs with undefined isApproved are NOT pending
    const doctors = await User.find({ role: "doctor", isApproved: false })
      .select("-password").sort({ createdAt: -1 });
    res.status(200).json({ doctors });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// PATCH /api/admin/doctors/:id/approve
const approveDoctor = async (req, res) => {
  try {
    const { approved } = req.body;
    const doctor = await User.findById(req.params.id);
    if (!doctor || doctor.role !== "doctor")
      return res.status(404).json({ message: "Doctor not found" });

    doctor.isApproved = approved !== false;
    doctor.isActive   = approved !== false;
    await doctor.save();
    res.status(200).json({
      message: doctor.isApproved ? "Doctor approved" : "Doctor rejected",
      doctor: { id: doctor._id, fullName: doctor.fullName, isApproved: doctor.isApproved }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/admin/reports
const getReports = async (req, res) => {
  try {
    const [payments, appts] = await Promise.all([
      Payment.find({}).sort({ createdAt: -1 }).limit(50)
        .populate("patient", "fullName").populate("doctor", "fullName"),
      Appointment.find({}).sort({ createdAt: -1 }).limit(50)
        .populate("patient", "fullName").populate("doctor", "fullName")
    ]);
    const totalRevenue = await Payment.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    res.status(200).json({
      payments, appointments: appts,
      totalRevenue: totalRevenue[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// POST /api/admin/assistants
const createAssistant = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, linkedDoctorId } = req.body;
    if (!firstName || !lastName || !email || !phone || !password)
      return res.status(400).json({ message: "All fields required" });

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    const assistant = await User.create({
      firstName, lastName,
      fullName: `${firstName} ${lastName}`,
      email: email.toLowerCase(), phone, password,
      role: "assistant",
      isActive: true, isApproved: true,
      linkedDoctor: linkedDoctorId || null
    });

    res.status(201).json({
      message: "Assistant account created",
      assistant: {
        id: assistant._id, fullName: assistant.fullName,
        email: assistant.email, linkedDoctor: assistant.linkedDoctor
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  adminLogin, getAdminDashboard, getUsers, toggleUserStatus,
  getPendingDoctors, approveDoctor, getReports, createAssistant
};