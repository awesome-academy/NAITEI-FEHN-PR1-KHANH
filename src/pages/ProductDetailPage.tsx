import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaHome, FaHeart, FaExchangeAlt, FaEnvelope, FaMinus, FaPlus, FaStar, FaRegStar } from 'react-icons/fa'
import { api } from '../services/api'
import type { Product, Category } from '../interfaces/Product'
import ProductItem from '../components/ProductItem'

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [category, setCategory] = useState<Category | null>(null)
  const [subcategory, setSubcategory] = useState<Category | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('features')
  const [selectedColor, setSelectedColor] = useState('gold')

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!productId) throw new Error('Product ID is required')
        const id = Number.parseInt(productId)
        const productData = await api.getProductById(id)
        setProduct(productData)

        if (productData.categoryId) {
          const categories = await api.getCategories()
          const cat = categories.find((c) => c.id === productData.categoryId) || null
          setCategory(cat)

          if (productData.subcategoryId) {
            const subcat = categories.find((c) => c.id === productData.subcategoryId) || null
            setSubcategory(subcat)
          }
        }

        const relatedData = await api.getRelatedProducts(id, 4)
        setRelatedProducts(relatedData)
        setError(null)
      } catch (err) {
        setError('Failed to load product. Please try again later.')
        console.error(err)
      }
    }

    fetchData()
  }, [productId])

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  if (error || !product) {
    return <div className='container mx-auto px-4 py-8 text-center text-red-500'>{error ?? 'Product not found'}</div>
  }

  return (
    <div className='bg-white'>
      <div className='bg-gray-100 py-4'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center text-sm text-gray-600'>
            <Link to='/' className='hover:text-yellow-600 flex items-center'>
              <FaHome className='mr-1' /> Trang chủ
            </Link>
            {category && (
              <>
                <span className='mx-2'>/</span>
                <Link to={`/category/${category.slug}`} className='hover:text-yellow-600'>
                  {category.name}
                </Link>
              </>
            )}
            {subcategory && (
              <>
                <span className='mx-2'>/</span>
                <Link to={`/category/${category?.slug}/${subcategory.slug}`} className='hover:text-yellow-600'>
                  {subcategory.name}
                </Link>
              </>
            )}
            <span className='mx-2'>/</span>
            <span className='text-gray-800'>{product.name}</span>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div>
            <div className='border border-gray-200 p-4 mb-4 max-h-[700px] flex items-center justify-center'>
              <img src={product.image} alt={product.name} className='max-h-full w-auto object-contain' />
            </div>
          </div>

          <div>
            <h1 className='text-3xl font-light text-gray-800 uppercase mb-2'>{product.name}</h1>
            <div className='flex items-center mb-4'>
              <div className='flex'>
                {[...Array(5)].map((_, index) =>
                  index < 4 ? (
                    <FaStar key={index} className='w-4 h-4 text-yellow-500' />
                  ) : (
                    <FaRegStar key={index} className='w-4 h-4 text-gray-300' />
                  )
                )}
              </div>
              <span className='text-xs text-gray-500 ml-2'>
                {product.reviews ? `${product.reviews.length} Review(s)` : '0 Reviews'}
              </span>
              <span className='mx-2 text-gray-300'>|</span>
              <button className='text-xs text-gray-500 hover:text-yellow-600'>Add Your Review</button>
            </div>

            <div className='text-2xl font-bold text-yellow-600 mb-6'>{product.price.toLocaleString()}₫</div>

            <div className='mb-6'>
              <p className='text-gray-600 text-base'>{product.description}</p>
            </div>

            <div className='mb-6'>
              <h3 className='text-base font-medium text-gray-700 uppercase mb-2'>MÀU SẮC</h3>
              <div className='flex space-x-2'>
                <button
                  onClick={() => setSelectedColor('gold')}
                  className={`w-8 h-8 bg-yellow-500 ${selectedColor === 'gold' ? 'ring-2 ring-offset-2 ring-yellow-500' : ''}`}
                  aria-label='Gold color'
                ></button>
                <button
                  onClick={() => setSelectedColor('black')}
                  className={`w-8 h-8 bg-black ${selectedColor === 'black' ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                  aria-label='Black color'
                ></button>
                <button
                  onClick={() => setSelectedColor('red')}
                  className={`w-8 h-8 bg-red-700 ${selectedColor === 'red' ? 'ring-2 ring-offset-2 ring-red-700' : ''}`}
                  aria-label='Red color'
                ></button>
              </div>
            </div>

            <div className='mb-6'>
              <h3 className='text-base font-medium text-gray-700 uppercase mb-2'>KÍCH CỠ</h3>
              <div className='relative'>
                <select className='block w-full bg-white border border-gray-300 py-2 px-3 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent'>
                  <option>Loại to</option>
                  <option>Loại vừa</option>
                  <option>Loại nhỏ</option>
                </select>
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                  <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                    <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                  </svg>
                </div>
              </div>
            </div>

            <div className='mb-6'>
              <h3 className='text-base font-medium text-gray-700 uppercase mb-2'>SỐ LƯỢNG</h3>
              <div className='flex'>
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className='bg-gray-200 px-3 py-2 text-gray-600 hover:bg-gray-300'
                >
                  <FaMinus size={12} />
                </button>
                <input
                  type='text'
                  value={quantity}
                  readOnly
                  className='w-16 border-t border-b border-gray-300 text-center'
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  className='bg-gray-200 px-3 py-2 text-gray-600 hover:bg-gray-300'
                >
                  <FaPlus size={12} />
                </button>
                <button className='ml-4 bg-black text-white px-6 py-2 uppercase font-bold text-base hover:bg-yellow-600 transition-colors'>
                  ADD TO CART
                </button>
              </div>
            </div>

            <div className='flex space-x-4 mb-8'>
              <button className='flex items-center text-gray-600 hover:text-yellow-600'>
                <FaHeart className='mr-2' size={14} /> Yêu thích
              </button>
              <button className='flex items-center text-gray-600 hover:text-yellow-600'>
                <FaExchangeAlt className='mr-2' size={14} /> So sánh
              </button>
              <button className='flex items-center text-gray-600 hover:text-yellow-600'>
                <FaEnvelope className='mr-2' size={14} /> Email
              </button>
            </div>

            <div className='mb-6'>
              <h3 className='text-sm font-medium text-gray-700 uppercase mb-2'>MÔ TẢ</h3>
              <p className='text-gray-600 text-base'>{product.description}</p>
            </div>
          </div>
        </div>

        <div className='mt-12'>
          <div className='border-b border-gray-200'>
            <nav className='flex -mb-px'>
              <button
                onClick={() => setActiveTab('features')}
                className={`py-4 px-6 text-base font-medium ${
                  activeTab === 'features'
                    ? 'border-b-2 border-yellow-500 text-yellow-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                ĐẶC ĐIỂM NỔI BẬT
              </button>
              <button
                onClick={() => setActiveTab('info')}
                className={`py-4 px-6 text-base font-medium ${
                  activeTab === 'info'
                    ? 'border-b-2 border-yellow-500 text-yellow-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                THÔNG TIN SẢN PHẨM
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-6 text-base font-medium ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-yellow-500 text-yellow-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                ĐÁNH GIÁ
              </button>
            </nav>
          </div>
          <div className='py-6'>
            {activeTab === 'features' && (
              <div className='text-base text-gray-600 whitespace-pre-line'>
                {product.features ?? 'Không có thông tin đặc điểm nổi bật cho sản phẩm này.'}
              </div>
            )}
            {activeTab === 'info' && (
              <div className='text-base text-gray-600 whitespace-pre-line'>
                {product.information ?? 'Không có thông tin chi tiết cho sản phẩm này.'}
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className='text-base text-gray-600'>
                <div className='mb-6'>
                  <h3 className='font-medium text-gray-800 mb-2'>Customer Reviews</h3>
                  <div className='flex items-center mb-2'>
                    <div className='flex'>
                      {[...Array(5)].map((_, index) => {
                        const avgRating =
                          product.reviews && product.reviews.length > 0
                            ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
                            : 0

                        return index < Math.round(avgRating) ? (
                          <FaStar key={index} className='w-4 h-4 text-yellow-500' />
                        ) : (
                          <FaRegStar key={index} className='w-4 h-4 text-gray-300' />
                        )
                      })}
                    </div>
                    <span className='text-xs text-gray-500 ml-2'>
                      Based on {product.reviews ? product.reviews.length : 0} review(s)
                    </span>
                  </div>
                </div>

                {product.reviews && product.reviews.length > 0 ? (
                  <div className='border-t border-gray-200 pt-6'>
                    {product.reviews.map((review) => (
                      <div key={review.id} className='mb-6'>
                        <h4 className='font-medium text-gray-800'>{review.name}</h4>
                        <div className='flex items-center mb-1'>
                          <div className='flex'>
                            {[...Array(5)].map((_, index) =>
                              index < review.rating ? (
                                <FaStar key={index} className='w-4 h-4 text-yellow-500' />
                              ) : (
                                <FaRegStar key={index} className='w-4 h-4 text-gray-300' />
                              )
                            )}
                          </div>
                          <span className='text-xs text-gray-500 ml-2'>{review.date}</span>
                        </div>
                        <p className='text-gray-600'>{review.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Chưa có đánh giá nào cho sản phẩm này.</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className='mt-16'>
          <div className='text-center mb-8'>
            <h2 className='text-3xl font-light text-gray-800 uppercase tracking-wider'>SẢN PHẨM LIÊN QUAN</h2>
            <div className='flex justify-center mt-2'>
              <img src='/src/assets/title-dark.png' alt='Divider' className='h-4' />
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            {relatedProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
