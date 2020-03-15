const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ForumPostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        // username
        type: String
      },
      avatar: {
        // user avatar
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  endorsements: {
    type: Number
  },
  judgements: {
    type: Number
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        // username
        type: String
      },
      avatar: {
        // user avatar
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = ForumPost = model("forum", ForumPostSchema);
