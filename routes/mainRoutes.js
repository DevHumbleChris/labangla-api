const route = require('express').Router()
const mainControllers = require('../controllers/mainControllers')
const upload = require('../middlewares/upload')

route.get('/', mainControllers.index)
route.post('/upload-image', upload.single('file'), mainControllers.postImage)
route.post('/post-content', mainControllers.postContent)
route.get('/blog-content/:id', mainControllers.getPostContent)
route.get('/all-posts', mainControllers.allContent)
route.get('/latest-posts', mainControllers.trendingPosts)
route.post('/post-comments', mainControllers.postComment)
route.get('/get-comments/:postID', mainControllers.getComments)

module.exports = route
