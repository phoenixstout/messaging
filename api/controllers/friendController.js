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
      const requests = await User.find({ username: authData.user })
        .select("friend_requests")
        .exec();
      res.json(requests);
    }
  }); 
};

exports.putRequests = async (req, res) => {
  jwt.verify(req.token, process.env.JWTSECRET, async (err, authData) => {
    if (err) return res.sendStatus(403);
    if(req.body.confirm) {
      console.log('adding friend')
      await User.updateOne({username:authData.user}, {$pull: {friend_requests: req.body.friend}, $addToSet: {friends:req.body.friend}})
      await User.updateOne({username:req.body.friend}, {$pull: {friend_requests: authData.user}, $addToSet: {friends:authData.user}})
    }
    else {
      await User.updateOne({username:authData.user}, {$pull: {friend_requests: req.body.friend}})
    }
    res.json({hi: 'hi'})
  });
}
