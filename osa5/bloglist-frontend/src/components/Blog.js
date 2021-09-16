import React, { useState } from 'react'

import '../App.css'

const Blog = ({ blog }) => {

  const [showMore, setShowMore] = useState(false)

  const hideWhenVisible = { display: showMore ? 'none' : '' }
  const showWhenVisible = { display: showMore ? '' : 'none' }


  return (
    <div className="blogStyle">
      <div style={hideWhenVisible}>
      {blog.title} {blog.author} <button onClick={() =>  setShowMore(true)}>show more</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={() =>  setShowMore(false)}>show less</button><br/>
        {blog.url}<br/>
        likes: {blog.likes} <button >like</button><br/>
      </div>

    </div>
  )
}

export default Blog