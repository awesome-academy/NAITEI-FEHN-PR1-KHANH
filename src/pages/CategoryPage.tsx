import { useEffect, useState } from 'react'
import { useParams, Link, useSearchParams, useNavigate } from 'react-router-dom'
import { FaHome, FaThLarge, FaList, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { api } from '../services/api'
import type { Product, Category, Tag } from '../interfaces/Product'
import ProductItem from '../components/ProductItem'
import ProductColumnItem from '../components/ProductColumnItem'

const PRODUCTS_PER_PAGE = 3

const CategoryPage = () => {
  const { categorySlug, subcategorySlug } = useParams<{
    categorySlug: string
    subcategorySlug: string
  }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const currentPage = Number.parseInt(searchParams.get('page') ?? '1', 10)

  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [category, setCategory] = useState<Category | null>(null)
  const [subcategories, setSubcategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allTags = await api.getTags()
        setTags(allTags)

        const currentCategory = await api.getCategoryBySlug(categorySlug ?? '')
        setCategory(currentCategory)

        if (currentCategory) {
          const subs = await api.getSubcategories(currentCategory.id)
          setSubcategories(subs)
          let fetchedProducts: Product[] = []
          if (subcategorySlug) {
            const subcat = await api.getCategoryBySlug(subcategorySlug)
            if (subcat) {
              fetchedProducts = await api.getProductsBySubcategory(subcat.id)
            } else {
              setError('Subcategory not found')
            }
          } else {
            fetchedProducts = await api.getProductsByCategory(currentCategory.id)
          }

          setAllProducts(fetchedProducts)
          setTotalPages(Math.ceil(fetchedProducts.length / PRODUCTS_PER_PAGE))
        } else {
          setError('Category not found')
        }
      } catch (err) {
        setError('Failed to load products. Please try again later.')
      }
    }

    fetchData()
  }, [categorySlug, subcategorySlug])

  useEffect(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
    const endIndex = startIndex + PRODUCTS_PER_PAGE
    setProducts(allProducts.slice(startIndex, endIndex))
  }, [currentPage, allProducts])

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return

    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    navigate(`?${params.toString()}`)
  }

  const renderPagination = () => {
    if (totalPages <= 1) return null

    return (
      <div className='mt-8 flex justify-center'>
        <div className='flex space-x-1'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 flex items-center ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
            aria-label='Previous page'
          >
            <FaChevronLeft className='w-3 h-3' />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 ${currentPage === page ? 'bg-yellow-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 flex items-center ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
            aria-label='Next page'
          >
            <FaChevronRight className='w-3 h-3' />
          </button>
        </div>
      </div>
    )
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
                <Link to={`/category/${categorySlug}`} className='hover:text-yellow-600'>
                  {category.name}
                </Link>
              </>
            )}
            {subcategorySlug && category && (
              <>
                <span className='mx-2'>/</span>
                <span className='text-gray-800'>
                  {subcategories.find((sub) => sub.slug === subcategorySlug)?.name ?? subcategorySlug}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='w-full md:w-1/4'>
            <div className='mb-8'>
              <h3 className='text-lg font-medium text-gray-800 uppercase mb-4 border-b border-gray-200 pb-2'>
                DANH MỤC SẢN PHẨM
              </h3>
              <ul className='space-y-2'>
                {subcategories.map((subcategory) => (
                  <li key={subcategory.id} className='mb-2'>
                    <Link
                      to={`/category/${categorySlug}/${subcategory.slug}`}
                      className={`block text-gray-700 hover:text-yellow-600 ${
                        subcategorySlug === subcategory.slug ? 'font-medium text-yellow-600' : ''
                      }`}
                    >
                      {subcategory.name} ({subcategory.count ?? 0})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className='mb-8'>
              <h3 className='text-lg font-medium text-gray-800 uppercase mb-4 border-b border-gray-200 pb-2'>
                SO SÁNH SẢN PHẨM
              </h3>
              <p className='text-gray-600 text-sm'>Bạn chưa có sản phẩm nào để so sánh</p>
            </div>

            <div className='mb-8'>
              <h3 className='text-lg font-medium text-gray-800 uppercase mb-4 border-b border-gray-200 pb-2'>
                TAG SẢN PHẨM
              </h3>
              <div className='flex flex-wrap gap-2'>
                {tags.map((tag) => (
                  <Link
                    key={tag.id}
                    to={`/tag/${tag.slug}`}
                    className='bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs py-1 px-2 rounded'
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className='mb-8'>
              <img src='/src/assets/gallery/wine-barrel.jpg' alt='Wine promotion' className='w-full h-auto rounded' />
            </div>
          </div>

          <div className='w-full md:w-3/4'>
            <div className='flex justify-between items-center mb-6'>
              <div className='flex items-center space-x-2'>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'text-yellow-600' : 'text-gray-500'}`}
                  aria-label='Grid view'
                >
                  <FaThLarge />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'text-yellow-600' : 'text-gray-500'}`}
                  aria-label='List view'
                >
                  <FaList />
                </button>
              </div>
              <div className='text-sm text-gray-500'>
                Hiển thị {products.length} / {allProducts.length} sản phẩm
              </div>
            </div>

            {error ? (
              <div className='text-center text-red-500'>{error}</div>
            ) : products.length === 0 ? (
              <div className='text-center py-8'>
                <p className='text-gray-600'>Không có sản phẩm nào trong danh mục này.</p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {products.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className='space-y-6'>
                {products.map((product) => (
                  <ProductColumnItem key={product.id} product={product} />
                ))}
              </div>
            )}

            {renderPagination()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
