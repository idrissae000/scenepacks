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
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
        style={{ background: 'linear-gradient(160deg, #0d0a07 0%, #1a0a08 100%)' }}>
        {/* Background layers */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 85% 60% at 50% -5%, rgba(94,27,33,0.22) 0%, transparent 60%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 70% at 15% 80%, rgba(94,27,33,0.08) 0%, transparent 60%)' }} />
        {/* Brick texture subtle */}
        <div className="absolute inset-0 pattern-brick opacity-40" />
        {/* Wood panel on hero */}
        <div className="absolute inset-0 pattern-wood opacity-60" />
        {/* Vertical rules */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[10, 90].map(x => (
            <div key={x} className="absolute top-0 bottom-0 w-px opacity-[0.06]"
              style={{ left: `${x}%`, background: 'linear-gradient(180deg, transparent, #5e1b21 30%, #5e1b21 70%, transparent)' }} />
          ))}
        </div>
        {/* Smoke */}
        <SmokeEffect />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Eyebrow */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #5e1b21)' }} />
            <span className="mob-label">Est. Premium Scenepacks</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #5e1b21, transparent)' }} />
          </motion.div>

          {/* Title */}
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
            className="leading-none mb-4" style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
            <span className="block" style={{ fontFamily: '"Mobsters","Palatino Linotype",serif', color: '#d4c5a9' }}>
              Idriss.ae
            </span>
            <span className="block" style={{ fontFamily: '"Mobsters","Palatino Linotype",serif', color: '#847464', fontSize: '0.6em', letterSpacing: '0.04em' }}>
              Scenepacks
            </span>
          </motion.h1>

          {/* Stain divider */}
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, delay: 0.3 }}
            className="divider-stain max-w-sm mx-auto mb-8" />

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl mb-12 tracking-wide"
            style={{ color: '#847464', fontFamily: '"IM Fell English",Georgia,serif', fontStyle: 'italic' }}>
            The finest cuts. Free for the family.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/shows" className="btn-primary rounded-sm px-10 py-3.5 inline-block text-lg">
              Browse Packs
            </Link>
            <a href="https://discord.gg/MVA5ySY2" target="_blank" rel="noopener noreferrer"
              className="btn-join rounded-sm px-10 py-3.5 inline-flex items-center gap-2 text-lg">
              <DiscordIcon /> Join the Family
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-20 flex items-center justify-center gap-12 sm:gap-20">
            {[
              { n: `${totalChars}+`, label: 'Characters' },
              { n: `${shows.length + movies.length}`, label: 'Shows & Films' },
              { n: '∞', label: 'Free' },
            ].map(({ n, label }) => (
              <div key={label} className="text-center">
                <div style={{ fontFamily: '"IM Fell English",Georgia,serif', color: '#d4c5a9', fontSize: '2.4rem', lineHeight: 1 }}>{n}</div>
                <div className="mob-label mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #0d0a07, transparent)' }} />
      </section>

      {/* ═══ FEATURED ═══ */}
      <section className="py-20 px-4" style={{ background: '#0d0a07' }}>
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-14">
            <div className="mob-label mb-3">Featured</div>
            <h2 style={{ fontFamily: '"IM Fell English",Georgia,serif', color: '#d4c5a9', fontSize: '2.6rem', fontStyle: 'italic' }}>
              Select Your Scene
            </h2>
            <div className="divider-stain max-w-[80px] mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((item, i) => {
              const href = 'characters' in item ? `/shows/${item.slug}` : `/movies/${item.slug}`
              const t = item.theme
              return (
                <motion.div key={item.id + item.slug}
                  initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.06 }}
                  whileHover={{ y: -5 }}>
                  <Link href={href} className="block group">
                    <div className={`rounded-sm overflow-hidden transition-all duration-300 ${t.cardClass}`}>
                      <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${t.accent}, ${t.highlight || t.accent})` }} />
                      {/* Logo image */}
                      <div className="relative aspect-video flex items-center justify-center overflow-hidden px-6"
                        style={{ background: t.bg }}>
                        <div className="absolute inset-0" style={{ background: t.heroOverlay }} />
                        {item.logoUrl ? (
                          <LogoImage src={item.logoUrl} alt={item.name} fallback={item.name} headingFont={t.headingFont} accent={t.accent} />
                        ) : (
                          <span className="relative z-10 text-5xl font-black select-none opacity-15"
                            style={{ fontFamily: t.headingFont, color: t.accent }}>
                            {item.name.split(' ').map((w: string) => w[0]).join('').slice(0,3)}
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-base font-semibold leading-tight mb-1" style={{ fontFamily: t.headingFont, color: t.lightBg ? t.text : t.text }}>
                          {item.name}
                        </h3>
                        <p className="text-xs" style={{ color: t.muted, fontStyle: 'italic' }}>{t.tagline}</p>
                      </div>
                    </div>
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

function LogoImage({ src, alt, fallback, headingFont, accent }: { src: string; alt: string; fallback: string; headingFont: string; accent: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="relative z-10 max-h-20 max-w-[80%] object-contain"
      crossOrigin="anonymous"
      onError={e => {
        const img = e.currentTarget
        img.style.display = 'none'
        const span = document.createElement('span')
        span.textContent = fallback
        span.style.cssText = `font-family:${headingFont};color:${accent};font-size:1.4rem;opacity:0.7;text-align:center;`
        img.parentNode?.appendChild(span)
      }}
    />
  )
}

function SmokeEffect() {
  const particles = [
    { left: '20%', w: 80, delay: 0,   dur: 9  },
    { left: '36%', w: 55, delay: 1.6, dur: 11 },
    { left: '52%', w: 100,delay: 3.2, dur: 10 },
    { left: '66%', w: 65, delay: 0.8, dur: 8.5},
    { left: '79%', w: 75, delay: 2.4, dur: 12 },
  ]
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div key={i} className="absolute rounded-full" style={{
          left: p.left, bottom: '6%',
          width: p.w, height: p.w,
          background: 'radial-gradient(circle, rgba(228,224,218,0.16) 0%, rgba(210,205,198,0.06) 50%, transparent 70%)',
          filter: 'blur(22px)',
          animationName: i % 2 === 0 ? 'smokeRise' : 'smokeRiseAlt',
          animationTimingFunction: 'ease-out',
          animationIterationCount: 'infinite',
          animationFillMode: 'both',
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.dur}s`,
        }} />
      ))}
    </div>
  )
}

function DiscordIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.033.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
}
