const { test, expect, describe, afterAll, beforeEach } = require('@jest/globals')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)



beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

})



describe('babbys first async/await', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })


})

describe('testing blog properties', () => {
  test('id is id not _id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test('there are six blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(6)
  })
})


describe('blogging is fun!', () => {
  
  beforeEach(async () => {
    const newUser = {
      username: 'juuri',
      name: 'juuri',
      password: 'juuri'
    }

    await api
      .post('/api/users')
      .send(newUser)
  })
  

  test('new entry', async () => {
    const newEntry = {
      title: 'Aku Ankan parhaat vol. 3',
      author: 'Carl Barks',
      url: 'http://ankka.org/',
      likes: 666
    }

    await api
      .post('/api/blogs')
      .send(newEntry)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const responseAfter = await api.get('/api/blogs')

    expect(responseAfter.body).toHaveLength(helper.initialBlogs.length + 1)
  })


  test('no likes :(', async () => {
    const newEntry = {
      title: 'Aku Ankan parhaat vol. 99',
      author: 'Carl Barks',
      url: 'http://ankka.org/'
    }

    await api
      .post('/api/blogs')
      .send(newEntry)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body[6].likes).toBe(0)
  })


  test('no title or url -> NOK', async () => {
    const newEntry = {
      author: 'Carl Barks',
      likes: 747
    }

    await api
      .post('/api/blogs')
      .send(newEntry)
      .expect(400)
  })


  test('adding and removing', async () => {
    const newEntry = {
      title: 'Aku Ankan parhaat vol. 3',
      author: 'Carl Barks',
      url: 'http://ankka.org/',
      likes: 666
    }

    const response = await api.post('/api/blogs').send(newEntry).expect(201)
    await api.delete(`/api/blogs/${response.body.id}`).expect(204)
  })

  test('adding likes <3<3', async () => {
    const newEntry = {
      title: 'Aku Ankan parhaat vol. 3',
      author: 'Carl Barks',
      url: 'http://ankka.org/',
      likes: 666
    }

    const response = await api.post('/api/blogs').send(newEntry).expect(201)

    const updatedEntry = {
      title: 'Aku Ankan parhaat vol. 3',
      author: 'Carl Barks',
      url: 'http://ankka.org/',
      likes: 676
    }

    await api.put(`/api/blogs/${response.body.id}`).send(updatedEntry).expect(200)
  })


})




afterAll(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)

  mongoose.connection.close()
})
