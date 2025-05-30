import { Link } from 'react-router-dom'
import type { Category, Product } from '../interfaces/Product'
import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { FaExchangeAlt, FaHeart, FaShoppingCart } from 'react-icons/fa'
import { getBadgeColor } from './ProductItem'
import { toast } from 'react-toastify'

const ProductColumnItem = ({ product }: { product: Product }) => {
  const badge = getBadgeColor(product)
  const [category, setCategory] = useState<Category | null>(null)
  useEffect(() => {
    const fetchCategoryNames = async () => {
      if (product.categoryId) {
        try {
          const category = await api.getCategoryById(product.categoryId)
          setCategory(category)
        } catch (error) {
          toast.error('Xảy ra lỗi khi tải danh mục sản phẩm. Vui lòng thử lại sau.')
        }
      }
    }
    fetchCategoryNames()
  }, [product.categoryId])
  return (
    <div key={product.id} className='flex border border-gray-200 p-4'>
      <div className='w-1/3 relative'>
        <Link to={`/product/${product.id}`} className='block'>
          <img src={product.image} alt={product.name} className='w-full h-48 object-contain' />
          {badge && (
            <span
              className={`absolute !top-0 !left-0 m-0 px-3 py-2 text-xs font-semibold rounded-none ${badge.color} text-white z-10`}
            >
              {badge.text}
            </span>
          )}
        </Link>
      </div>
      <div className='w-2/3 pl-6'>
        <Link to={`/category/${category?.slug}`} className='text-gray-500 text-xs hover:text-yellow-600'>
          {category?.name}
        </Link>
        <h3 className='mt-1 mb-2'>
          <Link to={`/product/${product.id}`} className='text-gray-800 font-medium hover:text-yellow-600 text-lg'>
            {product.name}
          </Link>
        </h3>
        <div className='mb-3 flex items-center'>
          <span className='text-yellow-600 font-bold text-lg'>{product.price.toLocaleString()}₫</span>
          {product.oldPrice && (
            <span className='text-gray-400 line-through ml-2'>{product.oldPrice.toLocaleString()}₫</span>
          )}
        </div>
        <p className='text-gray-600 text-sm mb-4 line-clamp-3'>{product.description}</p>
        <div className='flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0'>
          <button className='btn btn-primary flex items-center justify-center'>
            <FaShoppingCart className='mr-2' />
            <span>ADD TO CART</span>
          </button>
          <button className='btn btn-secondary flex items-center justify-center'>
            <FaHeart className='mr-2' />
            <span>YÊU THÍCH</span>
          </button>
          <button className='btn btn-secondary flex items-center justify-center'>
            <FaExchangeAlt className='mr-2' />
            <span>SO SÁNH</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductColumnItem
