import { Menu } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="text-white font-serif text-2xl">Luxuria</a>
        <nav className="hidden md:flex items-center gap-6 text-white/90">
          <a href="/collections/watches" className="hover:text-white">Watches</a>
          <a href="/collections/jewelry" className="hover:text-white">Jewelry</a>
          <a href="/collections/holidays" className="hover:text-white">Holidays</a>
          <a href="/collections/home" className="hover:text-white">Home</a>
          <a href="/collections/health" className="hover:text-white">Health</a>
          <a href="#distributor" className="hover:text-white">Become a Distributor</a>
        </nav>
        <button className="md:hidden text-white/90" aria-label="menu">
          <Menu />
        </button>
      </div>
    </header>
  )
}
