const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//Importing routes
const authRoute = require("./routes/auth");

mongoose.connect(
  "mongodb+srv://anurag:anurag@medichain.9zhne.mongodb.net/medichaindb?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Db Connected")
);

//middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Main Database");
});

//Route middlewares
app.use("/api/user", authRoute);

app.listen(4000, () => console.log("Server up and running"));
