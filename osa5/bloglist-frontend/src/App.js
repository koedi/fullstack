import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState({ message: null, type: null })

  const [blogFormVisible, setBlogFormVisible] = useState(false)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const showNotification = (type, message) => {
    setNotification({ message: message, type: type })
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 3000)
  }

  const createBlog = async (blogObject) => {
    console.log('creating new blog')

    try {
      await blogService
        .create(blogObject)
        .then(blog => {
          setBlogs(blogs.concat(blog))
          showNotification('OK', `A new blog "${blog.title}" by ${blog.author} added`)
        })
    } catch (exception) {
    }
  }

  const addLike = async (id, blogObject) => {
    try {
    await blogService
      .update(id, blogObject)
      .then(blog => {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : blogObject)))
      })
    } catch (exception) {
    }
  }



  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with: ', username, password)

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification('NOK', 'Wrond username or password')
      setUsername('')
      setPassword('')
    }


  }

  const logoutUser = () => {
    window.localStorage.clear()
    setUser(null)
  }


  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  )

  const showContent = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }


    return (
      <div>
        <p> {user.name} logged in
          <button type="submit" onClick={logoutUser}>logout</button>
        </p>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>create new blog</button>
        </div>

        <div style={showWhenVisible}>
          <BlogForm createBlog={createBlog} />
        </div>
        <div style={showWhenVisible}>
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>



        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} addLike={addLike} />
        )}
      </div>
    )
  }



  return (
    <div>
      <Notification message={notification.message} className={notification.type} />
      <h2>blogs</h2>
      {user === null ? loginForm() : showContent()}
    </div>

  )
}

export default App