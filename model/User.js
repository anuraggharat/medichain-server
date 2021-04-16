const mongoose = require("mongoose");

const docSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  account: {
    type: String,
    required: true,
  },
});



const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  account: {
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
  age: {
    type: String,
    required: true,
    min: 1,
  },
  city: {
    type: String,
    required: true,
  },
  accesslist: {
    type: [docSchema],
    required:false
  },
});

module.exports = mongoose.model("User", userSchema);
