import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './layouts/Header/Header'

function App() {
  return (
    <Router>
      <div className='app'>
        <Header />
        <main className='content'></main>
      </div>
    </Router>
  )
}

export default App
