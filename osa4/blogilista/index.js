require('dotenv').config()
const http = require('http')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')

const app = express()

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const PORT = process.env.PORT
const mongoUrl = process.env.MONGODB_URI //'mongodb://localhost/bloglist'


const Blog = mongoose.model('Blog', blogSchema)
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => console.log(error))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

