const express   = require("express");
const cors      = require("cors");
const dotenv    = require("dotenv");
const path      = require("path");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// ─── Static file serving ──────────────────────────────────────────────────────
// Serve the entire frontend folder (includes admin sub-folder)
app.use(express.static(path.join(__dirname, "../frontend")));

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use("/api/auth",          require("./routes/authRoutes"));
app.use("/api/patient",       require("./routes/patientRoutes"));
app.use("/api/doctor",        require("./routes/doctorRoutes"));
app.use("/api/doctors",       require("./routes/doctorSearchRoutes"));
app.use("/api/appointments",  require("./routes/appointmentRoutes"));
app.use("/api/prescriptions", require("./routes/prescriptionRoutes"));
app.use("/api/payments",      require("./routes/paymentRoutes"));
app.use("/api/admin",         require("./routes/adminRoutes"));


// ─── SPA fallback ─────────────────────────────────────────────────────────────
app.get("/{*path}", (req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ message: "API route not found" });
  }
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ MedConnect server running on port ${PORT}`));
