import React, { useState } from 'react'

import '../App.css'

const Blog = ({ blog, addLike }) => {

  const [showMore, setShowMore] = useState(false)

  const hideWhenVisible = { display: showMore ? 'none' : '' }
  const showWhenVisible = { display: showMore ? '' : 'none' }

  const update = () => {
    console.log(blog)
      const id = blog.id
      const updateBlog = {
        user: blog.user?.id || blog.user,
        likes: blog.likes + 1,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        id: blog.id
      }
    addLike(id, updateBlog)
  }



  return (
    <div className="blogStyle">
      <div style={hideWhenVisible}>
      {blog.title} {blog.author} <button onClick={() =>  setShowMore(true)}>show more</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={() =>  setShowMore(false)}>show less</button><br/>
        {blog.url}<br/>
        likes: {blog.likes} <button onClick={update}>like</button><br/>
      </div>

    </div>
  )
}

export default Blog