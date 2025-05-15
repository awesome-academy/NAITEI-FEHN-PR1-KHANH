import { useEffect, useState } from 'react'
import type { Product } from '../../interfaces/Product'
import { api } from '../../services/api'
import ProductItem from '../../components/ProductItem'

const BestSellingProduct = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await api.getBestSellingProducts(4)
        setProducts(Array.isArray(data) ? data : [])
        setError(null)
      } catch (err) {
        setError('Failed to load products. Please try again later.')
        console.error(err)
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

        {error ? (
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
