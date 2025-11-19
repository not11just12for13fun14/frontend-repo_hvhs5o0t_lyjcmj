import { useState } from 'react'

export default function DistributorSection() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    const form = new FormData(e.currentTarget)
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      company: form.get('company') || undefined,
      website: form.get('website') || undefined,
      location: form.get('location') || undefined,
      message: form.get('message') || undefined,
    }

    try {
      const res = await fetch(`${baseUrl}/api/distributor/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus({ ok: true, id: data.application_id })
        e.currentTarget.reset()
      } else {
        throw new Error(data.detail || 'Submission failed')
      }
    } catch (err) {
      setStatus({ ok: false, error: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="distributor" className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div className="text-white">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Become a Distributor</h2>
          <p className="text-white/80 mb-6">
            Partner with Luxuria to bring our premium collections to your clientele. Enjoy priority access,
            exclusive pricing and dedicated support.
          </p>
          <ul className="space-y-2 text-white/80 list-disc list-inside">
            <li>Tiered wholesale pricing</li>
            <li>Co-branded marketing assets</li>
            <li>White-glove logistics</li>
          </ul>
        </div>
        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 mb-1 text-sm">Full name</label>
              <input name="name" required className="w-full bg-black/30 text-white rounded px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/30" />
            </div>
            <div>
              <label className="block text-white/80 mb-1 text-sm">Email</label>
              <input type="email" name="email" required className="w-full bg-black/30 text-white rounded px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/30" />
            </div>
            <div>
              <label className="block text-white/80 mb-1 text-sm">Company</label>
              <input name="company" className="w-full bg-black/30 text-white rounded px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/30" />
            </div>
            <div>
              <label className="block text-white/80 mb-1 text-sm">Website</label>
              <input name="website" placeholder="https://" className="w-full bg-black/30 text-white rounded px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/30" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-white/80 mb-1 text-sm">Location</label>
              <input name="location" className="w-full bg-black/30 text-white rounded px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/30" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-white/80 mb-1 text-sm">Message</label>
              <textarea name="message" rows="4" className="w-full bg-black/30 text-white rounded px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/30" />
            </div>
          </div>
          <button disabled={loading} className="mt-4 w-full bg-white text-black font-semibold py-2 rounded hover:bg-white/90 disabled:opacity-70">
            {loading ? 'Submitting...' : 'Apply now'}
          </button>
          {status && (
            <div className={`mt-3 text-sm ${status.ok ? 'text-emerald-400' : 'text-red-400'}`}>
              {status.ok ? (
                <>Application received. Reference: {status.id}</>
              ) : (
                <>Submission failed: {status.error}</>
              )}
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
