
export interface Order {
  id: string
  userId: string
  orderNumber: string
  orderDate: string
  createdDate: string
  warehouse: string
  totalItems: number
  totalAmount: number
  status: OrderStatus
}

export type OrderStatus = 'pending' | 'approved' | 'paid' | 'purchased' | 'arrived' | 'completed' | 'canceled'

export interface OrderStatusCount {
  all: number
  pending: number
  approved: number
  paid: number
  purchased: number
  arrived: number
  completed: number
  canceled: number
}
