import { useEffect, useState } from 'react'
import { type Product } from '../../interfaces/Product'
import { api } from '../../services/api'
import ProductItem from '../../components/ProductItem'

const BestSellingProduct = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true)
        const data = await api.getBestSellingProducts()
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
          <h2 className='text-3xl font-light text-gray-800 uppercase tracking-wider'>SẢN PHẨM BÁN CHẠY </h2>
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
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default BestSellingProduct
