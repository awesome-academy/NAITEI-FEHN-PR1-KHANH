import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import type { Category, Product } from '../interfaces/Product'
import { FaHeart, FaShoppingCart, FaExchangeAlt } from 'react-icons/fa'
import { api } from '../services/api'
import { toast } from 'react-toastify'

export const getBadgeColor = (product: Product) => {
  if (product.new)
    return {
      color: 'bg-green-500',
      text: 'NEW'
    }
  else if (product.featured)
    return {
      color: 'bg-red-500',
      text: 'HOT'
    }
  else if (product.sale)
    return {
      color: 'bg-yellow-500',
      text: 'SALE'
    }
}

const ProductItem = ({ product }: { product: Product }) => {
  const badge = getBadgeColor(product)

  const [category, setCategory] = useState<Category | null>(null)
  useEffect(() => {
    const fetchCategoryNames = async () => {
      if (product.categoryId) {
        try {
          const category = await api.getCategoryById(product.categoryId)
          setCategory(category)
        } catch (error) {
          toast.error('Failed to fetch category names')
        }
      }
    }
    fetchCategoryNames()
  }, [product.categoryId])

  return (
    <div className='bg-white group relative transition duration-300 group-hover:brightness-90 border border-gray-200'>
      {badge && (
        <div className={`absolute top-0 left-0 ${badge.color} text-white p-2 z-10`}>
          <span className='text-xs font-bold uppercase'>{badge.text}</span>
        </div>
      )}
      <div className='p-4'>
        <Link to={`/product/${product.id}`} className='block relative overflow-hidden'>
          <img
            src={product.image}
            alt={product.name}
            className='mx-auto h-64 object-contain transition-transform duration-300 group-hover:scale-105'
          />

          <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none'>
            <div className='flex space-x-2'>
              <button className='btn btn-secondary mx-1 pointer-events-auto'>
                <FaHeart />
              </button>
              <button className='btn btn-secondary mx-1 pointer-events-auto'>
                <FaExchangeAlt />
              </button>
            </div>
          </div>
        </Link>

        <div className='mt-4 text-center'>
          <Link to={`/category/${category?.slug}`} className='text-gray-500 text-xs hover:text-yellow-600'>
            {category?.name}
          </Link>
          <h3 className='mt-1'>
            <Link to={`/product/${product.id}`} className='text-gray-800 font-medium hover:text-yellow-600'>
              {product.name}
            </Link>
          </h3>
          <div className='mt-2 flex justify-center items-center'>
            <span className='text-yellow-600 font-bold'>{product.price.toLocaleString()}₫</span>
            {product.oldPrice && (
              <span className='text-gray-400 line-through ml-2 text-sm'>{product.oldPrice.toLocaleString()}₫</span>
            )}
          </div>
        </div>

        <div className='mt-4'>
          <button className='btn btn-primary w-full'>
            <FaShoppingCart className='mr-2' />
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
