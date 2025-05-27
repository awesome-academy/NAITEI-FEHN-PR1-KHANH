import type React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'
import { cartService } from '../services/cartService'
import type { Product } from '../interfaces/Product'
import { toast } from 'react-toastify'
import PageTitle from '../components/ui/PageTitle'

interface CartItemWithProduct {
  product: Product
  quantity: number
}

const CartPage = () => {
  const { currentUser, isAuthenticated } = useAuth()
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([])

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!isAuthenticated || !currentUser?.id) {
        setCartItems([])
        return
      }

      try {
        const items = await cartService.getCartItems(String(currentUser.id))
        setCartItems(items)
      } catch (error) {
        toast.error('Không thể tải giỏ hàng. Vui lòng thử lại sau.')
      }
    }

    fetchCartItems()
  }, [currentUser, isAuthenticated])

  const handleRemoveItem = async (productId: string) => {
    if (!currentUser?.id) return
    try {
      await cartService.removeCartItem(String(currentUser.id), productId)
      setCartItems((prevItems) => prevItems.filter((item) => Number(item.product.id) !== Number(productId)))
    } catch (error) {
      toast.error('Không thể xóa sản phẩm. Vui lòng thử lại sau.')
    }
  }

  const handleClearCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!currentUser?.id) return

    try {
      await cartService.clearCart(String(currentUser.id))
      setCartItems([])
      toast.success('Đã xóa tất cả sản phẩm khỏi giỏ hàng')
    } catch (error) {
      toast.error('Không thể xóa giỏ hàng. Vui lòng thử lại sau.')
    }
  }

  const handleUpdateCart = (e: React.MouseEvent) => {
    e.preventDefault()
    toast.success('Giỏ hàng đã được cập nhật')
  }

  if (!isAuthenticated) {
    return (
      <div className='bg-white'>
        <div className='container mx-auto px-4 py-8'>
          <div className='flex items-center text-sm text-gray-600 mb-4'>
            <Link to='/' className='hover:text-yellow-600'>
              Trang chủ
            </Link>
            <span className='mx-2'>/</span>
            <span className='text-gray-800'>Sản phẩm</span>
            <span className='mx-2'>/</span>
            <span className='text-yellow-600'>Giỏ hàng</span>
          </div>

          <div className='text-center py-16'>
            <h1 className='text-2xl font-medium mb-6'>Vui lòng đăng nhập để xem giỏ hàng</h1>
            <Link
              to='/login'
              className='inline-block bg-black text-white px-6 py-3 font-bold hover:bg-yellow-600 transition-colors'
            >
              ĐĂNG NHẬP
            </Link>
          </div>
        </div>
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
          <span className='text-gray-800'>Sản phẩm</span>
          <span className='mx-2'>/</span>
          <span className='text-yellow-600'>Giỏ hàng</span>
        </div>

        <div className='mb-8'>
          <PageTitle title='Giỏ hàng' />
        </div>

        {cartItems.length === 0 ? (
          <div className='text-center py-8'>
            <p className='text-gray-600 mb-6'>Giỏ hàng của bạn đang trống.</p>
            <Link
              to='/'
              className='inline-block bg-black text-white px-6 py-3 font-bold hover:bg-yellow-600 transition-colors'
            >
              TIẾP TỤC MUA SẮM
            </Link>
          </div>
        ) : (
          <>
            <div className='overflow-x-auto'>
              <table className='w-full border-collapse'>
                <thead>
                  <tr>
                    <th className='border border-gray-200 p-3 text-center bg-gray-50'>ẢNH</th>
                    <th className='border border-gray-200 p-3 text-center bg-gray-50'>TÊN SẢN PHẨM</th>
                    <th className='border border-gray-200 p-3 text-center bg-gray-50'>GIÁ</th>
                    <th className='border border-gray-200 p-3 text-center bg-gray-50'>SỐ LƯỢNG</th>
                    <th className='border border-gray-200 p-3 text-center bg-gray-50'>TỔNG SỐ</th>
                    <th className='border border-gray-200 p-3 text-center bg-gray-50'>XÓA</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.product.id}>
                      <td className='border border-gray-200 p-3 text-center'>
                        <Link to={`/product/${item.product.id}`}>
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className='w-20 h-20 object-contain mx-auto'
                          />
                        </Link>
                      </td>
                      <td className='border border-gray-200 p-3 text-center'>
                        <Link to={`/product/${item.product.id}`} className='text-gray-800 hover:text-yellow-600'>
                          {item.product.name}
                        </Link>
                      </td>
                      <td className='border border-gray-200 p-3 text-center text-yellow-600'>
                        {item.product.price.toLocaleString()}₫
                      </td>
                      <td className='border border-gray-200 p-3 text-center'>{item.quantity}</td>
                      <td className='border border-gray-200 p-3 text-center text-yellow-600'>
                        {(item.product.price * item.quantity).toLocaleString()}₫
                      </td>
                      <td className='border border-gray-200 p-3 text-center'>
                        <button
                          type='button'
                          onClick={() => handleRemoveItem(String(item.product.id))}
                          className='text-gray-500 hover:text-red-500'
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='mt-8 flex justify-end'>
              <div className='flex space-x-2'>
                <Link to='/' className='bg-black text-white px-4 py-2 font-bold hover:bg-gray-800 transition-colors'>
                  TIẾP TỤC MUA HÀNG
                </Link>
                <button
                  type='button'
                  onClick={(e) => handleClearCart(e)}
                  className='bg-black text-white px-4 py-2 font-bold hover:bg-gray-800 transition-colors'
                >
                  XÓA
                </button>
                <button
                  type='button'
                  onClick={(e) => handleUpdateCart(e)}
                  className='bg-black text-white px-4 py-2 font-bold hover:bg-gray-800 transition-colors'
                >
                  CẬP NHẬT
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CartPage
