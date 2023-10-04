const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = mongoose.model(
  "User",
  new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    friend_requests: { type: Array },
    friends: { type: Array },
    conversations: { type: Array },
  })
);

module.exports = User;
