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
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CartPage from './pages/CartPage'
import { AuthProvider } from './contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
  return (
    <AuthProvider>
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
              <Route path='/category/:categorySlug/:subcategorySlug' element={<CategoryPage />} />
              <Route path='/product/:productId' element={<ProductDetailPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/cart' element={<CartPage />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
