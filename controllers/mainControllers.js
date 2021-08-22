const Post = require('../models/Posts')

module.exports = {
  index: (req, res) => {
    res.json({
      message: 'Controllers Made'
    })
  },
  postImage: (req, res) => {
    try {
      if(!req.file) return res.status(200).json({
        error: 'File Required'
      })
      console.log(req.file)
      res.json({
        file: req.file
      })
    }catch(err) {
      res.json({
        error: err.message
      })
    }
  },
  postContent: async (req, res) => {
    try {
      const newPost = new Post({
        coverImage: {
          filename: req.body.coverImage.filename,
          id: req.body.coverImage.id
        },
        tags: req.body.tags,
        title: req.body.title,
        content: req.body.content
      })

      const results = await newPost.save()
      res.json({
        results,
      })
    } catch (err) {
      console.log(err.message)
      res.json({
        error: err.message
      })
    }
  },
  getPostContent: async (req, res) => {
    try {
      const results = await Post.findOne({_id: req.params.id})
      res.json({
        results
      })
    } catch (err) {
      res.json({
        error: err.message
      })
    }
  },
  allContent: async (req, res) => {
    try {
      const posts = await Post.find({})
      res.json({
        posts
      })
    } catch (err) {
      res.json({
        error: err.message
      })
    }
  }
}
