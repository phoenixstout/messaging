const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getIndex = (req, res) => {
  res.json({ hi: "hi" });
};

exports.getRequests = (req, res) => {
  jwt.verify(req.token, process.env.JWTSECRET, async (err, authData) => {
    if (err) return res.sendStatus(403);
    else {
      console.log(authData.user);
      const requests = await User.find({ username: authData.user })
        .select("friend_requests")
        .exec();
      res.json(requests);
    }
  });
};
