import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { type IntroductionType } from '../../interfaces/Product'
import { api } from '../../services/api'

const Introduction = () => {
  const [introduction, setIntroduction] = useState<IntroductionType | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getIntroduction = async () => {
      try {
        const data = await api.getIntroduction()
        setIntroduction(data)
        setError(null)
      } catch (err) {
        setError('Failed to load introduction content. Please try again later.')
      }
    }

    getIntroduction()
  }, [])

  return (
    <section className='py-16 relative overflow-hidden'>
      <div className='absolute top-0 left-0 w-1/4 h-full pointer-events-none'>
        <img
          src='/src/assets/grapes-purple.jpg'
          alt='Purple Grapes'
          className='object-contain'
          style={{ opacity: 0.8 }}
        />
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-light text-gray-800 uppercase tracking-wider'>{introduction?.title}</h2>
          <div className='flex justify-center mt-2'>
            <img src='/src/assets/title-dark.png' alt='Divider' className='h-4' />
          </div>
        </div>

        <div className='max-w-3xl mx-auto text-center'>
          {error ? (
            <div className='text-red-500'>{error}</div>
          ) : (
            <p className='text-gray-600 leading-relaxed mb-8'>{introduction?.content}</p>
          )}

          <Link
            to='/about'
            className='inline-flex items-center bg-black text-white px-6 py-2 text-sm uppercase tracking-wider hover:bg-yellow-600 transition-colors'
          >
            XEM THÊM
            <FaArrowRight className='ml-2' />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Introduction
