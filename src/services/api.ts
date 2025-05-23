import axios from 'axios'
import type { IntroductionType, Product, Category, Tag } from '../interfaces/Product'
import type { GalleryImage } from '../interfaces/Gallery'
import type { BlogPost } from '../interfaces/BlogPost'
import type { Testimonial } from '../interfaces/Testimonial'
import type { User } from '../interfaces/User'

const API_URL = 'http://localhost:3001'

export const api = {
  getProducts: async (): Promise<Product[]> => {
    const response = await axios.get(`${API_URL}/products`)
    return response.data
  },

  getCategories: async (): Promise<Category[]> => {
    const response = await axios.get(`${API_URL}/categories`)
    return response.data
  },

  getMainCategories: async (): Promise<Category[]> => {
    const categories = await api.getCategories()
    return categories.filter((category) => !category.parentId)
  },

  getSubcategories: async (categoryId: string): Promise<Category[]> => {
    const categories = await api.getCategories()
    return categories.filter((category) => category.parentId === categoryId)
  },

  getCategoryBySlug: async (slug: string): Promise<Category | null> => {
    const categories = await api.getCategories()
    return categories.find((category) => category.slug === slug) || null
  },

  getTags: async (): Promise<Tag[]> => {
    const response = await axios.get(`${API_URL}/tags`)
    return response.data
  },

  getNewProducts: async (limit: number): Promise<Product[]> => {
    const products = await api.getProducts()
    const newProducts = products.filter((product) => product.new)
    return newProducts.slice(0, limit)
  },

  getFeaturedProduct: async (): Promise<Product> => {
    const products = await api.getProducts()
    const featuredProduct = products.find((product) => product.featured) || products[0]
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

  getProductById: async (id: string | number): Promise<Product> => {
    const numericId = typeof id === 'string' ? Number(id) : id
    const response = await axios.get(`${API_URL}/products/${numericId}`)
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

  getProductsByCategory: async (categoryId: string): Promise<Product[]> => {
    const products = await api.getProducts()
    return products.filter((product) => product.categoryId === categoryId)
  },

  getProductsBySubcategory: async (subcategoryId: string): Promise<Product[]> => {
    const products = await api.getProducts()
    return products.filter((product) => product.subcategoryId === subcategoryId)
  },

  getRelatedProducts: async (productId: number, limit = 4): Promise<Product[]> => {
    const products = await api.getProducts()
    const currentProduct = products.find((p) => p.id === productId)

    if (!currentProduct) {
      return products.slice(0, limit)
    }

    const sameSubcategory = products.filter(
      (p) => p.id !== productId && p.subcategoryId === currentProduct.subcategoryId
    )

    if (sameSubcategory.length >= limit) {
      return sameSubcategory.slice(0, limit)
    }

    const sameCategory = products.filter(
      (p) =>
        p.id !== productId &&
        p.categoryId === currentProduct.categoryId &&
        p.subcategoryId !== currentProduct.subcategoryId
    )

    if (sameSubcategory.length + sameCategory.length >= limit) {
      return [...sameSubcategory, ...sameCategory].slice(0, limit)
    }

    const otherProducts = products.filter((p) => p.id !== productId && p.categoryId !== currentProduct.categoryId)

    return [...sameSubcategory, ...sameCategory, ...otherProducts].slice(0, limit)
  },

  getCategoryById: async (categoryId: string): Promise<Category | null> => {
    const categories = await api.getCategories()
    return categories.find((category) => category.id === categoryId) || null
  },
  getUserById: async (userId: string): Promise<User | null> => {
    const response = await axios.get(`${API_URL}/users/${userId}`)
    return response.data
  }
}
