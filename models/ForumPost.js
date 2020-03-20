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
      }
    }
  ]
})

module.exports = ForumPost = model('forum', ForumPostSchema)
