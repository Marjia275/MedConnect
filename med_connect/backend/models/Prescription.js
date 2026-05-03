const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true },
    dose:     { type: String, default: "" },
    freq:     { type: String, default: "" },
    duration: { type: String, default: "" }
  },
  { _id: false }
);

const prescriptionSchema = new mongoose.Schema(
  {
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", default: null },
    patient:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    patientName: { type: String, required: true },
    doctorName:  { type: String, required: true },
    complaint:   { type: String, default: "" },
    diagnosis:   { type: String, required: true },
    medicines:   { type: [medicineSchema], default: [] },
    tests:       { type: String, default: "" },
    followUp:    { type: String, default: "" },
    notes:       { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prescription", prescriptionSchema);
