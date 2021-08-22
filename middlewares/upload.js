const multer = require('multer')
const crypto = require('crypto')
const { GridFsStorage } = require('@am-chris-ke/multer-gridfs-storage-fixed')

const storage = new GridFsStorage({
  url: process.env.MONGO_DB_URL,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  file: (req, file) => {
    const match = ['image/jpeg', 'image/png']
    const hexString = crypto.randomBytes(10).toString('hex')

    if(match.indexOf(file.mimetype) === -1) {
      const filename = `${hexString}~vue-blog~${file.originalname}`
      return filename
    }

    return {
      bucketName: 'photos',
      filename: `${hexString}~vue-blog~${file.originalname}`
    }
  }
})

module.exports = multer({
  storage
})
