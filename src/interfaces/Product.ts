export interface Product {
  id: number
  name: string
  price: number
  oldPrice?: number
  image: string
  category: string
  description: string
  badge?: {
    type: 'sale' | 'new' | 'hot'
    color: string
  }
}

export interface FeaturedProductType extends Product {
  countdown: {
    days: number
    hours: number
    minutes: number
    seconds: number
  }
}

export interface IntroductionType {
  title: string
  content: string
}
