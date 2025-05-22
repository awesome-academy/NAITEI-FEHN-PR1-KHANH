import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import type { BlogPost } from '../interfaces/BlogPost'
import { toast } from 'react-toastify'

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const data = await api.getBlogPosts()
        setPosts(data)
      } catch (error) {
        toast.error('Failed to fetch blog posts')
      }
    }

    fetchBlogPosts()
  }, [])

  return (
    <div className='bg-white'>
      <div className='container mx-auto px-4 py-8'>
        <div className='flex items-center text-sm text-gray-600 mb-4'>
          <Link to='/' className='hover:text-yellow-600'>
            Trang chủ
          </Link>
          <span className='mx-2'>/</span>
          <span className='text-yellow-600'>Blog</span>
        </div>

        <div className='mb-8'>
          <h1 className='text-3xl font-light text-gray-800 uppercase'>BLOG</h1>
          <div className='w-24 h-0.5 bg-gray-300 mt-2 relative flex items-center'>
            <div className='ml-auto flex items-center h-4'>
              <div className='w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-gray-300 border-b-[6px] border-b-transparent'></div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {posts.map((post) => (
            <div key={post.id} className='mb-8'>
              <Link to={`/blog/${post.id}`} className='block mb-4'>
                <img
                  src={post.image}
                  alt={post.title}
                  className='w-full h-64 object-cover hover:opacity-90 transition-opacity'
                />
              </Link>
              <h2 className='text-xl font-medium text-gray-800 uppercase mb-2'>
                <Link to={`/blog/${post.id}`} className='hover:text-yellow-600'>
                  {post.title}
                </Link>
              </h2>
              <p className='text-sm text-gray-500 mb-4'>
                Đăng bởi {post.author} | {post.date} | 60 bình luận
              </p>
              <p className='text-gray-600 mb-4 line-clamp-3'>{post.content}</p>
              <Link to={`/blog/${post.id}`} className='text-yellow-600 hover:text-yellow-700 inline-block'>
                Read more
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogPage
