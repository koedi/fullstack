const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users.map(user => user.toJSON()))
})




usersRouter.post('/', async (request, response, next) => {

  if (request.body.password.length < 3) {
    return response.status(400).json({ error: 'password is too short (min 3)' })
  }

  if (request.body.username.length < 3) {
    return response.status(400).json({ error: 'username is too short (min 3)' })
  }



  const saltRounds = 10
  const passwordHash = await bcrypt.hash(request.body.password, saltRounds)

  const user = new User({
    username: request.body.username,
    name: request.body.name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch(exception) {
    next(exception)
  }
})

module.exports = usersRouter