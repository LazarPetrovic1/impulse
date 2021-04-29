const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const VideoPostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  isVideo: {
    type: Boolean,
    default: true
  },
  name: {
    type: String,
    required: true
  },
  savedBy: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  }],
  category: { type: String },
  views: { type: Number },
  description: {
    type: String,
    required: true
  },
  by: {
    // username
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  url: { type: String },
  meta: {
    duration: { type: Number },
    width: { type: Number },
    height: { type: Number },
  },
  comments: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    text: { // content
      type: String,
      required: true
    },
    name: { // by
      // username
      type: String
    },
    date: {
      type: Date,
      default: Date.now
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
    }],
    replies: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
      content: {
        type: String,
        required: true
      },
      by: {
        // username
        type: String
      },
      date: {
        type: Date,
        default: Date.now
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
    }]
  }],
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
});

module.exports = VideoPost = model("video", VideoPostSchema);
