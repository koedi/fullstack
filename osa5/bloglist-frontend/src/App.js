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


  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const createBlog = async (event) => {
    event.preventDefault()
    console.log('creating new blog')

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    try {
      await blogService
        .create(newBlog)
        .then(blog => {
          setBlogs(blogs.concat(blog))
          setTitle('')
          setAuthor('')
          setUrl('')
          showNotification('OK', `A new blog "${title}" by ${author} added`)
        })
    } catch (exception) {

    }
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
          <BlogForm
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value)}
            title={title}
            author={author}
            url={url}
            handleCreateBlog={createBlog}
          />
        </div>
        <div style={showWhenVisible}>
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>


        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    <div>
      <Notification message={notification.message} className={notification.type} />
      {user === null ? loginForm() : showContent()}
    </div>

  )





}

export default App