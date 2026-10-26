import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BikeCatalog from './components/BikeCatalog'
import ReviewsSection from './components/ReviewsSection'
import BookingPage from './pages/BookingPage'
import Footer from './components/Footer'
import './styles/App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <BikeCatalog />
              <ReviewsSection />
            </>
          } />
          <Route path="/book/:bikeId" element={<BookingPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
