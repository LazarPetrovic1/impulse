const mongoose = require('mongoose')
const { Schema, model } = mongoose

const ChatPostSchema = new Schema({
  people: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  messages: [{
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
    }
  }],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = ChatPost = model('chat', ChatPostSchema)
