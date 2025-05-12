import { FaShoppingCart, FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { type Product } from '../interfaces/Product'
import { api } from '../services/api'

const NewProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true)
        const data = await api.getProducts()
        setProducts(Array.isArray(data) ? data : [])
        setError(null)
      } catch (err) {
        setError('Failed to load products. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    getProducts()
  }, [])

  return (
    <section className='py-16 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-light text-gray-800 uppercase tracking-wider'>SẢN PHẨM MỚI</h2>
          <div className='flex justify-center mt-2'>
            <img src='/src/assets/title-dark.png' alt='Divider' className='h-4' />
          </div>
        </div>

        {loading ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            {[...Array(4)].map((_, index) => (
              <div key={index} className='bg-white p-4 animate-pulse'>
                <div className='h-64 bg-gray-200 mb-4'></div>
                <div className='h-4 bg-gray-200 rounded w-1/2 mx-auto mb-2'></div>
                <div className='h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4'></div>
                <div className='h-4 bg-gray-200 rounded w-1/4 mx-auto mb-4'></div>
                <div className='h-10 bg-gray-200 rounded w-full'></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className='text-center text-red-500'>{error}</div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            {products.map((product) => (
              <div key={product.id} className='bg-white group relative'>
                {product.badge && (
                  <div className={`absolute top-0 left-0 ${product.badge.color} text-white p-2 z-10`}>
                    <span className='text-xs font-bold uppercase'>{product.badge.type}</span>
                  </div>
                )}

                <div className='p-4'>
                  <Link to={`/product/${product.id}`} className='block relative overflow-hidden'>
                    <img
                      src={product.image || '/placeholder.svg'}
                      alt={product.name}
                      className='mx-auto h-64 object-contain transition-transform duration-300 group-hover:scale-105'
                    />

                    <div className='absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                      <button className='btn btn-secondary mx-1'>
                        <FaHeart />
                      </button>
                    </div>
                  </Link>

                  <div className='mt-4 text-center'>
                    <Link to={`/category/${product.category}`} className='text-gray-500 text-xs hover:text-yellow-600'>
                      {product.category}
                    </Link>
                    <h3 className='mt-1'>
                      <Link to={`/product/${product.id}`} className='text-gray-800 font-medium hover:text-yellow-600'>
                        {product.name}
                      </Link>
                    </h3>
                    <div className='mt-2 flex justify-center items-center'>
                      <span className='text-yellow-600 font-bold'>{product.price.toLocaleString()}₫</span>
                      {product.oldPrice && (
                        <span className='text-gray-400 line-through ml-2 text-sm'>
                          {product.oldPrice.toLocaleString()}₫
                        </span>
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
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default NewProducts
