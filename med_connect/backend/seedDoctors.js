const mongoose = require("mongoose");
const Doctor = require("./models/Doctor");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected");

    await Doctor.deleteMany();

    await Doctor.insertMany([
      {
        name: "Dr. John",
        specialization: "Cardiologist",
        location: "Delhi",
        experience: 10,
        rating: 4.5
      },
      {
        name: "Dr. Priya",
        specialization: "Dermatologist",
        location: "Mumbai",
        experience: 6,
        rating: 4.2
      }
    ]);

    console.log("Doctors added");
    process.exit();
  });