const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Conversation = mongoose.model(
    "Conversation",
    new Schema({
      user1_id: {type: Schema.ObjectId, required: true},
      user2_id: {type: Schema.ObjectId, required: true}
    },
    {timestamps: true})
  );

  module.exports = Conversation