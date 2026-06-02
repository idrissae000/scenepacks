'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { shows } from '@/data/shows'
import { movies } from '@/data/movies'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const featured: any[] = [
  shows[0], // Sopranos
  shows[1], // Breaking Bad
  shows[3], // GOT
  movies[0], // Batman
  shows[7], // Barry
  movies[1], // MCU
]

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Layered backgrounds */}
        <div className="absolute inset-0" style={{ background: '#0a0a0a' }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 90% 60% at 50% -5%, rgba(107,15,26,0.18) 0%, transparent 65%)',
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 80% at 20% 80%, rgba(107,15,26,0.08) 0%, transparent 60%)',
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 40% 60% at 80% 20%, rgba(201,168,76,0.04) 0%, transparent 60%)',
        }} />

        {/* Vertical rule lines — cinematic feel */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[15, 85].map((x) => (
            <div key={x} className="absolute top-0 bottom-0 w-px opacity-[0.04]"
              style={{ left: `${x}%`, background: 'linear-gradient(180deg, transparent, #c9a84c 30%, #c9a84c 70%, transparent)' }} />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, transparent, #6b0f1a)' }} />
            <span className="mob-label">Est. Premium Scenepacks</span>
            <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, #6b0f1a, transparent)' }} />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="section-title text-6xl sm:text-8xl lg:text-9xl mb-6 leading-none"
          >
            <span className="gold-text">Idriss.ae</span>
            <br />
            <span className="text-mob-text">Scenepacks</span>
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mob-divider max-w-xs mx-auto mb-8"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-mob-muted text-base sm:text-lg tracking-widest uppercase font-light mb-12"
            style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}
          >
            Aesthetic edits. Free scenepacks.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/shows"
              className="mob-btn-gold rounded-sm px-10 py-3.5 transition-all duration-200 inline-block"
            >
              Browse Packs
            </Link>
            <a
              href="https://discord.gg/MVA5ySY2"
              target="_blank"
              rel="noopener noreferrer"
              className="mob-btn-outline rounded-sm px-10 py-3.5 transition-all duration-200 inline-flex items-center gap-2"
            >
              <DiscordIcon /> Join Discord
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-20 flex items-center justify-center gap-12 sm:gap-20"
          >
            {[
              { n: shows.reduce((a, s) => a + s.characters.length, 0) + movies.reduce((a, m) => a + m.characters.length, 0), label: 'Characters' },
              { n: shows.length + movies.length, label: 'Shows & Films' },
              { n: '∞', label: 'Free' },
            ].map(({ n, label }) => (
              <div key={label} className="text-center">
                <div className="section-title text-3xl gold-text">{n}+</div>
                <div className="mob-label mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #0a0a0a, transparent)' }} />
      </section>

      {/* ─── Featured grid ─── */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="mob-label mb-3">Featured</div>
            <h2 className="section-title text-4xl sm:text-5xl text-mob-text">Select Your Scene</h2>
            <div className="mob-divider max-w-[80px] mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((item, i) => {
              const isShow = 'characters' in item
              const href = isShow ? `/shows/${item.slug}` : `/movies/${item.slug}`
              const count = item.characters.length
              return (
                <motion.div
                  key={item.id + item.slug}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                >
                  <Link href={href} className="block mob-card rounded-sm overflow-hidden group transition-all duration-300">
                    {/* Color band from theme */}
                    <div className="h-1" style={{ background: `linear-gradient(90deg, ${item.theme.accent}, ${item.theme.gold})` }} />

                    {/* Image area */}
                    <div className="relative aspect-video flex items-center justify-center overflow-hidden"
                      style={{ background: item.theme.bg }}>
                      <div className="absolute inset-0" style={{ background: item.theme.heroOverlay }} />
                      <span className="relative z-10 section-title text-5xl font-black opacity-10 select-none tracking-widest"
                        style={{ color: item.theme.gold }}>
                        {item.name.split(' ')[0]}
                      </span>
                      <div className="absolute inset-x-0 bottom-0 h-16"
                        style={{ background: `linear-gradient(to top, ${item.theme.bg}, transparent)` }} />
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <div className="mob-label mb-1.5" style={{ color: item.theme.gold }}>
                        {isShow ? '📺 TV Show' : '🎬 Film'}
                      </div>
                      <h3 className="section-title text-lg text-mob-text group-hover:opacity-80 transition-opacity leading-tight mb-2">
                        {item.name}
                      </h3>
                      <p className="text-xs text-mob-muted">{count} character{count !== 1 ? 's' : ''} available</p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link href="/shows"
              className="mob-btn-outline rounded-sm px-8 py-3 transition-all duration-200 inline-block mr-4">
              All Shows
            </Link>
            <Link href="/movies"
              className="mob-btn-outline rounded-sm px-8 py-3 transition-all duration-200 inline-block">
              All Movies
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

function DiscordIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.033.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}
