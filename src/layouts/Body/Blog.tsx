import { useEffect, useState, memo } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../services/api'
import type { BlogPost } from '../../interfaces/BlogPost'

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true)
        const data = await api.getBlogPosts()
        setPosts(data.slice(0, 2))
        setError(null)
      } catch (err) {
        setError('Failed to load blog posts. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  if (loading) {
    return (
      <div>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-light text-gray-800 uppercase tracking-wider'>TIN TỨC & BLOG</h2>
          <div className='flex justify-center mt-2'>
            <img src='/src/assets/title-dark.png' alt='Divider' className='h-4' />
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {[...Array(2)].map((_, index) => (
            <div key={index} className='animate-pulse'>
              <div className='h-48 bg-gray-200 mb-4'></div>
              <div className='h-5 bg-gray-200 rounded w-3/4 mb-2'></div>
              <div className='h-3 bg-gray-200 rounded w-1/2 mb-2'></div>
              <div className='h-3 bg-gray-200 rounded w-full mb-2'></div>
              <div className='h-3 bg-gray-200 rounded w-5/6 mb-2'></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-light text-gray-800 uppercase tracking-wider'>TIN TỨC & BLOG</h2>
          <div className='flex justify-center mt-2'>
            <img src='/src/assets/title-dark.png' alt='Divider' className='h-4' />
          </div>
        </div>
        <div className='text-center text-red-500'>{error}</div>
      </div>
    )
  }

  return (
    <div>
      <div className='text-center mb-8'>
        <h2 className='text-3xl font-light text-gray-800 uppercase tracking-wider'>TIN TỨC & BLOG</h2>
        <div className='flex justify-center mt-2'>
          <img src='/src/assets/title-dark.png' alt='Divider' className='h-4' />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {posts.map((post) => (
          <div key={post.id} className='group'>
            <Link to={`/blog/${post.id}`} className='block overflow-hidden mb-4'>
              <img
                src={post.image}
                alt={post.title}
                className='w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105'
              />
            </Link>
            <h3 className='text-lg font-medium text-gray-800 mb-2'>
              <Link to={`/blog/${post.id}`} className='hover:text-yellow-600'>
                {post.title}
              </Link>
            </h3>
            <div className='text-gray-500 text-xs mb-2'>{post.date}</div>
            <p className='text-gray-600 text-sm mb-2 line-clamp-3'>{post.content}</p>
            <Link to={`/blog/${post.id}`} className='text-yellow-600 hover:text-yellow-700 text-xs font-medium'>
              Read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(Blog)
