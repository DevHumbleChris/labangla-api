const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  postID: {
    type: String,
    required: true
  },
  comments: [
    {
      name: {
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
    }
  ],
  postCreated: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Comment', commentSchema)
