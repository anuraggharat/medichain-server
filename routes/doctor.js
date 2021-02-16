const router = require("express").Router();
const {
  registerValidationDoctor,
  loginValidationDoctor,
} = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Doctor = require("../model/Doctor");

router.post("/register", async (req, res) => {
  //validating data

  const { error } = registerValidationDoctor(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if email already exists
  const emailExist = await Doctor.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exist");

  //hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //creating new user
  const doctor = new Doctor({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    gender: req.body.gender,
    phoneno: req.body.phoneno,
    age: req.body.age,
    city: req.body.city,
    specialization: req.body.specialization,
  });
  console.log(doctor);
  try {
    doctor
      .save()
      .then((result) => {
        console.log("Doctor created");
        res.status(201).json({
          message: "Doctor Created",
          result: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Unable to create Doctor",
        });
      });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  //validating data
  const { error } = loginValidationDoctor(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if email exist
  const doctor = await Doctor.findOne({ email: req.body.email });
  if (!doctor) return res.status(400).send("Email not found");

  //Password checking
  const vaidPass = await bcrypt.compare(req.body.password, doctor.password);
  if (!vaidPass) return res.status(400).send("password incorrect");

  //res.send('logged in!');

  //create and assign a token
  const token = jwt.sign({ _id: doctor._id }, process.env.SECRET_KEY);
  res
    .header("auth-token", token)
    .json({ token: token, user: doctor, message: "User Successfully created" });
});

module.exports = router;
