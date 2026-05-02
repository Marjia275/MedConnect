/**
 * MedConnect — Admin Seed Script
 * Run once: node seedAdmin.js
 * Creates the default admin account if none exists.
 */
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  const exists = await User.findOne({ role: "admin" });
  if (exists) {
    console.log("Admin already exists:", exists.email);
    process.exit(0);
  }

  const admin = await User.create({
    firstName: "System",
    lastName: "Admin",
    fullName: "System Admin",
    email: "admin@medconnect.com",
    phone: "01700000000",
    password: "Admin@123",
    role: "admin",
    isActive: true,
    isApproved: true
  });

  console.log("✅ Admin created successfully");
  console.log("   Email:    admin@medconnect.com");
  console.log("   Password: Admin@123");
  console.log("   ⚠️  Change this password immediately after first login.");
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
