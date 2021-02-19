const express = require("express");
var cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

app.use(cors());
//Importing routes
const userRoute = require("./routes/user");
const doctorRoute = require("./routes/doctor");
const encrydecryRoute = require("./routes/encrydecry");

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Db Connected")
);

console.log();

//middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Main Server for Medichain");
});

//Route middlewares
app.use("/api/user", userRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api", encrydecryRoute);

app.listen(4000, () => console.log("Server up and running"));
