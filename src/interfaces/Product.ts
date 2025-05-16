export interface Product {
  id: number
  name: string
  price: number
  oldPrice?: number
  image: string
  categoryId: string
  subcategoryId?: string
  description: string
  featured?: boolean
  bestSelling?: boolean
  new?: boolean
  sale?: boolean
  countdown?: {
    days: number
    hours: number
    minutes: number
    seconds: number
  }
  features?: string
  information?: string
  reviews?: ProductReview[]
  tags?: string[]
}

export interface ProductReview {
  id: number
  name: string
  rating: number
  date: string
  content: string
}

export interface IntroductionType {
  title: string
  content: string
}

export interface Category {
  id: string
  name: string
  slug: string
  parentId?: string
  count?: number
}

export interface Tag {
  id: string
  name: string
  slug: string
  count: number
}
