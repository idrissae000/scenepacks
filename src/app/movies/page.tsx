'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { movies } from '@/data/movies'

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

export default function MoviesPage() {
  return (
    <div className="pt-28 pb-20 px-4" style={{ background: '#0d0a07' }}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="mob-label mb-3">The Collection</div>
          <h1 className="font-mobsters mb-4" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', color: '#d4c5a9' }}>
            Movies
          </h1>
          <div className="mob-divider max-w-[60px] mx-auto mb-4" />
          <p className="text-sm" style={{ color: '#847464' }}>
            {movies.length} franchises &middot; {movies.reduce((a: number, m: any) => a + m.characters.length, 0)} characters
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {movies.map((movie: any, i: number) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -5 }}
            >
              <Link href={`/movies/${movie.slug}`} className="block group">
                <div className={`rounded-sm overflow-hidden transition-all duration-300 ${movie.theme.cardClass}`}>
                  <div className="h-1" style={{ background: `linear-gradient(90deg, ${movie.theme.accent}, ${movie.theme.highlight || movie.theme.accentLight})` }} />

                  <div className={`relative aspect-video flex items-center justify-center overflow-hidden ${movie.theme.patternClass}`}
                    style={{ background: movie.theme.bg }}>
                    <div className="absolute inset-0" style={{ background: movie.theme.heroOverlay }} />
                    <div className="absolute inset-0" style={{ background: movie.theme.gradient, opacity: 0.6 }} />
                    <LogoImage
                      src={movie.logoUrl}
                      alt={movie.name}
                      fallback={movie.name}
                      headingFont={movie.theme.headingFont}
                      accent={movie.theme.highlight || movie.theme.accent}
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-16"
                      style={{ background: `linear-gradient(to top, ${movie.theme.bg}, transparent)` }} />
                  </div>

                  <div className="p-5" style={{ background: movie.theme.surface }}>
                    <div className="flex items-center gap-2 mb-1">
                      {movie.theme.emojis.slice(0, 3).map((e: string, idx: number) => (
                        <span key={idx} className="text-base opacity-60">{e}</span>
                      ))}
                    </div>
                    <h2 className="font-mobsters text-xl mb-1 leading-tight group-hover:opacity-80 transition-opacity"
                      style={{ color: movie.theme.text }}>
                      {movie.name}
                    </h2>
                    <p className="text-xs mb-3 font-fell italic" style={{ color: movie.theme.muted }}>
                      &ldquo;{movie.theme.tagline}&rdquo;
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: movie.theme.highlight || movie.theme.accent }}>
                        {movie.characters.length} character{movie.characters.length !== 1 ? 's' : ''}
                      </span>
                      <span className="text-xs transition-colors" style={{ color: movie.theme.muted }}>
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
