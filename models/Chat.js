const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ChatPostSchema = new Schema({
  people: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  isGroup: {
    type: Boolean,
  },
  clearChat: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: "",
  },
  messages: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      body: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      isMedia: { type: Boolean },
      media: [
        {
          name: { type: String },
          type: { type: String },
          src: { type: String },
        },
      ],
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = ChatPost = model("chat", ChatPostSchema);
