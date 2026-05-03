const User        = require("../models/User");
const Appointment = require("../models/Appointment");

const getAssistantDashboard = async (req, res) => {
  try {
    const assistant = await User.findById(req.params.userId)
      .select("-password").populate("linkedDoctor", "fullName doctorInfo city");
    if (!assistant || assistant.role !== "assistant")
      return res.status(404).json({ message: "Assistant not found" });

    const doctorId = assistant.linkedDoctor?._id || assistant.linkedDoctor;
    if (!doctorId) {
      return res.status(200).json({
        assistant, doctor: null,
        stats: { today: 0, pending: 0, total: 0, confirmed: 0 },
        todayAppointments: [], recentAppointments: []
      });
    }

    const today = new Date().toISOString().split("T")[0];
    const [allAppts, todayAppts, pending] = await Promise.all([
      Appointment.find({ doctor: doctorId }).populate("patient", "fullName phone"),
      Appointment.find({ doctor: doctorId, appointmentDate: today }).populate("patient", "fullName phone"),
      Appointment.countDocuments({ doctor: doctorId, status: "pending" })
    ]);

    res.status(200).json({
      assistant, doctor: assistant.linkedDoctor,
      stats: {
        today: todayAppts.length, pending,
        total: allAppts.length,
        confirmed: allAppts.filter(a => a.status === "confirmed").length
      },
      todayAppointments: todayAppts,
      recentAppointments: allAppts.slice(0, 10)
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getAssistantAppointments = async (req, res) => {
  try {
    const assistant = await User.findById(req.params.userId);
    if (!assistant || assistant.role !== "assistant")
      return res.status(404).json({ message: "Assistant not found" });

    const doctorId = assistant.linkedDoctor;
    if (!doctorId) return res.status(200).json({ appointments: [] });

    const { date, status } = req.query;
    const filter = { doctor: doctorId };
    if (date)   filter.appointmentDate = date;
    if (status) filter.status = status;

    const appts = await Appointment.find(filter)
      .sort({ appointmentDate: 1, serialNumber: 1 })
      .populate("patient", "fullName phone bloodGroup allergies");

    res.status(200).json({ appointments: appts });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const { status, serialNumber, notes } = req.body;
    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ message: "Appointment not found" });

    const valid = ["pending","accepted","confirmed","completed","cancelled","no-show"];
    if (status && !valid.includes(status))
      return res.status(400).json({ message: "Invalid status" });

    if (status)       appt.status = status;
    if (serialNumber) appt.serialNumber = serialNumber;
    if (notes)        appt.notes = notes;

    if (status === "accepted" && !appt.serialNumber) {
      const count = await Appointment.countDocuments({
        doctor: appt.doctor, appointmentDate: appt.appointmentDate,
        status: { $in: ["accepted","confirmed","completed"] }
      });
      appt.serialNumber = String(count + 1).padStart(2, "0");
    }

    await appt.save();
    res.status(200).json({ message: "Appointment updated", appointment: appt });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getAssistantDashboard, getAssistantAppointments, updateAppointment };
