const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  coverImage: {
    filename: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Post', postSchema)
