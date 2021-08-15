const { test, expect, describe } = require('@jest/globals')
const list_helper = require('../utils/list_helper')

const noBlogs = []

const oneBlog = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  }
]

const multipleBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

describe('babbys first test', () => {
  test('should be one', () => {
    const result = list_helper.dummy(noBlogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  test('total likes sum to 36', () => {
    const result = list_helper.totalLikes(multipleBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('blog with most likes', () => {
    const result = list_helper.favoriteBlog(multipleBlogs)

    const expectedResult =
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    }

    expect(result).toMatchObject(expectedResult)
  })
})

describe('author with most blogs', () => {
  test('should be one', () => {
    const result = list_helper.mostBlogs(multipleBlogs)
    const expectedResult =
    {
      author: 'Robert C. Martin',
      blogs: 3,
    }

    expect(result).toMatchObject(expectedResult)
  })
})

describe('author with most blogs', () => {
  test('should be one', () => {
    const result = list_helper.mostLikes(multipleBlogs)
    const expectedResult =
    {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    }
    expect(result).toMatchObject(expectedResult)
  })
})
