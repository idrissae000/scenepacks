'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { movies } from '@/data/movies'

export default function MoviesPage() {
  return (
    <div className="pt-28 pb-20 px-4">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="mob-label mb-3">Library</div>
          <h1 className="section-title text-5xl sm:text-6xl text-mob-text">Movies</h1>
          <div className="mob-divider max-w-[60px] mx-auto mt-4 mb-6" />
          <p className="text-mob-muted text-sm tracking-wide">
            {movies.length} franchises · {movies.reduce((a, m) => a + m.characters.length, 0)} characters
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {movies.map((movie, i) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -5 }}
            >
              <Link href={`/movies/${movie.slug}`} className="block group">
                <div className="mob-card rounded-sm overflow-hidden transition-all duration-300">
                  <div className="h-1" style={{ background: `linear-gradient(90deg, ${movie.theme.accent}, ${movie.theme.gold})` }} />

                  <div className="relative aspect-video flex items-center justify-center overflow-hidden"
                    style={{ background: movie.theme.bg }}>
                    <div className="absolute inset-0" style={{ background: movie.theme.heroOverlay }} />
                    <div className="relative z-10 text-center px-6">
                      <div className="section-title text-6xl font-black select-none"
                        style={{ color: movie.theme.accent, opacity: 0.2 }}>
                        {movie.name.split(' ').map(w => w[0]).join('').slice(0, 3)}
                      </div>
                      <div className="text-xs mt-2 tracking-widest" style={{ color: movie.theme.gold, opacity: 0.6 }}>
                        {movie.theme.label}
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-16"
                      style={{ background: `linear-gradient(to top, ${movie.theme.bg}, transparent)` }} />
                  </div>

                  <div className="p-5">
                    <h2 className="section-title text-xl text-mob-text group-hover:opacity-80 transition-opacity mb-2 leading-tight">
                      {movie.name}
                    </h2>
                    <p className="text-xs mb-3" style={{ color: movie.theme.muted, fontStyle: 'italic', fontFamily: 'var(--font-playfair)' }}>
                      {movie.theme.tagline}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: movie.theme.gold }}>
                        {movie.characters.length} character{movie.characters.length !== 1 ? 's' : ''}
                      </span>
                      <span className="text-xs text-mob-muted group-hover:text-mob-gold transition-colors">
                        View packs →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
