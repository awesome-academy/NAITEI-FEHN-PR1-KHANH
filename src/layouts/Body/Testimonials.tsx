import { useEffect, useState, useRef, memo } from 'react'
import { api } from '../../services/api'
import type { Testimonial } from '../../interfaces/Testimonial'
import { FaQuoteRight } from 'react-icons/fa'

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await api.getTestimonials()
        setTestimonials(data)
        setError(null)
      } catch (err) {
        setError('Failed to load testimonials. Please try again later.')
      }
    }

    fetchTestimonials()
  }, [])

  useEffect(() => {
    if (testimonials.length > 0) {
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
      }, 5000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [testimonials])

  const currentTestimonial = testimonials[currentIndex]

  if (error) {
    return (
      <div>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-light text-gray-800 uppercase tracking-wider'>KHÁCH HÀNG</h2>
          <div className='flex justify-center mt-2'>
            <img src='/src/assets/title-dark.png' alt='Divider' className='h-4' />
          </div>
        </div>
        <div className='text-center text-red-500'>{error}</div>
      </div>
    )
  }

  if (!currentTestimonial) {
    return null
  }

  return (
    <div>
      <div className='text-center mb-8'>
        <h2 className='text-3xl font-light text-gray-800 uppercase tracking-wider'>KHÁCH HÀNG</h2>
        <div className='flex justify-center mt-2'>
          <img src='/src/assets/title-dark.png' alt='Divider' className='h-4' />
        </div>
      </div>

      <div className='max-w-md mx-auto'>
        <div className='flex justify-center mb-6'>
          <div className='relative'>
            <div className='w-24 h-24 rounded-full overflow-hidden bg-yellow-100'>
              <img
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                className='w-full h-full object-cover'
              />
            </div>
            <div className='absolute -right-2 -bottom-2 bg-yellow-500 rounded-full p-2'>
              <FaQuoteRight className='text-white' />
            </div>
          </div>
        </div>

        <div className='text-center'>
          <p className='text-gray-600 italic mb-6'>{currentTestimonial.content}</p>
          <h4 className='text-gray-800 font-medium uppercase'>{currentTestimonial.name}</h4>
          <p className='text-gray-500 text-sm'>{currentTestimonial.position}</p>
        </div>

        <div className='flex justify-center mt-8 space-x-2'>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-yellow-500' : 'bg-gray-300'}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(Testimonials)
