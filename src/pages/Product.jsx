import { useEffect, useState } from 'react'

export default function ProductPage({ productId }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    if (!productId) return
    fetch(`${baseUrl}/api/products/${productId}`).then(r=>r.json()).then(setProduct).catch(()=>{})
  }, [productId])

  async function checkout() {
    setStatus('processing')
    try {
      const res = await fetch(`${baseUrl}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{
            product_id: product._id,
            title: product.title,
            quantity: qty,
            price: product.price,
            image: product.images?.[0],
          }],
          customer_name: 'Guest',
          customer_email: 'guest@example.com',
          address: 'N/A',
          city: 'N/A',
          country: 'N/A'
        })
      })
      const data = await res.json()
      if (res.ok) {
        setStatus(`Order confirmed: ${data.order_id}`)
      } else {
        setStatus('Checkout failed')
      }
    } catch (e) {
      setStatus('Checkout failed')
    }
  }

  if (!product) return <div className="min-h-screen text-white pt-28 px-6">Loading...</div>

  return (
    <div className="max-w-7xl mx-auto px-6 pt-28 pb-16 text-white">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10">
          <img src={product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop'} alt={product.title} className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-serif">{product.title}</h1>
          <p className="text-white/70 mt-2">${product.price?.toLocaleString?.() || product.price}</p>
          <p className="mt-6 text-white/80">{product.description}</p>
          <div className="mt-6 flex items-center gap-3">
            <label>Qty</label>
            <input type="number" min={1} value={qty} onChange={e=>setQty(parseInt(e.target.value)||1)} className="w-20 bg-black/30 text-white rounded px-3 py-2 border border-white/10" />
          </div>
          <button onClick={checkout} className="mt-6 bg-white text-black px-6 py-3 rounded font-semibold hover:bg-white/90">Checkout</button>
          {status && <p className="mt-3 text-sm text-emerald-400">{status}</p>}
        </div>
      </div>
    </div>
  )
}
