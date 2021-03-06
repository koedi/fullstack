import PropTypes from 'prop-types'
import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleCreateBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title: <input id='blog-title' type="text" value={title} name="Title" onChange={handleTitleChange} />
        </div>
        <div>
          author: <input id='blog-author' type="text" value={author} name="Author" onChange={handleAuthorChange} />
        </div>
        <div>
          url: <input id='blog-url' type="text" value={url} name="url" onChange={handleUrlChange} />
        </div>
        <div>
          <button id='createBlog-button' type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm