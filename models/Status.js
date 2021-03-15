const mongoose = require('mongoose')
const { Schema, model } = mongoose

const StatusPostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isMedia: { type: Boolean },
  media: [{
    name: { type: String },
    type: { type: String },
    src: { type: String },
  }],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = StatusPost = model('chat', StatusPostSchema)
