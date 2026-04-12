const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    role: {
      type: String,
      enum: ["patient", "doctor"],
      required: true
    },
    doctorInfo: {
      specialty: {
        type: String,
        default: ""
      },
      degree: {
        type: String,
        default: ""
      },
      bmdc: {
        type: String,
        default: ""
      }
    }
  },
  { timestamps: true }
); //the user data structure

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {5896
    
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
}); //runs before saving the user and hashes the password

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}; // compares passwrod while logging in

module.exports = mongoose.model("User", userSchema);