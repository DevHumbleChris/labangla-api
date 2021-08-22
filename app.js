require('dotenv/config')
require('colors')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const GridFS = require('gridfs-stream')
const mainRoute = require('./routes/mainRoutes')

const app = express()
const PORT = process.env.PORT

// Middlewares.
app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use('/', mainRoute)

// MongoDB Setup.
mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
})

// Database Connection.
const conn = mongoose.connection

let gfs;
conn.once('error', console.error.bind('error', `Failed To Connect To MongoDB`.bold.red))
conn.on('open', () => {
  gfs = GridFS(conn.db, mongoose.mongo)
  gfs.collection('photos')
  console.log(`Successfully Connected To MongoDB`.bold.cyan)
})

// Routes.
app.get('/image/:filename', async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename })
    const readStream = gfs.createReadStream(file.filename)
    readStream.pipe(res)
  }catch(err) {
    res.json(err.message)
  }
})

app.delete('/delete-image/:id', async (req, res) => {
  try {
    const data = await gfs.files.deleteOne({id: req.params.id})
    if (data.result.ok !== 1) return res.status(200).json({
      error: 'Image Not Deleted'
    })
    res.json({
      message: 'Image Deleted Successfully'
    })
  } catch (err) {
    console.log(err.message)
  }
})

// Error Handling.
// 404 Error.
app.use( (req, res, next) => {
  res.status(404).json({
    code: 404,
    message: 'Page Not Found'
  })
  next()
})
// 500 Error.
// app.use( (err, req, res, next) => {
//   res.status(500).json({
//     code: 500,
//     message: 'Internal Server Error',
//     error: err.message
//   })
//   next(err)
// })

app.listen(PORT, () => {
  console.log(`Server Started At Port: ${PORT}`.bold.blue)
})
