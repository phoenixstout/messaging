const User = require("../models/User.js");
const Conversation = require("../models/Conversation.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require("express");
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

      res.json(requests[0].friend_requests);
    }
  });
};

exports.putRequests = async (req, res) => {
  jwt.verify(req.token, process.env.JWTSECRET, async (err, authData) => {
    if (err) return res.sendStatus(403);

    const friend = await User.findOne({ username: req.body.friend_username });
    const user = await User.findById(authData.user_id);

    if (req.body.confirm) {
      const newConvo = new Conversation({
        user1_id: authData.user_id,
        user2_id: friend._id,
      });

      await newConvo.save();

      // Update current user
      // console.log("Friend username: ", friend.username)
      await User.updateOne(
        { _id: authData.user_id },
        {
          $pull: {
            "friend_requests.incoming": { username: friend.username },
            "friend_requests.outgoing": { username: user.username },
          },
          $addToSet: { friends: { name: friend.username, _id: friend._id } },
          $push: { conversations: newConvo },
        }
      );

      // Update friend
      await User.updateOne(
        { _id: friend._id },
        {
          $pull: {
            "friend_requests.incoming": { username: user.username },
            "friend_requests.outgoing": { username: user.username },
          }, // Accept incoming friend request if doubled
          $addToSet: {
            friends: { name: user.username, _id: user._id },
          },
          $push: { conversations: newConvo },
        }
      );
    } else {
      // If deny request
      await User.update(
        { _id: authData.user_id },
        {
          $pull: { "friend_requests.incoming": { username: friend.username } },
        },
        { new: true }
      );
    }
    res.sendStatus(200);
  });
};

exports.postRequests = async (req, res) => {
  jwt.verify(req.token, process.env.JWTSECRET, async (err, authData) => {
    if (err) return res.sendStatus(403);
    else {
      // Update friend's incoming requests
      await User.updateOne(
        { username: req.body.friendInput },
        {
          $addToSet: {
            "friend_requests.incoming": {
              username: req.body.user,
              user_id: authData.user_id,
            },
          },
        }
      ).exec();
      //Update current user's outgoing requests
      await User.updateOne(
        { _id: authData.user_id },
        {
          $addToSet: {
            "friend_requests.outgoing": {
              username: req.body.friendInput,
              user_id: req.body.friendID,
            },
          },
        }
      );
    }
  });
  res.sendStatus(200);
};

exports.getConversation = (req, res) => {
  if (!req.token) res.sendStatus(403);
  const friend_id = req.params.friend_id;
  jwt.verify(req.token, process.env.JWTSECRET, async (err, authData) => {
    if (!authData) return;
    const conversation = await Conversation.find({
      $or: [
        { user1_id: authData.user_id, user2_id: friend_id },
        { user1_id: friend_id, user2_id: authData.user_id },
      ],
    });
    const friend = await User.findById(friend_id);
    if (!conversation[0]) res.json({ error: "no conversation found" });
    res.json({
      friend: friend.username,
      conversation: conversation[0].messages,
    });
  });
};

exports.postConversation = (req, res) => {
  const friend_id = req.params.friend_id;

  jwt.verify(req.token, process.env.JWTSECRET, async (err, authData) => {
    await Conversation.updateOne(
      {
        $or: [
          { user1_id: authData.user_id, user2_id: friend_id },
          { user1_id: friend_id, user2_id: authData.user_id },
        ],
      },
      {
        $push: {
          messages: [
            {
              author_id: authData.user_id,
              author: authData.user,
              content: req.body.message,
            },
          ],
        },
      }
    );

    res.sendStatus(200);
  });
};
