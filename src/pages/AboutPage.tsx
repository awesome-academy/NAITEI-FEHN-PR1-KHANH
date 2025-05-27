import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import PageTitle from '../components/ui/PageTitle'
import { useEffect, useState } from 'react'
import type { IntroductionType } from '../interfaces/Product'
import { toast } from 'react-toastify'
import { api } from '../services/api'

const AboutPage = () => {
  const [introduction, setIntroduction] = useState<IntroductionType | null>(null)

  useEffect(() => {
    const getIntroduction = async () => {
      try {
        const data = await api.getIntroduction()
        setIntroduction(data)
      } catch (err) {
        toast.error('Không thể tải nội dung giới thiệu. Vui lòng thử lại sau.')
      }
    }

    getIntroduction()
  }, [])
  return (
    <div className='bg-white'>
      <div className='bg-gray-100 py-4'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center text-sm text-gray-600'>
            <Link to='/' className='hover:text-yellow-600 flex items-center'>
              <FaHome className='mr-1' /> Trang chủ
            </Link>
            <span className='mx-2'>/</span>
            <span className='text-yellow-600'>Giới thiệu</span>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div className='mb-8'>
          <PageTitle title='Giới thiệu' />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-start'>
          <div className='order-2 lg:order-1'>
            <img
              src='/src/assets/grapes-green.jpg'
              alt='Nho xanh'
              className='w-full h-auto object-cover rounded-lg shadow-lg'
            />
          </div>

          <div className='order-1 lg:order-2'>
            <h2 className='text-2xl font-medium text-gray-800 uppercase mb-6 tracking-wider'>
              CHÀO MỪNG ĐẾN VỚI Wine hourse
            </h2>

            <div className='space-y-4 text-gray-600 leading-relaxed'>
              <p className='text-[18px]'>{introduction?.content} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
