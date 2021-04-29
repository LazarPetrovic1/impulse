const mongoose = require('mongoose')
const { Schema, model } = mongoose

const ForumPostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  author: {
    type: String
  },
  body: {
    type: String,
    required: true
  },
  media: [
    {
      name: { type: String },
      type: { type: String },
      src: { type: String },
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
  }],
  date: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true
  },
  savedBy: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  }],
  comments: [{
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
  }]
})

module.exports = ForumPost = model('forumpost', ForumPostSchema)
