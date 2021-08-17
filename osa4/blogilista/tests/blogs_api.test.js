const { test, expect, describe, afterAll, beforeEach} = require('@jest/globals')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    'author': 'Edsger W. Dijkstra',
    'likes': 5,
    'title': 'Go To Statement Considered Harmful', 
    'url': 'http://www.u.arizona.edu/~rubinson/copyright_violationsGo_To_Considered_Harmful.html'
  },
  {
    'author': 'Edsger W. Dijkstra',
    'likes': 12,
    'title': 'Canonical string reduction',
    'url': 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
  },
  {
    'author': 'Robert C. Martin',
    'likes': 10,
    'title': 'First class tests',
    'url': 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll'
  },
  {
    'author': 'Robert C. Martin',
    'likes': 0,
    'title': 'TDD harms architecture',
    'url': 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
  },
  {
    'author': 'Robert C. Martin',
    'likes': 2,
    'title': 'Type wars',
    'url': 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html'
  },
  {
    'author': 'Michael Chan',
    'likes': 7,
    'title': 'React patterns',
    'url': 'https://reactpatterns.com/'
  },
]


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})



describe('babbys first async/await', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })


  test('there are six blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(6)
  })
})

describe('blogging is fun!', () => {
  test('id is id not _id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test('new entry', async () => {
    const responseBefore = await api.get('/api/blogs')

    const newEntry = {
      title:	'Aku Ankan parhaat vol. 3',
      author:	'Carl Barks',
      url:	'http://ankka.org/',
      likes:	666
    }

    await api
      .post('/api/blogs')
      .send(newEntry)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const responseAfter = await api.get('/api/blogs')

    expect(responseAfter.body).toHaveLength(responseBefore.body.length + 1)
  })

  test('no likes :(', async () => {
    
  })

})



afterAll(() => {
  mongoose.connection.close()
})
