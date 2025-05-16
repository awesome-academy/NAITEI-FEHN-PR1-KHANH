export interface Product {
  id: number
  name: string
  price: number
  oldPrice?: number
  image: string
  category: string
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
