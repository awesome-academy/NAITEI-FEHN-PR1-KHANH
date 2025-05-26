import axios from 'axios'
import type { Cart } from '../interfaces/Cart'
import type { Product } from '../interfaces/Product'
import { api, API_URL } from './api'

export const cartService = {
  async getCartByUserId(userId: string): Promise<Cart | null> {
    const response = await axios.get<Cart[]>(`${API_URL}/cart?userId=${userId}`)
    return response.data.length > 0 ? response.data[0] : null
  },

  async getCartItems(userId: string): Promise<{ product: Product; quantity: number }[]> {
    const cart = await this.getCartByUserId(userId)

    if (!cart?.items || cart.items.length === 0) {
      return []
    }
    const cartItemsWithProducts = await Promise.all(
      cart.items.map(async (item) => {
        const product = await api.getProductById(Number(item.productId))
        return {
          product,
          quantity: item.quantity
        }
      })
    )
    return cartItemsWithProducts
  },

  async updateCartItemQuantity(userId: string, productId: string, quantity: number) {
    const cart = await this.getCartByUserId(userId)

    if (!cart) {
      throw new Error('Giỏ hàng không tồn tại')
    }
    const updatedItems = cart.items.map((item) => (item.productId === productId ? { ...item, quantity } : item))

    await axios.patch(`${API_URL}/cart/${cart.id}`, {
      items: updatedItems
    })
  },

  async removeCartItem(userId: string, productId: string) {
    const cart = await this.getCartByUserId(userId)
    if (!cart) {
      throw new Error('Giỏ hàng không tồn tại')
    }
    const updatedItems = cart.items.filter((item) => item.productId !== productId)

    await axios.patch(`${API_URL}/cart/${cart.id}`, {
      items: updatedItems
    })
  },

  async clearCart(userId: string) {
    const cart = await this.getCartByUserId(userId)

    if (!cart) {
      throw new Error('Giỏ hàng không tồn tại')
    }

    await axios.patch(`${API_URL}/cart/${cart.id}`, {
      items: []
    })
  },

  calculateCartTotal(items: { product: Product; quantity: number }[]): number {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }
}
