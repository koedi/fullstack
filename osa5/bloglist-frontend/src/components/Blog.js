import PropTypes from 'prop-types'
import React, { useState } from 'react'
import '../App.css'

const Blog = ({ blog, addLike, removeBlog, user }) => {

  const [showMore, setShowMore] = useState(false)

  const hideWhenVisible = { display: showMore ? 'none' : '' }
  const showWhenVisible = { display: showMore ? '' : 'none' }
  const showWhenUserAdded = { display: user.id !== blog.user?.id ? '' : 'none' }


  const handleAddLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: user.id }
    console.log(updatedBlog)
    addLike(blog.id, updatedBlog)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }


  return (
    <div className="blogStyle">
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={() => setShowMore(true)}>show more</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={() => setShowMore(false)}>show less</button><br />
        {blog.url}<br />
        likes: {blog.likes} <button onClick={handleAddLike}>like</button><br />

        <div style={showWhenUserAdded}>
          <button className="removeButton" onClick={handleRemove}>remove</button>
        </div>


      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
  addLike: PropTypes.func,
  removeBlog: PropTypes.func,
  user: PropTypes.object,
}

export default Blog