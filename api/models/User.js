const mongoose = require("mongoose");
const path = require('path')
const Schema = mongoose.Schema;

const User = mongoose.model(
  "User",
  new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    friend_requests: { type: Array },
    friends: { type: Array },
    conversations: { type: Array },
    profile_pic: {type: String, default: path.join(__dirname , '..', 'public', 'images', 'default.png')},
  })
);

module.exports = User;
