'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { shows } from '@/data/shows'

export default function ShowsPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return shows
    return shows.filter((s) =>
      s.name.toLowerCase().includes(q) ||
      s.characters.some((c) => c.name.toLowerCase().includes(q))
    )
  }, [query])

  return (
    <div className="pt-28 pb-20 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="mob-label mb-3">Library</div>
          <h1 className="section-title text-5xl sm:text-6xl text-mob-text">TV Shows</h1>
          <div className="mob-divider max-w-[60px] mx-auto mt-4 mb-6" />
          <p className="text-mob-muted text-sm tracking-wide">
            {shows.length} shows · {shows.reduce((a, s) => a + s.characters.length, 0)} characters
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative max-w-md mx-auto mb-12"
        >
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-mob-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search shows or characters..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-sm text-sm text-mob-text placeholder-mob-muted focus:outline-none transition-all"
            style={{
              background: '#141414',
              border: '1px solid rgba(201,168,76,0.15)',
              boxShadow: 'none',
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'}
            onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.15)'}
          />
        </motion.div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-mob-muted">
            <p>No results for &ldquo;{query}&rdquo;</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((show, i) => (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <Link href={`/shows/${show.slug}`} className="block group">
                  <div className="mob-card rounded-sm overflow-hidden transition-all duration-300">
                    {/* Theme band */}
                    <div className="h-1" style={{ background: `linear-gradient(90deg, ${show.theme.accent}, ${show.theme.gold})` }} />

                    {/* Image placeholder */}
                    <div className="relative aspect-[16/9] flex items-center justify-center overflow-hidden"
                      style={{ background: show.theme.bg }}>
                      <div className="absolute inset-0" style={{ background: show.theme.heroOverlay }} />
                      <div className="relative z-10 text-center px-6">
                        <div className="section-title text-6xl font-black select-none"
                          style={{ color: show.theme.accent, opacity: 0.25 }}>
                          {show.name.split(' ').map(w => w[0]).join('').slice(0, 3)}
                        </div>
                        <div className="text-xs mt-2 tracking-widest" style={{ color: show.theme.gold, opacity: 0.6 }}>
                          {show.theme.label}
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-16"
                        style={{ background: `linear-gradient(to top, ${show.theme.bg}, transparent)` }} />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h2 className="section-title text-xl text-mob-text group-hover:opacity-80 transition-opacity mb-2 leading-tight">
                        {show.name}
                      </h2>
                      <p className="text-xs text-mob-muted mb-3" style={{ fontStyle: 'italic', fontFamily: 'var(--font-playfair)' }}>
                        {show.theme.tagline}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs" style={{ color: show.theme.gold }}>
                          {show.characters.length} character{show.characters.length !== 1 ? 's' : ''}
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
        )}
      </div>
    </div>
  )
}
