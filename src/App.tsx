import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './layouts/Header/Header'
import Footer from './layouts/Footer/Footer'
import Introduction from './layouts/Body/Introduction'
import FeaturedProduct from './layouts/Body/FeaturedProduct'
import NewProducts from './layouts/Body/NewProducts'
import Gallery from './layouts/Body/Gallery'
import BestSellingProduct from './layouts/Body/BestSellingProduct'
import BlogAndTestimonials from './layouts/Body/BlogAndTestimonials'

function App() {
  return (
    <Router>
      <div className='app'>
        <Header />
        <main className='content flex-grow'>
          <Introduction />
          <FeaturedProduct />
          <NewProducts />
          <Gallery />
          <BestSellingProduct />
          <BlogAndTestimonials />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
