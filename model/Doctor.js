const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  specialization: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  gender: {
    type: String,
    required: true,
    min: 1,
  },
  phoneno: {
    type: String,
    required: true,
    min: 10,
  },
  city: {
    type: String,
    required: true,
    min: 2,
  },
  age: {
    type: String,
    required: true,
    min: 1,
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);
