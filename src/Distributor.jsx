import { useState } from 'react'

function Distributor() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    region: '',
    website: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    setResult(null)

    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

    try {
      const res = await fetch(`${baseUrl}/api/distributors/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          phone: form.phone || undefined,
          region: form.region,
          website: form.website || undefined,
          message: form.message || undefined,
        }),
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `Request failed with ${res.status}`)
      }
      const data = await res.json()
      setResult({ id: data.id, status: data.status })
      setForm({ name: '', email: '', company: '', phone: '', region: '', website: '', message: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white tracking-tight">Become a Distributor</h1>
          <p className="text-blue-200 mt-2">Partner with us to bring our products to your region.</p>
        </div>

        <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6 md:p-8 shadow-xl">
          {result && (
            <div className="mb-6 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-green-200">
              <p className="font-semibold">Thank you! Your application has been received.</p>
              <p className="text-sm opacity-80">Reference: {result.id} • Status: {result.status}</p>
            </div>
          )}
          {error && (
            <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-200">
              <p className="font-semibold">Something went wrong</p>
              <p className="text-sm opacity-80 break-all">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-blue-200 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-slate-900/60 border border-slate-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="block text-sm text-blue-200 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-slate-900/60 border border-slate-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="jane@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-blue-200 mb-1">Company</label>
                <input
                  type="text"
                  name="company"
                  required
                  value={form.company}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-slate-900/60 border border-slate-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Company Ltd."
                />
              </div>
              <div>
                <label className="block text-sm text-blue-200 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-slate-900/60 border border-slate-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 555 000 0000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-blue-200 mb-1">Region/Country</label>
                <input
                  type="text"
                  name="region"
                  required
                  value={form.region}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-slate-900/60 border border-slate-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Europe, India, UAE"
                />
              </div>
              <div>
                <label className="block text-sm text-blue-200 mb-1">Website</label>
                <input
                  type="url"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-slate-900/60 border border-slate-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-blue-200 mb-1">Tell us about your distribution capabilities</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                className="w-full rounded-lg bg-slate-900/60 border border-slate-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Include regions you cover, relevant experience, and anything else you'd like us to know."
              />
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              <a href="/" className="text-blue-300 hover:text-white transition-colors">Back</a>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold px-5 py-2 rounded-lg transition-colors"
              >
                {submitting ? 'Submitting…' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Distributor
