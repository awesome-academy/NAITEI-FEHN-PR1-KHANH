export const ORDER_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  PAID: 'paid',
  PURCHASED: 'purchased',
  ARRIVED: 'arrived',
  COMPLETED: 'completed',
  CANCELED: 'canceled'
}

export const ORDER_STATUS_NAMES = {
  [ORDER_STATUS.CANCELED]: 'Đã hủy',
  [ORDER_STATUS.PENDING]: 'Chưa duyệt',
  [ORDER_STATUS.APPROVED]: 'Đã duyệt',
  [ORDER_STATUS.PAID]: 'Đã thanh toán - chờ mua hàng',
  [ORDER_STATUS.PURCHASED]: 'Đã mua hàng',
  [ORDER_STATUS.ARRIVED]: 'Hàng đã về - chờ giao hàng',
  [ORDER_STATUS.COMPLETED]: 'Đã kết thúc'
}
