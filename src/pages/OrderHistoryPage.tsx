import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { orderService } from '../services/orderService'
import type { Order, OrderStatus, OrderStatusCount } from '../interfaces/Order'
import { FaPhone, FaUser } from 'react-icons/fa'
import { GiPositionMarker } from 'react-icons/gi'
import { toast } from 'react-toastify'
import { ORDER_STATUS_NAMES } from '../constants/order'
import type { User } from '../interfaces/User'
import { api } from '../services/api'

const OrderHistoryPage = () => {
  const { currentUser, isAuthenticated } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [statusCounts, setStatusCounts] = useState<OrderStatusCount>()
  const [activeStatus, setActiveStatus] = useState<OrderStatus | 'all'>('all')

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated || !currentUser?.id) {
        setOrders([])
        return
      }
      try {
        const allOrders = await orderService.getOrdersByUserId(String(currentUser.id))
        const counts = await orderService.getOrderStatusCounts(String(currentUser.id))
        const user = await api.getUserById(String(currentUser.id))
        setUser(user)
        setOrders(allOrders)
        setStatusCounts(counts)
      } catch (error) {
        toast.error('Có lỗi xảy ra khi tải đơn hàng.')
      }
    }

    fetchOrders()
  }, [currentUser, isAuthenticated])

  const filteredOrders = activeStatus === 'all' ? orders : orders.filter((order) => order.status === activeStatus)

  const getStatusText = (status: OrderStatus): string => {
    const statusName = ORDER_STATUS_NAMES[status]
    if (statusName) {
      return statusName
    } else {
      return 'Không xác định'
    }
  }

  if (!isAuthenticated) {
    return (
      <div className='bg-white'>
        <div className='container mx-auto px-4 py-8'>
          <div className='text-center py-16'>
            <h1 className='text-2xl font-medium mb-6'>Vui lòng đăng nhập để xem lịch sử đơn hàng</h1>
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
          <span className='text-yellow-600'>Danh sách đơn hàng</span>
        </div>

        <div className='mb-8'>
          <h1 className='text-3xl font-light text-gray-800 uppercase'>ĐƠN HÀNG</h1>
          <div className='w-24 h-0.5 bg-gray-300 mt-2 relative flex items-center'>
            <div className='ml-auto flex items-center h-4'>
              <div className='w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-gray-300 border-b-[6px] border-b-transparent'></div>
            </div>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row gap-8'>
          <div className='w-full lg:w-3/4'>
            <div className='border border-gray-200 p-6'>
              <h2 className='text-xl font-medium text-gray-800 uppercase mb-4'>DANH SÁCH ĐƠN HÀNG</h2>

              <div className='flex flex-wrap text-sm text-gray-600 mb-6 border-b border-gray-200 pb-2'>
                <button
                  onClick={() => setActiveStatus('all')}
                  className={`mr-4 hover:text-yellow-600 ${activeStatus === 'all' ? 'text-yellow-600' : ''}`}
                >
                  Tất cả ({statusCounts?.all ?? 0}) |
                </button>
                {Object.entries(ORDER_STATUS_NAMES).map((status) => {
                  return (
                    <button
                      key={status[0]}
                      onClick={() => setActiveStatus(status[0] as OrderStatus)}
                      className={`mr-4 hover:text-yellow-600 ${activeStatus === status[0] ? 'text-yellow-600' : ''}`}
                    >
                      {ORDER_STATUS_NAMES[status[0]]} ({statusCounts?.[status[0] as OrderStatus] ?? 0})|
                    </button>
                  )
                })}
              </div>

              {
                <div className='overflow-x-auto'>
                  <table className='w-full border-collapse'>
                    <thead>
                      <tr className='bg-gray-50'>
                        <th className='border border-gray-200 p-3 text-center'>STT</th>
                        <th className='border border-gray-200 p-3 text-center'>MÃ HÓA ĐƠN/NGÀY MUA HÀNG</th>
                        <th className='border border-gray-200 p-3 text-center'>KHO NHẬN HÀNG</th>
                        <th className='border border-gray-200 p-3 text-center'>SỐ SP</th>
                        <th className='border border-gray-200 p-3 text-center'>TỔNG TIỀN</th>
                        <th className='border border-gray-200 p-3 text-center'>TÌNH TRẠNG</th>
                        <th className='border border-gray-200 p-3 text-center'>THAO TÁC</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order, index) => (
                        <tr key={order.id}>
                          <td className='border border-gray-200 p-3 text-center'>{index + 1}</td>
                          <td className='border border-gray-200 p-3'>
                            <div className='font-medium'>
                              {order.orderNumber} - {order.orderDate}
                            </div>
                            <div className='text-sm text-gray-500'>01:36 {order.createdDate}</div>
                          </td>
                          <td className='border border-gray-200 p-3 text-center'>{order.warehouse}</td>
                          <td className='border border-gray-200 p-3 text-center'>{order.totalItems}</td>
                          <td className='border border-gray-200 p-3 text-center'>
                            {order.totalAmount.toLocaleString()}đ
                          </td>
                          <td className='border border-gray-200 p-3 text-center'>{getStatusText(order.status)}</td>
                          <td className='border border-gray-200 p-3 text-center'>
                            <Link to='' className='text-yellow-600 hover:underline'>
                              Chi tiết
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              }
            </div>
          </div>

          <div className='w-full lg:w-1/4'>
            <div className='border border-gray-200 p-6'>
              <h2 className='text-xl font-medium text-gray-800 uppercase mb-4'>THÔNG TIN KHÁCH HÀNG</h2>

              <div className='space-y-4'>
                <div className='flex items-start'>
                  <div className='text-gray-800 mr-2'>
                    <FaUser className='mt-1' />
                  </div>
                  <div>
                    <div className='font-medium'>
                      {user?.firstName} {user?.lastName}
                    </div>
                    <div className='text-sm text-gray-500'>{user?.email}</div>
                  </div>
                </div>

                <div className='flex items-start'>
                  <div className='text-gray-800 mr-2'>
                    <GiPositionMarker className='mt-1' />
                  </div>
                  <div>
                    <div className='text-sm'>Tòa nhà Hà Nội group</div>
                    <div className='text-sm'>442 Đội Cấn, Ba Đình Hà Nội</div>
                  </div>
                </div>

                <div className='flex items-start'>
                  <div className='text-gray-800 mr-2'>
                    <FaPhone className='mt-1' />
                  </div>
                  <div className='text-sm'>(04) 3786 8904</div>
                </div>
              </div>

              <div className='mt-6'>
                <Link to='' className='text-yellow-600 hover:underline'>
                  Chi tiết địa chỉ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderHistoryPage
