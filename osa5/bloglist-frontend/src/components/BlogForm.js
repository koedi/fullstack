
import React from 'react'

const BlogForm = ({
  handleTitleChange, handleAuthorChange, handleUrlChange,
  title, author, url,
  handleCreateBlog
}) => {


  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title: <input type="text" value={title} name="Title" onChange={handleTitleChange} />
        </div>
        <div>
          author: <input type="text" value={author} name="Author" onChange={handleAuthorChange} />
        </div>
        <div>
          url: <input type="text" value={url} name="url" onChange={handleUrlChange} />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm