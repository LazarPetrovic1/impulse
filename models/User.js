const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const required = true;
const unique = true;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required,
  },
  lastName: {
    type: String,
    required,
  },
  email: {
    type: String,
    required,
    unique,
  },
  password: {
    type: String,
    required,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  sex: {
    type: String,
  },
  bio: {
    type: String,
  },
  dob: {
    type: String,
  },
  username: {
    type: String,
    required,
    unique,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  zip: {
    type: Number,
  },
  phone: {
    type: String,
    unique,
  },
  question: {
    type: String,
    required,
  },
  security: {
    type: String,
    required,
  },
  imageTaken: {
    type: Boolean,
    required,
  },
  dismissedPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "forumpost",
    },
  ],
  friends: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  friendRequestsSent: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  profileImages: [
    {
      url: String,
      content: String,
    },
  ],
  hidden: { type: String },
  trial: {
    isUsingTrial: {
      type: Boolean,
      default: false,
    },
    dateStarted: {
      type: Date,
      default: Date.now,
    },
    dateEnded: {
      type: Date,
      default: Date.now,
    },
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  blockedPeople: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
});

module.exports = User = model("user", UserSchema);
