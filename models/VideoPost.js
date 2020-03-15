const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const VideoPostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
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
  }
});

module.exports = VideoPost = model("video", VideoPostSchema);
