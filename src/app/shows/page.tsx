'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { shows } from '@/data/shows'

function LogoImage({ src, alt, fallback, headingFont, accent }: { src: string; alt: string; fallback: string; headingFont: string; accent: string }) {
  return (
    <img
      src={src}
      alt={alt}
      crossOrigin="anonymous"
      className="relative z-10 max-h-16 max-w-[75%] object-contain drop-shadow-lg"
      onError={(e) => {
        const img = e.currentTarget
        img.style.display = 'none'
        const span = document.createElement('span')
        span.textContent = fallback
        span.style.cssText = `font-family:${headingFont};color:${accent};font-size:1.5rem;font-weight:900;text-align:center;line-height:1.1;display:block;`
        img.parentNode?.appendChild(span)
      }}
    />
  )
}

export default function ShowsPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return shows
    return shows.filter((s: any) =>
      s.name.toLowerCase().includes(q) ||
      s.characters.some((c: any) => c.name.toLowerCase().includes(q))
    )
  }, [query])

  return (
    <div className="pt-28 pb-20 px-4" style={{ background: '#0d0a07' }}>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="mob-label mb-3">The Collection</div>
          <h1 className="font-mobsters mb-4" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', color: '#d4c5a9' }}>
            TV Shows
          </h1>
          <div className="mob-divider max-w-[60px] mx-auto mb-4" />
          <p className="text-sm" style={{ color: '#847464' }}>
            {shows.length} shows &middot; {shows.reduce((a: number, s: any) => a + s.characters.length, 0)} characters
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
            <svg className="w-4 h-4" style={{ color: '#847464' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search shows or characters..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-sm text-sm focus:outline-none transition-all"
            style={{
              background: '#18100a',
              border: '1px solid rgba(94,27,33,0.3)',
              color: '#d4c5a9',
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(229,92,53,0.5)'}
            onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(94,27,33,0.3)'}
          />
        </motion.div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20" style={{ color: '#847464' }}>
            <p>No results for &ldquo;{query}&rdquo;</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((show: any, i: number) => (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <Link href={`/shows/${show.slug}`} className="block group">
                  <div className={`rounded-sm overflow-hidden transition-all duration-300 ${show.theme.cardClass}`}>
                    {/* Theme band */}
                    <div className="h-1" style={{ background: `linear-gradient(90deg, ${show.theme.accent}, ${show.theme.highlight || show.theme.accentLight})` }} />

                    {/* Logo area */}
                    <div className={`relative aspect-video flex items-center justify-center overflow-hidden ${show.theme.patternClass}`}
                      style={{ background: show.theme.bg }}>
                      <div className="absolute inset-0" style={{ background: show.theme.heroOverlay }} />
                      <div className="absolute inset-0" style={{ background: show.theme.gradient, opacity: 0.6 }} />
                      <LogoImage
                        src={show.logoUrl}
                        alt={show.name}
                        fallback={show.name}
                        headingFont={show.theme.headingFont}
                        accent={show.theme.highlight || show.theme.accent}
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-16"
                        style={{ background: `linear-gradient(to top, ${show.theme.bg}, transparent)` }} />
                    </div>

                    {/* Content */}
                    <div className="p-5" style={{ background: show.theme.surface }}>
                      <h2 className="font-fell text-xl mb-1 leading-tight group-hover:opacity-80 transition-opacity"
                        style={{ color: show.theme.text }}>
                        {show.name}
                      </h2>
                      <p className="text-xs mb-3 font-fell italic" style={{ color: show.theme.muted }}>
                        &ldquo;{show.theme.tagline}&rdquo;
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs" style={{ color: show.theme.highlight || show.theme.accent }}>
                          {show.characters.length} character{show.characters.length !== 1 ? 's' : ''}
                        </span>
                        <span className="text-xs transition-colors" style={{ color: show.theme.muted }}>
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
