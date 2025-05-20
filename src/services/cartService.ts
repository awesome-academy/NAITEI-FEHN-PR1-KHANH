import axios from 'axios'
import type { Cart } from '../interfaces/Cart'
import type { Product } from '../interfaces/Product'
import { api } from './api'

const API_URL = 'http://localhost:3001'

export const cartService = {
  async getCartByUserId(userId: string): Promise<Cart | null> {
    try {
      const response = await axios.get<Cart[]>(`${API_URL}/cart?userId=${userId}`)
      return response.data.length > 0 ? response.data[0] : null
    } catch (error) {
      return null
    }
  },

  async getCartItems(userId: string): Promise<{ product: Product; quantity: number }[]> {
    try {
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
    } catch (error) {
      return []
    }
  },

  async updateCartItemQuantity(userId: string, productId: string, quantity: number): Promise<boolean> {
    try {
      const cart = await this.getCartByUserId(userId)

      if (!cart) {
        return false
      }
      const updatedItems = cart.items.map((item) => (item.productId === productId ? { ...item, quantity } : item))

      await axios.patch(`${API_URL}/cart/${cart.id}`, {
        items: updatedItems
      })
      return true
    } catch (error) {
      return false
    }
  },

  async removeCartItem(userId: string, productId: string): Promise<boolean> {
    try {
      const cart = await this.getCartByUserId(userId)
      if (!cart) {
        return false
      }
      const updatedItems = cart.items.filter((item) => item.productId !== productId)

      await axios.patch(`${API_URL}/cart/${cart.id}`, {
        items: updatedItems
      })

      return true
    } catch (error) {
      return false
    }
  },

  async clearCart(userId: string): Promise<boolean> {
    try {
      const cart = await this.getCartByUserId(userId)

      if (!cart) {
        return false
      }

      await axios.patch(`${API_URL}/cart/${cart.id}`, {
        items: []
      })

      return true
    } catch (error) {
      return false
    }
  },

  calculateCartTotal(items: { product: Product; quantity: number }[]): number {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }
}
