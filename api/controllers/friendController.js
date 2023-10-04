const User = require("../models/User.js");
const Conversation = require("../models/Conversation.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getIndex = (req, res) => {
  jwt.verify(req.token, process.env.JWTSECRET, async (err, authData) => {
    if (err) return res.sendStatus(403);
    const friendsList = await User.find({ _id: authData.user_id }).select(
      "friends"
    );
    res.json({ friends: friendsList[0].friends });
  });
};

exports.getRequests = (req, res) => {
  jwt.verify(req.token, process.env.JWTSECRET, async (err, authData) => {
    if (err) return res.sendStatus(403);
    else {
      let requests = await User.find({ _id: authData.user_id }).select(
        "friend_requests -_id"
      );
      requests = requests[0].friend_requests.map((request) => {
        return request.username;
      });

      res.json(requests);
    }
  });
};

exports.putRequests = async (req, res) => {
  jwt.verify(req.token, process.env.JWTSECRET, async (err, authData) => {
    if (err) return res.sendStatus(403);

    const friend = await User.findOne({ username: req.body.friend });
    const user = await User.findById(authData.user_id)
   

    if (req.body.confirm) {
      console.log("adding friend");
      await User.updateOne(
        { _id: authData.user_id },
        {
          $pull: { friend_requests: {username: req.body.friend} },
          $addToSet: { friends: { name: req.body.friend, _id: friend._id } },
        }
      );
      await User.updateOne(
        { username: req.body.friend },
        {
          $pull: { friend_requests: {username: authData.user} },
          $addToSet: { friends: { name: user.username, _id: authData.user_id } },
        }
      );
    } else {
      await User.update(
        { _id: authData.user_id },
        { $pull: { friend_requests: { username: req.body.friend } } },
        {new: true}
      );
    }
    res.json({ hi: "hi" });
  });
};

exports.postRequests = async (req, res) => {
  jwt.verify(req.token, process.env.JWTSECRET, async (err, authData) => {
    if (err) return res.sendStatus(403);
    else {
      await User.updateOne(
        { username: req.body.friendInput },
        {
          $addToSet: {
            friend_requests: {
              username: req.body.user,
              user_id: authData.user_id,
            },
          },
        }
      ).exec();
    }
  });
  res.sendStatus(200);
};

exports.postMessage = (req, res) => {
  jwt.verify(req.token, process.env.JWTSECRET, async (err, authData) => {
    if (err) return res.sendStatus(403);
    console.log(authData.user, req.body.content, req.body.choice);
    const message = new Conversation({
      user1_id: authData.user,
      user2_id: req.body.choice,
      messages: req.body.content,
    });
    await message.save();
    console.log(await User.find({ username: "a" }).select("friends -_id"));
    await User.updateOne({ username: authData.user, friends });
    res.sendStatus(200);
  });
};
