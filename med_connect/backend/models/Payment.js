const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true },
    patient:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount:      { type: Number, required: true },
    method:      { type: String, default: "bkash" },
    transactionId: { type: String, default: "" },
    bkashNumber:   { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "completed"
    },
    paidAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
