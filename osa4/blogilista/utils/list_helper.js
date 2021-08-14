const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.size === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const moreLikes = (current, blog) => {
    return current.likes > blog.likes ? current : blog
  }

  const favorite = blogs.size === 0 ? null : blogs.reduce(moreLikes, blogs[0])
  return {
    'title': favorite.title,
    'author': favorite.author,
    'likes': favorite.likes
  }


}





module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}