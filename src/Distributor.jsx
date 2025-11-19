import Navbar from './components/Navbar'
import DistributorSection from './components/DistributorSection'
import Footer from './components/Footer'

export default function DistributorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black">
      <Navbar />
      <div className="pt-24">
        <DistributorSection />
      </div>
      <Footer />
    </div>
  )
}
