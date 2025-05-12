import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaTwitter, FaGooglePlusG, FaLinkedinIn, FaRss } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  const infoLinks = ['VỀ CHÚNG TÔI', 'GIAO HÀNG', 'CAM NGHĨ', 'LƯU TRỮ', 'CHÍNH SÁCH RIÊNG TƯ']

  const buyLinks = ['VẬN CHUYỂN VÀ TRẢ HÀNG', 'MUA HÀNG AN TOÀN', 'VẬN QUỐC TẾ', 'LIÊN KẾT', 'DỊCH VỤ GIẢM GIÁ']

  const socialIcons = [FaTwitter, FaGooglePlusG, FaLinkedinIn, FaRss]

  const contactItems = [
    {
      icon: <FaMapMarkerAlt className='text-gray-500 mt-1 mr-2 flex-shrink-0' />,
      content: 'Tầng 4, Tòa nhà Hanoi Group, Số 442 Đội Cấn, P. Cống Vị, Q. Ba Đình, Hà Nội'
    },
    {
      icon: <FaPhone className='text-gray-500 mr-2 flex-shrink-0' />,
      content: '(04) 6674 2332'
    },
    {
      icon: <FaPhone className='text-gray-500 mr-2 flex-shrink-0' />,
      content: '(04) 3786 8904'
    },
    {
      icon: <FaPhone className='text-gray-500 mr-2 flex-shrink-0' />,
      content: '(08) 6680 9686'
    },
    {
      icon: <FaEnvelope className='text-gray-500 mr-2 flex-shrink-0' />,
      content: (
        <a href='mailto:Support@bizweb.vn' className='text-yellow-600 hover:underline text-sm'>
          Support@bizweb.vn
        </a>
      )
    }
  ]

  const renderLinks = (links: any[]) =>
    links.map((text, i) => (
      <li key={i}>
        <Link to='/' className='text-gray-500 hover:text-yellow-600 text-sm'>
          {text}
        </Link>
      </li>
    ))

  return (
    <footer className='bg-white pt-10 pb-4'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div>
            <h3 className='text-gray-700 font-medium text-lg mb-4'>THÔNG TIN</h3>
            <ul className='space-y-2'>{renderLinks(infoLinks)}</ul>
          </div>

          <div>
            <h3 className='text-gray-700 font-medium text-lg mb-4'>MUA HÀNG</h3>
            <ul className='space-y-2'>{renderLinks(buyLinks)}</ul>
          </div>

          <div>
            <h3 className='text-gray-700 font-medium text-lg mb-4'>GỬI EMAIL</h3>
            <p className='text-gray-500 text-sm mb-4'>Gửi email cho chúng tôi để được hỗ trợ</p>
            <div className='flex'>
              <input
                type='email'
                placeholder='Enter your email'
                className='border border-gray-300 px-3 py-2 text-sm flex-grow focus:outline-none focus:border-yellow-500'
              />
              <button className='btn bg-gray-800 text-white'>GỬI</button>
            </div>
            <div className='flex space-x-4 mt-4'>
              {socialIcons.map((Icon, i) => (
                <Link key={i} to='#' className='text-gray-400 hover:text-gray-600'>
                  <Icon className='w-5 h-5' />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className='text-gray-700 font-medium text-lg mb-4'>LIÊN HỆ</h3>
            <ul className='space-y-3'>
              {contactItems.map((item, i) => (
                <li key={i} className='flex items-start'>
                  {item.icon}
                  <span className='text-gray-500 text-sm'>{item.content}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='mt-10 pt-6 border-t border-gray-200'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-gray-500 text-sm mb-4 md:mb-0'>© Copyright 2008-2014 DKT Technology JSC</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
