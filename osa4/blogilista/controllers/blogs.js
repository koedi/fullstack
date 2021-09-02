const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('express-async-errors')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)

})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== decodedToken.id.toString()) {
    return response.status(401).json({ error: 'invalid credentials' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


blogsRouter.put('/:id', async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, request.body)
  response.status(200).end()
})


blogsRouter.post('/', async (request, response) => {

  if (request.body.title === undefined && request.body.url === undefined) {
    response.status(400).end()
    return
  }

  const user = request.user

  const blog = new Blog({
    author: request.body.author,
    title: request.body.title,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

module.exports = blogsRouter
