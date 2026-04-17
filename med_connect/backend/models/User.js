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
    },    gender: {
      type: String,
      default: ""
    },
    dateOfBirth: {
      type: String,
      default: ""
    },
    bloodGroup: {
      type: String,
      default: ""
    },
    address: {
      type: String,
      default: ""
    },
    city: {
      type: String,
      default: ""
    },
    country: {
      type: String,
      default: "Bangladesh"
    },
    height: {
      type: String,
      default: ""
    },
    weight: {
      type: String,
      default: ""
    },
    allergies: {
      type: String,
      default: ""
    },
    medicalConditions: {
      type: String,
      default: ""
    },
    emergencyContactName: {
      type: String,
      default: ""
    },
    emergencyContactRelationship: {
      type: String,
      default: ""
    },
    emergencyContactPhone: {
      type: String,
      default: ""
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
  },
  experience: {
    type: Number,
    default: 0
  },
  consultationFee: {
    type: Number,
    default: 0
  },
  chamberName: {
    type: String,
    default: ""
  },
  chamberAddress: {
    type: String,
    default: ""
  },
  about: {
    type: String,
    default: ""
  }
    }
  },
  { timestamps: true }
); //the user data structure

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});//runs before saving the user and hashes the password

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}; // compares passwrod while logging in

module.exports = mongoose.model("User", userSchema);