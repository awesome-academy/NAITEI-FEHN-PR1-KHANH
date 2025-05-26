import axios from 'axios'
import type { Order, OrderStatusCount } from '../interfaces/Order'
import { ORDER_STATUS } from '../constants/order'
import { API_URL } from './api'

export const orderService = {
  async getOrdersByUserId(userId: string): Promise<Order[]> {
    const response = await axios.get<Order[]>(`${API_URL}/orders?userId=${userId}`)
    return response.data
  },

  async getOrderById(orderId: string): Promise<Order | null> {
    const response = await axios.get<Order>(`${API_URL}/orders/${orderId}`)
    return response.data
  },

  async getOrderStatusCounts(userId: string): Promise<OrderStatusCount> {
    const orders = await this.getOrdersByUserId(userId)

    const counts: OrderStatusCount = {
      all: orders.length,
      pending: orders.filter((order) => order.status === ORDER_STATUS.PENDING).length,
      approved: orders.filter((order) => order.status === ORDER_STATUS.APPROVED).length,
      paid: orders.filter((order) => order.status === ORDER_STATUS.PAID).length,
      purchased: orders.filter((order) => order.status === ORDER_STATUS.PURCHASED).length,
      arrived: orders.filter((order) => order.status === ORDER_STATUS.ARRIVED).length,
      completed: orders.filter((order) => order.status === ORDER_STATUS.COMPLETED).length,
      canceled: orders.filter((order) => order.status === ORDER_STATUS.CANCELED).length
    }

    return counts
  }
}
