import { useState, useEffect } from 'react'
import { FaBars, FaSearch, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa'
import { NavLink, Link } from 'react-router-dom'
import { api } from '../../services/api'
import type { Category } from '../../interfaces/Product'
import { useAuth } from '../../contexts/AuthContext'

const Header = () => {
  const { currentUser, isAuthenticated, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mainCategories, setMainCategories] = useState<Category[]>([])
  const [subcategories, setSubcategories] = useState<Record<string, Category[]>>({})
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const mainCats = await api.getMainCategories()
        setMainCategories(mainCats)

        const subCats: Record<string, Category[]> = {}
        for (const cat of mainCats) {
          const subs = await api.getSubcategories(cat.id)
          subCats[cat.id] = subs
        }
        setSubcategories(subCats)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const handleCategoryHover = (categoryId: string) => {
    setActiveCategory(categoryId)
  }

  const handleMouseLeave = () => {
    setActiveCategory(null)
  }

  const handleLogout = () => {
    logout()
  }

  const topNavLinks = [
    { to: '/account', label: 'Tài khoản của tôi' },
    { to: '/order-status', label: 'Trang thái đơn hàng' },
    { to: '/return-policy', label: 'Chính sách trả hàng' },
    { to: '/cart', label: 'Giỏ hàng' }
  ]

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

              {isAuthenticated ? (
                <>
                  <Link
                    to='/profile'
                    className='top-nav-link my-1 transition-colors text-white hover:text-yellow-400 flex items-center'
                  >
                    <FaUser className='mr-1' />
                    {currentUser?.firstName}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='top-nav-link my-1 transition-colors text-white hover:text-yellow-400 flex items-center'
                  >
                    <FaSignOutAlt className='mr-1' /> Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to='/login'
                    className={({ isActive }) =>
                      `top-nav-link my-1 transition-colors ${
                        isActive ? 'text-yellow-400' : 'hover:text-yellow-400 text-white'
                      }`
                    }
                  >
                    Đăng nhập
                  </NavLink>
                  <NavLink
                    to='/register'
                    className={({ isActive }) =>
                      `top-nav-link my-1 transition-colors ${
                        isActive ? 'text-yellow-400' : 'hover:text-yellow-400 text-white'
                      }`
                    }
                  >
                    Đăng ký
                  </NavLink>
                </>
              )}
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
            <Link to='/' className='block'>
              <span className='text-lg'>Wine House</span>
              <span className='text-xs block'>Since 1980</span>
            </Link>
          </div>

          <button className='md:hidden text-white p-2' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          <nav className='hidden md:block flex-1 relative'>
            <ul className='flex justify-center items-center space-x-4 lg:space-x-8'>
              <li>
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    `block py-2 px-4 text-white hover:text-yellow-400 ${isActive ? 'text-yellow-400' : ''}`
                  }
                >
                  TRANG CHỦ
                </NavLink>
              </li>

              {mainCategories.map((category) => (
                <li
                  key={category.id}
                  onMouseEnter={() => handleCategoryHover(category.id)}
                  onMouseLeave={handleMouseLeave}
                  className='relative'
                >
                  <NavLink
                    to={`/category/${category.slug}`}
                    className={({ isActive }) =>
                      `block py-2 px-4 text-white hover:text-yellow-400 ${isActive ? 'text-yellow-400' : ''}`
                    }
                  >
                    {category.name}
                  </NavLink>

                  {activeCategory === category.id && subcategories[category.id]?.length > 0 && (
                    <div className='absolute left-0 mt-0 w-[500px] bg-white shadow-lg z-50 py-4 px-6 flex'>
                      <div className='grid grid-cols-2 gap-4 w-3/4'>
                        {subcategories[category.id].map((subcategory) => (
                          <div key={subcategory.id}>
                            <NavLink
                              to={`/category/${category.slug}/${subcategory.slug}`}
                              className='block text-gray-800 font-medium hover:text-yellow-600 mb-2'
                            >
                              {subcategory.name} ({subcategory.count ?? 0})
                            </NavLink>
                          </div>
                        ))}
                      </div>
                      <div className='w-1/4'>
                        <img
                          src='/src/assets/gallery/wine-barrel.jpg'
                          alt='Wine barrels'
                          className='w-full h-48 object-cover'
                        />
                      </div>
                    </div>
                  )}
                </li>
              ))}

              <li>
                <NavLink
                  to='/info'
                  className={({ isActive }) =>
                    `block py-2 px-4 text-white hover:text-yellow-400 ${isActive ? 'text-yellow-400' : ''}`
                  }
                >
                  THÔNG TIN
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/blog'
                  className={({ isActive }) =>
                    `block py-2 px-4 text-white hover:text-yellow-400 ${isActive ? 'text-yellow-400' : ''}`
                  }
                >
                  BLOG
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/contact'
                  className={({ isActive }) =>
                    `block py-2 px-4 text-white hover:text-yellow-400 ${isActive ? 'text-yellow-400' : ''}`
                  }
                >
                  LIÊN HỆ
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className='hidden md:block w-[120px]'></div>
        </div>

        {mobileMenuOpen && (
          <div className='md:hidden bg-black border-t border-gray-800'>
            <ul className='py-2'>
              <li>
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    `block py-2 px-4 text-white hover:text-yellow-400 ${isActive ? 'text-yellow-400' : ''}`
                  }
                >
                  TRANG CHỦ
                </NavLink>
              </li>

              {mainCategories.map((category) => (
                <li key={category.id}>
                  <NavLink
                    to={`/category/${category.slug}`}
                    className={({ isActive }) =>
                      `block py-2 px-4 text-white hover:text-yellow-400 ${isActive ? 'text-yellow-400' : ''}`
                    }
                  >
                    {category.name}
                  </NavLink>

                  {subcategories[category.id]?.length > 0 && (
                    <ul className='pl-4 bg-gray-900'>
                      {subcategories[category.id].map((subcategory) => (
                        <li key={subcategory.id}>
                          <NavLink
                            to={`/category/${category.slug}/${subcategory.slug}`}
                            className={({ isActive }) =>
                              `block py-2 px-4 text-gray-300 hover:text-yellow-400 text-sm ${
                                isActive ? 'text-yellow-400' : ''
                              }`
                            }
                          >
                            {subcategory.name} ({subcategory.count ?? 0})
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}

              <li>
                <NavLink
                  to='/info'
                  className={({ isActive }) =>
                    `block py-2 px-4 text-white hover:text-yellow-400 ${isActive ? 'text-yellow-400' : ''}`
                  }
                >
                  THÔNG TIN
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/blog'
                  className={({ isActive }) =>
                    `block py-2 px-4 text-white hover:text-yellow-400 ${isActive ? 'text-yellow-400' : ''}`
                  }
                >
                  BLOG
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/contact'
                  className={({ isActive }) =>
                    `block py-2 px-4 text-white hover:text-yellow-400 ${isActive ? 'text-yellow-400' : ''}`
                  }
                >
                  LIÊN HỆ
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
