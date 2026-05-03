const User = require("../models/User");
const bcrypt = require("bcryptjs");

// POST /api/doctor-assistant/invite
const sendAssistantInvite = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const { email, fullName, phone } = req.body;

    if (!email || !fullName || !phone) {
      return res.status(400).json({ message: "Full name, email, and phone are required." });
    }

    // Check if doctor already has an assistant
    const existing = await User.findOne({ linkedDoctor: doctorId, role: "assistant" });
    if (existing) {
      return res.status(400).json({ message: "You already have an assistant. Remove them first." });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      if (existingUser.role !== "assistant") {
        return res.status(400).json({ message: "This email is registered under a different role." });
      }
      // Link existing assistant
      existingUser.linkedDoctor = doctorId;
      await existingUser.save();

      return res.status(200).json({
        message: "Assistant linked successfully",
        assistant: {
          id: existingUser._id,
          fullName: existingUser.fullName,
          email: existingUser.email,
          phone: existingUser.phone,
        },
      });
    }

    // Create new assistant account
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "Assistant";

    const newAssistant = new User({
      firstName,
      lastName,
      fullName: fullName.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      password: "MedConnect@123",
      role: "assistant",
      isActive: true,
      isApproved: true,
      linkedDoctor: doctorId,
    });

    await newAssistant.save();

    return res.status(201).json({
      message: "Assistant account created and linked successfully",
      assistant: {
        id: newAssistant._id,
        fullName: newAssistant.fullName,
        email: newAssistant.email,
        phone: newAssistant.phone,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/doctor-assistant/my-assistant/:doctorId
const getMyAssistant = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const assistant = await User.findOne({ linkedDoctor: doctorId, role: "assistant" }).select("-password");
    return res.status(200).json({ assistant: assistant || null });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE /api/doctor-assistant/remove/:assistantId
const removeAssistant = async (req, res) => {
  try {
    const assistant = await User.findById(req.params.assistantId);
    if (!assistant || assistant.role !== "assistant") {
      return res.status(404).json({ message: "Assistant not found" });
    }
    assistant.linkedDoctor = null;
    await assistant.save();
    return res.status(200).json({ message: "Assistant removed" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { sendAssistantInvite, getMyAssistant, removeAssistant };