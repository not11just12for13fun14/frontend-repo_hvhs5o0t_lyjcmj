import { useEffect } from 'react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import CategoryGrid from './components/CategoryGrid'
import ProductCarousel from './components/ProductCarousel'
import DistributorSection from './components/DistributorSection'
import Footer from './components/Footer'

function App() {
  const scrollToCategories = () => {
    const el = document.getElementById('categories')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black">
      <Navbar />
      <Hero onExplore={scrollToCategories} />
      <ProductCarousel />
      <CategoryGrid />
      <DistributorSection />
      <Footer />
    </div>
  )
}

export default App
