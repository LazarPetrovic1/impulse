const mongoose = require('mongoose')
const { Schema, model } = mongoose

const NotifSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  text: { type: String },
  date: {
    type: Date,
    default: Date.now
  },
  read: {
    type: Boolean,
    default: false
  }
})

module.exports = Notif = model('notif', NotifSchema)
