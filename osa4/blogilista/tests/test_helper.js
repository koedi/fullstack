const Blog = require('../models/blog')
const User = require('../models/user')

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


const initialUsers = [
  {
    'username': 'akuankka',
    'name': 'Aku Ankka',
    'passwordHash': '$2b$10$Yq3FCMuwed6w7V6KsMQZN.SHXu3.bhJ1G5uEcvJVYkp9WgJVQPb.6'  //123qwe
  },
  {
    'username': 'inkku69',
    'name': 'Iines Ankka',
    'passwordHash': '$2b$10$YbM3USyUVTpymMy0i3ASqeehyBUUVXzR1fcVz.hWi7j09FPOh5ngK'  //salasana
  }
]


const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}


module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDB,
  usersInDB
}