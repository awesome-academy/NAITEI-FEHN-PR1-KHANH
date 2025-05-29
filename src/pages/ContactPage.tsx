import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import ContactInfo from '../components/Contact/ContactInfo'
import ContactForm from '../components/Contact/ContactForm'
import PageTitle from '../components/ui/PageTitle'

const ContactPage = () => {
  return (
    <div className='bg-white'>
      <div className='bg-gray-100 py-4'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center text-sm text-gray-600'>
            <Link to='/' className='hover:text-yellow-600 flex items-center'>
              <FaHome className='mr-1' /> Trang chủ
            </Link>
            <span className='mx-2'>/</span>
            <span className='text-yellow-600'>Địa chỉ</span>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div className='mb-8'>
          <PageTitle title='LIÊN HỆ' />
        </div>
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  )
}

export default ContactPage
