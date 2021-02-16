const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

//Importing routes
const userRoute = require("./routes/user");
const doctorRoute = require("./routes/doctor");

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Db Connected")
);

console.log();

//middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Main Database");
});

//Route middlewares
app.use("/api/user", userRoute);
app.use("/api/doctor", doctorRoute);

app.listen(4000, () => console.log("Server up and running"));
