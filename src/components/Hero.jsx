import { motion } from 'framer-motion'

export default function Hero({ onExplore }) {
  return (
    <section className="relative min-h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury hero"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-28 flex flex-col items-start">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-serif text-white drop-shadow-xl"
        >
          Luxuria
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="mt-6 text-xl md:text-2xl text-white/90 max-w-2xl"
        >
          Premium watches, jewelry, escapes, home living and wellness.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-10 flex gap-4"
        >
          <button onClick={onExplore} className="px-6 py-3 bg-white text-black rounded-full hover:bg-white/90">Explore Collection</button>
          <a href="#distributor" className="px-6 py-3 border border-white text-white rounded-full hover:bg-white/10">Become a Distributor</a>
        </motion.div>
      </div>
    </section>
  )
}
