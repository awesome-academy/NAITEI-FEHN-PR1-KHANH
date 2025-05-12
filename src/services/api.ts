import axios from 'axios'
import type { FeaturedProductType, IntroductionType, Product } from '../interfaces/Product'

const API_URL = 'http://localhost:3000'

export const api = {
  getProducts: async (): Promise<Product[]> => {
    const response = await axios.get(`${API_URL}/products`)
    return response.data
  },

  getFeaturedProduct: async (): Promise<FeaturedProductType> => {
    const response = await axios.get(`${API_URL}/featuredProduct`)
    return response.data
  },

  getIntroduction: async (): Promise<IntroductionType> => {
    const response = await axios.get(`${API_URL}/introduction`)
    return response.data
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await axios.get(`${API_URL}/products/${id}`)
    return response.data
  }
}
