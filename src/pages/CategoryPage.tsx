import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import { api } from '../services/api'
import type { Product } from '../interfaces/Product'
import ProductItem from '../components/ProductItem'
import { CATEGORY_MAP } from '../constants/categories'

const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>()
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)
  const [categoryName, setCategoryName] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const name = CATEGORY_MAP[categorySlug ?? ''] || 'Sản phẩm'
        setCategoryName(name)
        let filteredProducts: Product[] = []
        filteredProducts = await api.getProductsByCategory(name)
        setProducts(filteredProducts)
        setError(null)
      } catch (err) {
        setError('Failed to load products. Please try again later.')
        console.error(err)
      }
    }

    fetchProducts()
  }, [categorySlug])

  return (
    <div className='bg-white'>
      <div className='bg-gray-100 py-4'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center text-sm text-gray-600'>
            <Link to='/' className='hover:text-yellow-600 flex items-center'>
              <FaHome className='mr-1' /> Trang chủ
            </Link>
            <span className='mx-2'>/</span>
            <span className='text-gray-800'>{categoryName}</span>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-light text-gray-800 uppercase tracking-wider text-center'>{categoryName}</h1>
          <div className='flex justify-center mt-2'>
            <img src='/src/assets/title-dark.png' alt='Divider' className='h-4' />
          </div>
        </div>

        { error ? (
          <div className='text-center text-red-500'>{error}</div>
        ) : products.length === 0 ? (
          <div className='text-center py-8'>
            <p className='text-gray-600'>Không có sản phẩm nào trong danh mục này.</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryPage
