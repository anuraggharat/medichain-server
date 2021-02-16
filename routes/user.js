const router = require("express").Router();
const User = require("../model/User");
const {
  registerValidationUser,
  loginValidationUser,
} = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  //validating data

  const { error } = registerValidationUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if email already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exist");

  //hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //creating new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    gender: req.body.gender,
    phoneno: req.body.phoneno,
    age: req.body.age,
    city: req.body.city,
  });
  console.log(user);
  try {
    user
      .save()
      .then((result) => {
        console.log("user created");
        res.status(201).json({
          message: "User Created",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Unable to create User,Try again!",
        });
      });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  //validating data
  const { error } = loginValidationUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if email exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email not found");

  //Password checking
  const vaidPass = await bcrypt.compare(req.body.password, user.password);
  if (!vaidPass) return res.status(400).send("Password incorrect");

  //res.send('logged in!');

  //create and assign a token
  console.log(process.SECRET_KEY);
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
  res.header("auth-token", token).json({ token: token, user: user });
});

module.exports = router;
