import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './layouts/Header/Header'
import Footer from './layouts/Footer/Footer'
import Introduction from './layouts/Body/Introduction'
import FeaturedProduct from './layouts/Body/FeaturedProduct'
import NewProducts from './layouts/Body/NewProducts'
import Gallery from './layouts/Body/Gallery'
import BestSellingProduct from './layouts/Body/BestSellingProduct'
import BlogAndTestimonials from './layouts/Body/BlogAndTestimonials'
import CategoryPage from './pages/CategoryPage'
import ProductDetailPage from './pages/ProductDetailPage'

function App() {
  return (
    <Router>
      <div className='app flex flex-col min-h-screen'>
        <Header />
        <main className='content flex-grow'>
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <Introduction />
                  <FeaturedProduct />
                  <NewProducts />
                  <Gallery />
                  <BestSellingProduct />
                  <BlogAndTestimonials />
                </>
              }
            />
            <Route path='/category/:categorySlug' element={<CategoryPage />} />
            <Route path='/product/:productId' element={<ProductDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
