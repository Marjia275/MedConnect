const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assistant:   { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    patientName: { type: String, required: true },
    doctorName:  { type: String, required: true },
    specialty:   { type: String, required: true },
    appointmentDate: { type: String, required: true },
    appointmentTime: { type: String, required: true },
    serialNumber:    { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "accepted", "confirmed", "completed", "cancelled", "no-show"],
      default: "pending"
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "failed"],
      default: "unpaid"
    },
    consultationFee: { type: Number, default: 0 },
    notes:           { type: String, default: "" },
    patientPhone:    { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);