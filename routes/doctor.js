const router = require("express").Router();
const {
  registerValidationDoctor,
  loginValidationDoctor,
} = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Doctor = require("../model/Doctor");

router.post("/register", async (req, res) => {
  const { error } = registerValidationDoctor(req.body);
  if (error)
    return res
      .status(200)
      .json({ success: false, error: error.details[0].message });

  const emailExist = await Doctor.findOne({ email: req.body.email });
  if (emailExist)
    return res
      .status(200)
      .json({ success: false, error: "Email already exist" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

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
  try {
    doctor
      .save()
      .then((result) => {
        console.log("Doctor created");
        res.status(201).json({
          message: "Doctor Created",
          success: true,
          result: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(200)
          .json({ success: false, error: "Unable to create User" });
      });
  } catch (err) {
    res.status(200).json({ success: false, error: "Unable to create User" });
  }
});

router.post("/login", async (req, res) => {
  //validating data
  const { error } = loginValidationDoctor(req.body);
  if (error)
    return res
      .status(200)
      .json({ success: false, error: error.details[0].message });

  //checking if email exist
  const doctor = await Doctor.findOne({ email: req.body.email });
  if (!doctor)
    return res
      .status(200)
      .json({ success: false, error: "Email Does not exist!" });

  //Password checking
  const vaidPass = await bcrypt.compare(req.body.password, doctor.password);
  if (!vaidPass)
    return res
      .status(200)
      .json({ success: false, error: "password incorrect" });

  const token = jwt.sign({ _id: doctor._id }, process.env.SECRET_KEY);
  res.header("auth-token", token).json({
    success: true,
    token: token,
    user: doctor,
    message: "Login Successfull",
  });
});

//get all Doctors
router.get("/getdoctors", async (req, res) => {
  try {
    const data = await Doctor.find();
    const count = await Doctor.find().count();

    res.status(200).json({
      success: true,
      data: data,
      count: count,
      message: "Displaying list of doctors available",
    });
  } catch (error) {
    res.status(200).json({ success: false, error: error });
  }
});

module.exports = router;
