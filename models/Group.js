const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const GroupSchema = new Schema({
  people: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  pendingPeople: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  requiresAdmin: { type: Boolean },
  isSeen: { type: Boolean },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  groupImage: { type: String, default: false },
  about: {
    type: String,
  },
  posts: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      body: {
        type: String,
      },
      isMedia: { type: Boolean, default: false },
      media: [
        {
          name: { type: String },
          type: { type: String },
          src: { type: String },
        },
      ],
      comments: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "user",
          },
          text: {
            type: String,
            required: true,
          },
          name: {
            // username
            type: String,
          },
          avatar: {
            // user avatar
            type: String,
          },
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      endorsements: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "user",
          },
        },
      ],
      judgements: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "user",
          },
        },
      ],
      impulsions: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "user",
          },
        },
      ],
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Group = model("group", GroupSchema);
