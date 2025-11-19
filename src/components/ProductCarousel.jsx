import { useEffect, useState } from 'react'

export default function ProductCarousel() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch(`${baseUrl}/api/products?featured=true`).then(r=>r.json()).then(setProducts).catch(()=>{})
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl md:text-4xl font-serif text-white mb-8">Featured</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map(p => (
          <a key={p._id} href={`/product/${p._id}`} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={(p.images && p.images[0]) || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop'} alt={p.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold">{p.title}</h3>
              <p className="text-white/70">${p.price?.toLocaleString?.() || p.price}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
