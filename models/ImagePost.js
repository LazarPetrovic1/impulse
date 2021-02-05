const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ImagePostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  content: {
    type: String,
    required: true
  },
  url: { type: String },
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
  endorsements: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  }],
  judgements: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  }]
});

module.exports = ImagePost = model("image", ImagePostSchema);
