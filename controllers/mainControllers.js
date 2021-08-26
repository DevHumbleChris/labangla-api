const Post = require('../models/Posts')
const Comments = require('../models/Comments')

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
        content: req.body.content,
        author: req.body.author
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
  },
  trendingPosts: async (req, res) => {
    try {
      const posts = await Post.find({}).limit(5).sort({ dateCreated: -1 })
      res.json({
        posts
      })
    } catch (err) {
      res.json({
        error: err.message
      })
    }
  },
  postComment: async (req, res) => {
    try {
      const postID = req.body.postID

      const comments = await Comments.findOne({ postID: postID})

      if (comments) {
        if (req.body.name && req.body.content) {
          const comments = {
            name: req.body.name,
            content: req.body.content
          }
          const { nModified } = await Comments.updateOne(
            { postID: postID },
            {
              $push: {
                comments: comments
              }
            }
          )

          if (nModified === 1) {
            return res.status(200).json({
              message: 'Commented Added'
            })
          }
        }
      } else {
        const newComment = new Comments({
          postID,
          comments: {
            name: req.body.name,
            content: req.body.content
          }
        })

        const results = await newComment.save()
        return res.status(200).json({
          message: 'Commented Added'
        })
      }
    } catch (err) {
      res.json({
        error: err.message
      })
    }
  },
  getComments: async (req, res) => {
    try {
      const postID = req.params.postID
      const results = await Comments.findOne({postID: postID})
      res.json({
        results
      })
    } catch (err) {
      res.json({
        error: err.message
      })
    }
  }
}
