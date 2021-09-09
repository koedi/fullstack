import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword]= useState('')
  const [user, setUser] = useState(null)
  

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [errorMessage, setErrorMessage] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])



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
      setErrorMessage('invalid credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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

  const showBlogs = () => (
    <div>
      <p> {user.name} logged in
        <button type="submit" onClick={logoutUser}>logout</button>
      </p>

      <h2>create new</h2>
      <form onSubmit={blogService.create}>
        <div>
        title: <input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
        author: <input type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
        url: <input type="text" value={url} name="url" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <div>
        <button type="submit" onClick={createBlog}>create</button>
        </div>
      </form>

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      {user === null ? loginForm() : showBlogs()}
    </div>

  )
  




}

export default App