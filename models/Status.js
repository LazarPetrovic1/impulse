const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const StatusPostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  body: {
    type: String,
    required: true,
  },
  savedBy: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  }],
  date: {
    type: Date,
    default: Date.now,
  },
  isVideo: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "textual",
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      content: {
        type: String,
        required: true,
      },
      by: {
        // username
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      replies: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "user",
          },
          content: {
            type: String,
            required: true,
          },
          by: {
            // username
            type: String,
          },
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
          }],
          impulsions: [{
            user: {
              type: Schema.Types.ObjectId,
              ref: "user"
            }
          }]
        },
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
      }],
      impulsions: [{
        user: {
          type: Schema.Types.ObjectId,
          ref: "user"
        }
      }]
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
});

module.exports = StatusPost = model("status", StatusPostSchema);
