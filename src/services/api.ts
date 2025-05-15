import axios from 'axios'
import type { IntroductionType, Product } from '../interfaces/Product'
import type { GalleryImage } from '../interfaces/Gallery'
import type { BlogPost } from '../interfaces/BlogPost'
import type { Testimonial } from '../interfaces/Testimonial'

const API_URL = 'http://localhost:3001'

export const api = {
  getProducts: async (): Promise<Product[]> => {
    const response = await axios.get(`${API_URL}/products`)
    return response.data
  },
  getNewProducts: async (limit: number): Promise<Product[]> => {
    const products = await api.getProducts()
    const newProducts = products.filter((product) => product.new)
    return newProducts.slice(0, limit)
  },

  getFeaturedProduct: async (): Promise<Product> => {
    const products = await api.getProducts()
    let featuredProduct = products.find((product) => product.featured) || products[0]
    return featuredProduct
  },

  getBestSellingProducts: async (limit: number): Promise<Product[]> => {
    const products = await api.getProducts()
    const bestSellingProducts = products.filter((product) => product.bestSelling)
    return bestSellingProducts.length > 0 ? bestSellingProducts : products.slice(0, limit)
  },

  getIntroduction: async (): Promise<IntroductionType> => {
    const response = await axios.get(`${API_URL}/introduction`)
    return response.data
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await axios.get(`${API_URL}/products/${id}`)
    return response.data
  },

  getGalleryImages: async (): Promise<GalleryImage[]> => {
    const response = await axios.get(`${API_URL}/galleryImages`)
    return response.data
  },

  getBlogPosts: async (): Promise<BlogPost[]> => {
    const response = await axios.get(`${API_URL}/blogPosts`)
    return response.data
  },

  getTestimonials: async (): Promise<Testimonial[]> => {
    const response = await axios.get(`${API_URL}/testimonials`)
    return response.data
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const products = await api.getProducts()
    return products.filter((product) => product.category.toLowerCase().includes(category.toLowerCase()))
  },

  getRelatedProducts: async (productId: number, limit = 4): Promise<Product[]> => {
    const products = await api.getProducts()
    const currentProduct = products.find((p) => p.id === productId)

    if (!currentProduct) {
      return products.slice(0, limit)
    }

    const sameCategory = products.filter((p) => p.id !== productId && p.category === currentProduct.category)

    if (sameCategory.length >= limit) {
      return sameCategory.slice(0, limit)
    }

    const otherProducts = products.filter((p) => p.id !== productId && p.category !== currentProduct.category)

    return [...sameCategory, ...otherProducts].slice(0, limit)
  }
}
