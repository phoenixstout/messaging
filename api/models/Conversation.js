const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Conversation = mongoose.model(
  "Conversation",
  new Schema(
    {
      user1_id: { type: Schema.ObjectId, required: true },
      user2_id: { type: Schema.ObjectId, required: true },
      messages: [
        {
          author_id: { type: Schema.ObjectId, required: true },
          author: { type: String, required: true },
          content: { type: String, required: true },
          createdAt: { type: Date, default: new Date() },
        },
      ],
    },
    { timestamps: true }
  )
);

module.exports = Conversation;
