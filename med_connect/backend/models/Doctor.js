const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  location: String,
  experience: Number,
  rating: Number,
  availability: { type: Boolean, default: true }
});

module.exports = mongoose.model("Doctor", doctorSchema);