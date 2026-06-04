'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { shows } from '@/data/shows'
import { movies } from '@/data/movies'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const featured: any[] = [shows[0], shows[1], shows[3], movies[0], shows[7], movies[1]]

export default function HomePage() {
  const totalChars = shows.reduce((a, s) => a + s.characters.length, 0)
    + movies.reduce((a, m) => a + m.characters.length, 0)

  return (
    <>
      {/* Full-page fixed background */}
      <div className="fixed inset-0 pointer-events-none" style={{
        zIndex: -1,
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.78), rgba(0,0,0,0.85)), url(/backgrounds/home.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#0d0a07',
      }} />

      {/* ═══ HERO ═══ */}
      <section className="relative flex items-center justify-center overflow-hidden"
        style={{ paddingTop: '10rem', paddingBottom: '8rem' }}>

        {/* Subtle vignette edges */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)' }} />

        <div className="relative z-10 text-center px-4 w-full max-w-2xl mx-auto flex flex-col items-center gap-12">

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontFamily: '"IM Fell English", Georgia, serif', fontStyle: 'italic', color: '#d4c5a9', fontSize: 'clamp(1.4rem, 3.5vw, 2.1rem)', lineHeight: 1.4 }}
          >
            The #1 Place for Aesthetic Scenepacks.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-stretch justify-center gap-4 w-full"
          >
            {/* Payhip */}
            <a href="https://payhip.com/Idrissae" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-7 py-5 rounded-lg transition-all duration-200 hover:scale-[1.03] hover:brightness-110 flex-1"
              style={{ background: 'rgba(18,12,10,0.88)', border: '2px solid #e55c35', color: '#e55c35' }}>
              <BagIcon />
              <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#d4c5a9' }}>
                Editing Presets (Payhip)
              </span>
            </a>

            {/* Discord */}
            <a href="https://discord.gg/98C5YUeEz7" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-7 py-5 rounded-lg transition-all duration-200 hover:scale-[1.03] hover:brightness-110 flex-1"
              style={{ background: 'rgba(18,12,10,0.88)', border: '2px solid #5865F2', color: '#5865F2', boxShadow: '0 0 22px rgba(88,101,242,0.3)' }}>
              <DiscordIcon size={22} />
              <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#ffffff' }}>
                Scenepack Discord Server
              </span>
            </a>

            {/* TikTok */}
            <a href="https://www.tiktok.com/@idriss.ae" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-7 py-5 rounded-lg transition-all duration-200 hover:scale-[1.03] hover:brightness-110 flex-1"
              style={{ background: 'rgba(18,12,10,0.88)', border: '2px solid rgba(255,255,255,0.35)', color: '#ffffff' }}>
              <TikTokIcon />
              <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#ffffff' }}>
                Follow on TikTok
              </span>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center justify-center gap-10 sm:gap-16"
          >
            {[
              { n: `${totalChars}+`, label: 'Characters' },
              { n: `${shows.length + movies.length}`, label: 'Shows & Films' },
              { n: '∞', label: 'Free' },
            ].map(({ n, label }) => (
              <div key={label} className="text-center">
                <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#d4c5a9', fontSize: '2.2rem', lineHeight: 1, fontWeight: 300 }}>{n}</div>
                <div className="mob-label mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

      </section>

      {/* ═══ FEATURED ═══ */}
      <section className="py-20 px-4" style={{ background: 'transparent' }}>
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-14">
            <div className="mob-label mb-3">Featured</div>
            <h2 style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#d4c5a9', fontSize: '2.6rem', fontStyle: 'italic' }}>
              Select Your Scene
            </h2>
            <div className="divider-stain max-w-[80px] mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((item, i) => {
              const href = 'characters' in item ? `/shows/${item.slug}` : `/movies/${item.slug}`
              return (
                <motion.div key={item.id + item.slug}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.45, delay: i * 0.06 }}>
                  <Link href={href} className="block">
                    <article className="card-clean rounded-md overflow-hidden h-full">
                      <div className="logo-placeholder overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.theme.logo}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-mobsters leading-tight mb-1.5" style={{ color: '#d4c5a9', fontSize: '1.3rem' }}>
                          {item.name}
                        </h3>
                        <p className="text-sm" style={{ color: '#9a8b76' }}>{item.theme.tagline}</p>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center mt-12 flex items-center justify-center gap-4">
            <Link href="/shows" className="btn-primary rounded-sm px-8 py-3 inline-block">All Shows</Link>
            <Link href="/movies" className="btn-primary rounded-sm px-8 py-3 inline-block">All Movies</Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

function DiscordIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.033.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  )
}
