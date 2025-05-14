import { FaShoppingCart } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { type FeaturedProductType } from '../../interfaces/Product'
import { api } from '../../services/api'
const FeaturedProduct = () => {
  const [product, setProduct] = useState<FeaturedProductType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true)
        const data = await api.getFeaturedProduct()
        setProduct(data)
        setError(null)
      } catch (err) {
        setError('Failed to load featured product. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    getProduct()
  }, [])

  if (loading) {
    return (
      <section className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='bg-white p-8 max-w-4xl mx-auto'>
            <div className='animate-pulse grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div className='bg-gray-200 h-96'></div>
              <div>
                <div className='h-6 bg-gray-200 rounded w-3/4 mb-4'></div>
                <div className='h-4 bg-gray-200 rounded w-1/2 mb-6'></div>
                <div className='h-4 bg-gray-200 rounded w-full mb-2'></div>
                <div className='h-4 bg-gray-200 rounded w-full mb-2'></div>
                <div className='h-4 bg-gray-200 rounded w-3/4 mb-6'></div>
                <div className='h-10 bg-gray-200 rounded w-1/2'></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4 text-center text-red-500'>{error}</div>
      </section>
    )
  }

  return (
    <section className='py-16 relative'>
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{ backgroundImage: "url('/src/assets/grapes-green.jpg')" }}
      ></div>
      <div className='absolute inset-0 bg-black/30'></div>

      <div className='container mx-auto px-4 relative z-10'>
        <div className='bg-white p-8 max-w-4xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='relative'>
              <div className='absolute top-0 left-0 bg-yellow-500 text-white p-4 z-10 transform -translate-x-2 -translate-y-2'>
                <span className='font-bold'>Sale</span>
              </div>

              <div className='flex justify-center items-center h-full'>
                <img src={product?.image || '/placeholder.svg'} alt={product?.name} className='max-h-96' />
              </div>
            </div>

            <div className='flex flex-col justify-center'>
              <div className='mb-4'>
                <h3 className='text-xl font-medium text-gray-800 uppercase tracking-wider mb-2'>{product?.name}</h3>
                <div className='flex items-center mb-4'>
                  <img src='/src/assets/title-dark.png' alt='Divider' className='h-3' />
                </div>
              </div>

              <div className='mb-6'>
                <span className='text-2xl font-bold text-yellow-600'>
                  {product?.price ? product.price.toLocaleString() + '₫' : 'Price not available'}
                </span>
              </div>

              <p className='text-gray-600 text-sm mb-6'>{product?.description}</p>

              <button className='btn btn-primary w-full'>
                <FaShoppingCart className='mr-2' />
                ADD TO CART
              </button>

              <div className='grid grid-cols-4 gap-2 mt-8'>
                <div className='border border-gray-200 p-2 text-center'>
                  <div className='text-xl font-bold text-yellow-600'>{product?.countdown.days}</div>
                  <div className='text-xs text-gray-500'>NGÀY</div>
                </div>
                <div className='border border-gray-200 p-2 text-center'>
                  <div className='text-xl font-bold text-yellow-600'>{23}</div>
                  <div className='text-xs text-gray-500'>{product?.countdown.hours}</div>
                </div>
                <div className='border border-gray-200 p-2 text-center'>
                  <div className='text-xl font-bold text-yellow-600'>{55}</div>
                  <div className='text-xs text-gray-500'>{product?.countdown.minutes}</div>
                </div>
                <div className='border border-gray-200 p-2 text-center'>
                  <div className='text-xl font-bold text-yellow-600'>{55}</div>
                  <div className='text-xs text-gray-500'>{product?.countdown.seconds}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProduct
