const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const mongoUrl = config.MONGODB_URI


logger.info('Connecting to', mongoUrl)
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch(error => {
    logger.error('Error connecting to MongoDB: ', error.message)
  })


const app = express()
app.use(cors())
app.use(express.json())


app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

app.post('/api/blogs', middleware.userExtractor)
app.put('/api/:id', middleware.userExtractor)
app.delete('/api/blogs/:id', middleware.userExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app