
 const mongoose = require("mongoose");

 const requestSchema = new mongoose.Schema({
   from: {
     type: String,
     required: true,
     min: 6,
     max: 255,
   },
   to: {
     type: String,
     required: true,
     max: 255,
     min: 6,
   },
   email: {
     type: String,
     required: true,
     max: 255,
     min: 6,
   },
   account: {
     type: String,
     required: true,
     max: 255,
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

 module.exports = mongoose.model("Requests", requestSchema);
