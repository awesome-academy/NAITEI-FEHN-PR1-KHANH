import { useState } from 'react'
import { FaBars, FaSearch, FaTimes } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const topNavLinks = [
  { to: '/account', label: 'Tài khoản của tôi' },
  { to: '/order-status', label: 'Trang thái đơn hàng' },
  { to: '/return-policy', label: 'Chính sách trả hàng' },
  { to: '/cart', label: 'Giỏ hàng' },
  { to: '/login', label: 'Đăng nhập' },
  { to: '/register', label: 'Đăng ký' }
]

const navLinks = [
  { to: '/', label: 'TRANG CHỦ' },
  { to: '/category/vang-do', label: 'RƯỢU VANG ĐỎ' },
  { to: '/category/ruou-trang', label: 'RƯỢU TRẮNG' },
  { to: '/category/champagne', label: 'CHAMPAGNE' },
  { to: '/info', label: 'THÔNG TIN' },
  { to: '/blog', label: 'BLOG' },
  { to: '/contact', label: 'LIÊN HỆ' }
]

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className='w-full relative'>
      <div className='relative overflow-hidden'>
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{ backgroundImage: "url('/src/assets/header-bg.jpg')" }}
        ></div>
        <div className='absolute inset-0 bg-black/30'></div>

        <div className='relative z-10 border-b border-gray-700/30'>
          <div className='container mx-auto px-4 flex flex-col md:flex-row justify-between items-center py-2'>
            <div className='flex flex-wrap justify-center md:justify-start space-x-3 md:space-x-6 text-xs mb-2 md:mb-0'>
              {topNavLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `top-nav-link my-1 transition-colors ${
                      isActive ? 'text-yellow-400' : 'hover:text-yellow-400 text-white'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>

            <div className='relative w-full md:w-auto mt-2 md:mt-0'>
              <input
                type='text'
                placeholder='Tìm kiếm ở đây...'
                className='py-1 px-3 pr-8 text-xs bg-transparent border border-gray-600 rounded text-white placeholder-gray-400 w-full md:w-48'
              />
              <button className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400'>
                <FaSearch size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className='relative z-10 flex items-center justify-center py-8 md:py-16 text-center'>
          <div>
            <h2 className='text-white text-2xl md:text-4xl font-light tracking-wider mb-[-10px] md:mb-[-20px]'>
              Vang Đỏ
            </h2>
            <h1 className="font-['Pinyon_Script'] text-white text-[80px] md:text-[150px] leading-[1] mb-[-5px] md:mb-[-10px]">
              Rượu
            </h1>
            <span className='text-white text-lg md:text-xl font-light tracking-widest'>Since 1980</span>
          </div>
        </div>
      </div>

      <div className='bg-black'>
        <div className='container mx-auto px-4 flex items-center justify-between'>
          <div className='py-3 text-yellow-400 font-semibold'>
            <span className='text-lg'>Wine House</span>
            <span className='text-xs block'>Since 1980</span>
          </div>

          <button className='md:hidden text-white p-2' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          <nav className='hidden md:block flex-1'>
            <ul className='flex justify-center items-center space-x-4 lg:space-x-8'>
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `block py-2 px-4 text-white hover:text-yellow-400 ${isActive ? 'text-yellow-400' : ''}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className='hidden md:block w-[120px]'></div>
        </div>

        {mobileMenuOpen && (
          <div className='md:hidden bg-black border-t border-gray-800'>
            <ul className='py-2'>
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `block py-2 px-4 text-white hover:text-yellow-400 ${isActive ? 'text-yellow-400' : ''}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
