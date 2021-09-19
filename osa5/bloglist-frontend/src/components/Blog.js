import React, { useState } from 'react'

import '../App.css'

const Blog = ({ blog, addLike }) => {

  const [showMore, setShowMore] = useState(false)

  const hideWhenVisible = { display: showMore ? 'none' : '' }
  const showWhenVisible = { display: showMore ? '' : 'none' }

  const handleAddLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1}
    addLike(blog.id, updatedBlog)
  }



  return (
    <div className="blogStyle">
      <div style={hideWhenVisible}>
      {blog.title} {blog.author} <button onClick={() =>  setShowMore(true)}>show more</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={() =>  setShowMore(false)}>show less</button><br/>
        {blog.url}<br/>
        likes: {blog.likes} <button onClick={handleAddLike}>like</button><br/>
      </div>

    </div>
  )
}

export default Blog