const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Trying MongoDB connection...");
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection failed");
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;