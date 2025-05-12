import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './layouts/Header/Header'
import Footer from './layouts/Footer/Footer'
import Introduction from './components/Introduction'
import FeaturedProduct from './components/FeaturedProduct'
import NewProducts from './components/NewProducts'

function App() {
  return (
    <Router>
      <div className='app'>
        <Header />
        <main className='content flex-grow'>
          <Introduction />
          <FeaturedProduct />
          <NewProducts />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
