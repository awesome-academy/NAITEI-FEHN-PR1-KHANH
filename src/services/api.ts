import axios from 'axios'
import type { FeaturedProductType, IntroductionType, Product } from '../interfaces/Product'
import type { GalleryImage } from '../interfaces/Gallery'
import type { BlogPost } from '../interfaces/BlogPost'
import type { Testimonial } from '../interfaces/Testimonial'

const API_URL = 'http://localhost:3001'

export const api = {
  getProducts: async (): Promise<Product[]> => {
    const response = await axios.get(`${API_URL}/products`)
    return response.data
  },

  getFeaturedProduct: async (): Promise<FeaturedProductType> => {
    const response = await axios.get(`${API_URL}/featuredProduct`)
    return response.data
  },
  getBestSellingProducts: async (): Promise<Product[]> => {
    const response = await axios.get(`${API_URL}/bestSellingProducts`)
    return response.data
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
  }
}
