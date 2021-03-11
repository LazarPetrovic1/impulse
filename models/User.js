const mongoose = require('mongoose')
const { Schema, model } = mongoose

const required = true
const unique = true

const UserSchema = new Schema({
  firstName: {
    type: String,
    required
  },
  lastName: {
    type: String,
    required
  },
  email: {
    type: String,
    required,
    unique
  },
  password: {
    type: String,
    required
  },
  date: {
    type: Date,
    default: Date.now
  },
  sex: {
    type: String,
    required
  },
  bio: {
    type: String,
    required
  },
  dob: {
    type: String,
    required
  },
  username: {
    type: String,
    required,
    unique
  },
  city: {
    type: String,
    required
  },
  country: {
    type: String,
    required
  },
  zip: {
    type: Number,
    required
  },
  phone: {
    type: String,
    required,
    unique
  },
  question: {
    type: String,
    required
  },
  security: {
    type: String,
    required
  },
  imageTaken: {
    type: Boolean,
    required
  },
  dismissedPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'forumpost'
  }],
  friends: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  }],
  friendRequestsSent: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  }],
  profileImages: [{
    url: String,
    content: String
  }]
})

module.exports = User = model('user', UserSchema)
