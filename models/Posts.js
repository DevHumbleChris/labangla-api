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
  tags: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Post', postSchema)
