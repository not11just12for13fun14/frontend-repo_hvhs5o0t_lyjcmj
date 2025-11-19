import { useEffect, useState } from 'react'

const CATEGORIES = [
  { id: 'watches', name: 'Watches', image: 'https://images.unsplash.com/photo-1609587312208-cea54be969e7?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxXYXRjaGVzfGVufDB8MHx8fDE3NjM1MjQ4Njd8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
  { id: 'jewelry', name: 'Jewelry', image: 'https://images.unsplash.com/photo-1609587312208-cea54be969e7?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxXYXRjaGVzfGVufDB8MHx8fDE3NjM1MjQ4Njd8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
  { id: 'holidays', name: 'Holidays', image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1600&auto=format&fit=crop' },
  { id: 'home', name: 'Home Living', image: 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1600&auto=format&fit=crop' },
  { id: 'health', name: 'Health', image: 'https://images.unsplash.com/photo-1609587312208-cea54be969e7?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxXYXRjaGVzfGVufDB8MHx8fDE3NjM1MjQ4Njd8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
]

export default function CategoryGrid() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [categories, setCategories] = useState(CATEGORIES)

  useEffect(() => {
    fetch(`${baseUrl}/api/categories`).then(r => r.json()).then(setCategories).catch(() => {})
  }, [])

  return (
    <section id="categories" className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-serif text-white mb-8">Shop by Category</h2>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map(cat => (
          <a key={cat.id} href={`/collections/${cat.id}`} className="group relative overflow-hidden rounded-xl">
            <img src={cat.image || CATEGORIES.find(c=>c.id===cat.id)?.image} alt={cat.name} className="h-44 w-full object-cover transition-transform group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-3 left-3 text-white font-semibold">{cat.name}</div>
          </a>
        ))}
      </div>
    </section>
  )
}
