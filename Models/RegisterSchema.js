const mongoose = require("mongoose");
const validator = require("validator");

const RegisterSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    validate: {
      validator: (value) => /^[A-Za-z]+$/.test(value),
      message: "Only alphabets are allowed",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Please enter a valid email address",
    },
  },
  phone: {
    type: String, // Changed from Number to String
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: (value) => validator.isMobilePhone(value, "any"), // Added locale
      message: "Enter a valid phone number",
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (value) => validator.isStrongPassword(value),
      message: "Password must be strong",
    },
  },
  retypePassword: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value) {
        return value === this.get("password"); // Using this.get()
      },
      message: "Passwords do not match",
    },
  },
});

const Register = mongoose.model("Register", RegisterSchema);

module.exports = Register;
