import Blog from './Blog'
import Testimonials from './Testimonials'

const BlogAndTestimonialsSection = () => {
  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <Blog />
          <Testimonials />
        </div>
      </div>
    </section>
  )
}

export default BlogAndTestimonialsSection
