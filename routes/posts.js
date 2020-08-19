const router = require("express").Router();
const verify = require("./verifyTokens");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// get lists
router.get("/", verify, async (req, res) => {
  const user = await User.findOne({
    _id: jwt.decode(req.headers.auth_token, process.env.TOKEN_SECRET)._id,
  });

  if (!user) return res.send("User not found");
  return res.send(user.items);
});
module.exports = router;

// post lists
router.post("/update", verify, async (req, res) => {
  const user = await User.findOne({
    _id: jwt.decode(req.headers.auth_token, process.env.TOKEN_SECRET)._id,
  });

  if (!user) return res.send("User not found");
  await User.updateOne(
    {
      _id: jwt.decode(req.headers.auth_token, process.env.TOKEN_SECRET)._id,
    },
    { $push: { items: req.body.items } }
  );
  return res.send(
    await User.findById(
      jwt.decode(req.headers.auth_token, process.env.TOKEN_SECRET)._id
    )
  );
});
