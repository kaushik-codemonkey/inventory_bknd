const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// validation
const { registerValid, loginValid } = require("./validation");
// Routes

// Register Route
router.post("/register", async (req, res) => {
  // input validation
  const validation = registerValid(req.body);
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);

  //email already exist validation
  const emailExist = await User.findOne({ "user.email": req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");
  // password hashing
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  // actual data save
  const user = new User({
    user: {
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    },
  });
  try {
    const saveduser = await user.save();
    res.send(saveduser);
  } catch (err) {
    res.status(404).send(err);
  }
});
// Login route
router.post("/login", async (req, res) => {
  // validation
  const { error } = loginValid(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  //if email exist

  const user = await User.findOne({ "user.email": req.body.email });
  if (!user) return res.status(400).send("Email  is wrong");
  // if password is right
  const validpass = await bcrypt.compare(req.body.password, user.user.password);
  if (!validpass) return res.status(400).send("password is wrong");
  // change in db as loggedin

  await User.update(
    { "user.email": req.body.email },
    { $set: { "user.loggedin": true } }
  );
  //Create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth_token", token).send({ token, id: user._id });
});
// Logout api
router.post("/logout", async (req, res) => {
  //if email exist
  console.log(jwt.decode(req.headers.auth_token, process.env.TOKEN_SECRET)._id);
  const user = await User.findOne({
    _id: jwt.decode(req.headers.auth_token, process.env.TOKEN_SECRET)._id,
  });
  console.log(jwt.decode(req.headers.auth_token, process.env.TOKEN_SECRET)._id);
  if (!user) if (!user) return res.status(400).send("User doesn't exist");
  await User.update(
    {
      _id: jwt.decode(req.headers.auth_token, process.env.TOKEN_SECRET)._id,
    },
    { $set: { "user.loggedin": false } }
  );
  res.send("User Logged out");
});

module.exports = router;
