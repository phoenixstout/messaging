const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.get = (req, res) => {
  res.send("hi");
};

exports.postSignup = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) return res.json({ error: "Username already taken" });
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      console.log("bcrypt error");
      return res.sendStatus(500);
    }
    const newUser = User({
      username: req.body.username,
      password: hashedPassword,
    });
    await newUser.save();
    return res.json({});
  });
};

exports.postLogin = async (req, res) => {
  // Gets here only if passes passport middleware
  const user = await User.findOne({username: req.body.username})
  const token = jwt.sign({ user_id: user._id, user: req.body.username }, process.env.JWTSECRET, {
    expiresIn: "2h",
  });
  const friend = user.friends[0]? user.friends[0]._id : undefined
  res.json({ token, user: req.user.username, user_id: user._id, friend});
};


