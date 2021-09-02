const { test, expect, describe, afterAll, beforeEach } = require('@jest/globals')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('root', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()

})

describe('adding on top of initial users', () => {
  test('adding new user', async () => {
    const startingUsers = await helper.usersInDB()

    const newUser = {
      'username': 'pelle',
      'name': 'Pelle Peloton',
      'password': 'salasana'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const endingUsers = await helper.usersInDB()
    expect(endingUsers).toHaveLength(startingUsers.length + 1)
  })


  test('adding existing user', async () => {
    const newUser = {
      'username': 'pelle',
      'name': 'Pelle Peloton',
      'password': 'salasana'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })


  test('too short password', async () => {
    const newUser = {
      'username': 'pelle',
      'name': 'Pelle Peloton',
      'password': 'ss'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })


  test('too short username', async () => {
    const newUser = {
      'username': 'pp',
      'name': 'Pelle Peloton',
      'password': 'salasana'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})




afterAll(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)

  mongoose.connection.close()
})

