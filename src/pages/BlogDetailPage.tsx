import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../services/api'
import type { BlogPost } from '../interfaces/BlogPost'

const BlogDetailPage = () => {
  const { blogId } = useParams<{ blogId: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!blogId) return
      try {
        const allPosts = await api.getBlogPosts()
        const foundPost = allPosts.find((p) => String(p.id) === blogId)
        if (foundPost) {
          setPost(foundPost)
          const sortedPosts = [...allPosts].sort((a, b) => {
            const dateA = a.date
            const dateB = b.date
            const [dayA, monthA, yearA] = dateA.split('/').map(Number)
            const [dayB, monthB, yearB] = dateB.split('/').map(Number)
            const dateObjA = new Date(yearA, monthA - 1, dayA)
            const dateObjB = new Date(yearB, monthB - 1, dayB)

            return dateObjB.getTime() - dateObjA.getTime()
          })

          setRecentPosts(sortedPosts.slice(0, 3))
          setError(null)
        } else {
          setError('Bài viết không tồn tại')
        }
      } catch (err) {
        setError('Không thể tải bài viết. Vui lòng thử lại sau.')
      }
    }

    fetchData()
  }, [blogId])

  if (error || !post) {
    return (
      <div className='container mx-auto px-4 py-8 text-center'>
        <div className='text-red-500 text-lg'>{error ?? 'Bài viết không tồn tại'}</div>
        <Link to='/blog' className='text-yellow-600 hover:underline mt-4 inline-block'>
          Quay lại trang blog
        </Link>
      </div>
    )
  }

  return (
    <div className='bg-white'>
      <div className='container mx-auto px-4 py-8'>
        <div className='flex items-center text-sm text-gray-600 mb-4'>
          <Link to='/' className='hover:text-yellow-600'>
            Trang chủ
          </Link>
          <span className='mx-2'>/</span>
          <Link to='/blog' className='hover:text-yellow-600'>
            Blog
          </Link>
        </div>

        <div className='mb-8'>
          <h1 className='text-3xl font-light text-gray-800 uppercase'>BLOG</h1>
          <div className='w-24 h-0.5 bg-gray-300 mt-2 relative flex items-center'>
            <div className='ml-auto flex items-center h-4'>
              <div className='w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-gray-300 border-b-[6px] border-b-transparent'></div>
            </div>
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-8'>
          <div className='w-full md:w-1/4'>
            <div className='mb-8'>
              <h3 className='text-lg font-medium text-gray-800 uppercase mb-4'>BÀI VIẾT MỚI NHẤT</h3>
              <div className='space-y-4'>
                {recentPosts.map((recentPost) => (
                  <div key={recentPost.id} className='flex gap-3'>
                    <Link to={`/blog/${recentPost.id}`} className='block'>
                      <img src={recentPost.image} alt={recentPost.title} className='w-20 h-20 object-cover' />
                    </Link>
                    <div>
                      <h4 className='text-sm font-medium text-gray-800 uppercase'>
                        <Link to={`/blog/${recentPost.id}`} className='hover:text-yellow-600'>
                          {recentPost.title}
                        </Link>
                      </h4>
                      <p className='text-xs text-gray-500'>{recentPost.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='mb-8'>
              <h3 className='text-lg font-medium text-gray-800 uppercase mb-4'>BLOG TAGS</h3>
              <div className='flex flex-wrap gap-2'>
                <span className='bg-orange-500 text-white px-3 py-1 text-sm rounded'>Đồng hồ</span>
                <span className='bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded'>Túi</span>
                <span className='bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded'>Phụ kiện</span>
                <span className='bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded'>Giày</span>
                <span className='bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded'>Sandal</span>
                <span className='bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded'>Áo sơ mi</span>
                <span className='bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded'>Nước hoa</span>
                <span className='bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded'>Trẻ em</span>
                <span className='bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded'>Thời trang nữ</span>
              </div>
            </div>

            <div className='mb-8'>
              <h3 className='text-lg font-medium text-gray-800 uppercase mb-4'>LATEST VIDEO</h3>
              <div className='relative'>
                <video
                  className='w-full rounded-lg shadow'
                  src={post.lastVideo}
                  controls
                  poster='https://pic.pikbest.com/best/video_preview_img/2303/8985093.jpg!fwc238'
                  autoPlay
                  loop
                  muted
                />
              </div>
            </div>
          </div>

          <div className='w-full md:w-3/4'>
            <div className='mb-8'>
              <img src={post.image} alt={post.title} className='w-full h-auto max-h-[600px] object-cover mb-6' />
              <h1 className='text-3xl font-medium text-gray-800 uppercase mb-2'>{post.title}</h1>
              <p className='text-sm text-gray-500 mb-6'>
                Đăng bởi {post.author} | {post.date} | 60 bình luận
              </p>
              <div className='prose max-w-none text-gray-700'>
                <p>{post.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogDetailPage
