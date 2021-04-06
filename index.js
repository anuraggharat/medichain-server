const express = require("express");
var cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

var port = process.env.PORT || 8080;
//cors policy
app.use(cors());
//Importing routes
const userRoute = require("./routes/user");
const doctorRoute = require("./routes/doctor");
const encrydecryRoute = require("./routes/encrydecry");

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Medichain Database connected")
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Main Server for Medichain");
});

//Routes
app.use("/api/user", userRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api", encrydecryRoute);

app.listen(port, function () {
  console.log(`App running on port ${port}`);
});
