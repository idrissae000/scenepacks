'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useMemo, useRef, useEffect } from 'react'
import { shows } from '@/data/shows'
import { movies } from '@/data/movies'
import { games } from '@/data/games'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildAllChars(): any[] {
  const result: any[] = []
  for (const s of shows as any[]) {
    for (const c of s.characters) {
      result.push({
        name: c.name,
        slug: c.slug,
        image: c.image,
        dateAdded: c.dateAdded || '2020-01-01',
        parentName: s.name,
        parentSlug: s.slug,
        type: 'show',
        href: `/shows/${s.slug}/${c.slug}`,
      })
    }
  }
  for (const m of movies as any[]) {
    for (const c of m.characters) {
      result.push({
        name: c.name,
        slug: c.slug,
        image: c.image,
        dateAdded: c.dateAdded || '2020-01-01',
        parentName: m.name,
        parentSlug: m.slug,
        type: 'movie',
        href: `/movies/${m.slug}/${c.slug}`,
      })
    }
  }
  for (const g of games as any[]) {
    for (const c of g.characters) {
      result.push({
        name: c.name,
        slug: c.slug,
        image: c.image,
        dateAdded: c.dateAdded || '2020-01-01',
        parentName: g.name,
        parentSlug: g.slug,
        type: 'game',
        href: `/games/${g.slug}/${c.slug}`,
      })
    }
  }
  return result
}

const ALL_CHARS = buildAllChars()

// Sort descending by dateAdded — top 6 are "new"
const sorted = [...ALL_CHARS].sort((a, b) => b.dateAdded.localeCompare(a.dateAdded))
const NEW_CHARS = sorted.slice(0, 6)
const REST_CHARS = sorted.slice(6)

function pickRandom6(pool: typeof REST_CHARS) {
  const copy = [...pool]
  const out = []
  while (out.length < 6 && copy.length > 0) {
    const idx = Math.floor(Math.random() * copy.length)
    out.push(copy.splice(idx, 1)[0])
  }
  // if pool has fewer than 6, fill from new chars
  if (out.length < 6) {
    const extra = [...NEW_CHARS].sort(() => Math.random() - 0.5)
    for (const e of extra) {
      if (out.length >= 6) break
      if (!out.find(x => x.slug === e.slug && x.type === e.type)) out.push(e)
    }
  }
  return out
}

export default function HomePage() {
  const [randomChars] = useState(() => pickRandom6(REST_CHARS))
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const gridChars = useMemo(() => [...NEW_CHARS, ...randomChars], [randomChars])

  const searchResults = useMemo(() => {
    if (!query.trim()) return []
    const q = query.trim().toLowerCase()
    return ALL_CHARS.filter(c =>
      c.name.toLowerCase().includes(q) || c.parentName.toLowerCase().includes(q)
    )
  }, [query])

  const isSearching = query.trim().length > 0

  return (
    <>
      {/* Full-page fixed background */}
      <div className="fixed inset-0 pointer-events-none" style={{
        zIndex: -1,
        background: 'linear-gradient(to bottom, #6b0000 0%, #3d0000 35%, #1a0000 70%, #0d0a07 100%)',
      }} />

      {/* ═══ HERO ═══ */}
      <section className="relative flex items-center justify-center overflow-hidden"
        style={{ paddingTop: '10rem', paddingBottom: '4rem' }}>

        <div className="relative z-10 text-center px-4 w-full max-w-2xl mx-auto flex flex-col items-center gap-12">

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontFamily: '"IM Fell English", Georgia, serif', fontStyle: 'italic', color: '#d4c5a9', fontSize: 'clamp(1.4rem, 3.5vw, 2.1rem)', lineHeight: 1.4 }}
          >
            The #1 Place for Aesthetic Scenepacks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-stretch justify-center gap-4 w-full"
          >
            <a href="https://payhip.com/Idrissae" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-7 py-5 rounded-lg transition-all duration-200 hover:scale-[1.03] hover:brightness-110 flex-1"
              style={{ background: 'rgba(18,12,10,0.88)', border: '2px solid #e55c35', color: '#e55c35' }}>
              <BagIcon />
              <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#d4c5a9' }}>
                Editing Presets (Payhip)
              </span>
            </a>

            <a href="https://discord.com/invite/98C5YUeEz7" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-7 py-5 rounded-lg transition-all duration-200 hover:scale-[1.03] hover:brightness-110 flex-1"
              style={{ background: 'rgba(18,12,10,0.88)', border: '2px solid #5865F2', color: '#5865F2', boxShadow: '0 0 22px rgba(88,101,242,0.3)' }}>
              <DiscordIcon size={22} />
              <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#ffffff' }}>
                Scenepack Discord Server
              </span>
            </a>

            <a href="https://www.tiktok.com/@idriss.ae" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-7 py-5 rounded-lg transition-all duration-200 hover:scale-[1.03] hover:brightness-110 flex-1"
              style={{ background: 'rgba(18,12,10,0.88)', border: '2px solid rgba(255,255,255,0.35)', color: '#ffffff' }}>
              <TikTokIcon />
              <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#ffffff' }}>
                Follow on TikTok
              </span>
            </a>
          </motion.div>
        </div>

      </section>

      {/* ═══ BROWSE CHARACTERS ═══ */}
      <section className="pb-20 px-4 pt-0" style={{ background: 'transparent' }}>
        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-10">
            <div className="mob-label mb-3">Characters</div>
            <h2 style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#d4c5a9', fontSize: '2.6rem', fontStyle: 'italic' }}>
              Browse Characters
            </h2>
            <div className="divider-stain max-w-[80px] mx-auto mt-4" />
          </motion.div>

          {/* Search bar */}
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10 max-w-xl mx-auto">
            <div className="relative">
              <SearchIcon />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search characters, shows, games..."
                className="w-full pl-11 pr-4 py-3 rounded-lg outline-none transition-all duration-200"
                style={{
                  background: 'rgba(18,10,8,0.9)',
                  border: '2px solid #5e1b21',
                  color: '#d4c5a9',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '0.95rem',
                }}
              />
            </div>
          </motion.div>

          {/* Search results */}
          {isSearching && (
            <div>
              {searchResults.length === 0 ? (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center py-16"
                  style={{ color: '#8a7560', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '1rem' }}>
                  No results found for &ldquo;{query}&rdquo;
                </motion.p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {searchResults.map((char, i) => (
                    <CharCard key={`${char.type}-${char.slug}`} char={char} index={i} isNew={false} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4×3 grid */}
          {!isSearching && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {gridChars.map((char, i) => (
                <CharCard key={`${char.type}-${char.slug}`} char={char} index={i} isNew={i < 6} />
              ))}
            </div>
          )}

          {/* Footer: & more + browse buttons */}
          {!isSearching && (
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="mt-10 flex flex-col items-center gap-5">
              <p style={{ fontFamily: '"IM Fell English", Georgia, serif', fontStyle: 'italic', color: '#847464', fontSize: '14px' }}>
                &amp; more
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                {[
                  { label: 'Browse Shows',  href: '/shows'  },
                  { label: 'Browse Movies', href: '/movies' },
                  { label: 'Browse Games',  href: '/games'  },
                ].map(({ label, href }) => (
                  <Link key={href} href={href}
                    className="w-full sm:w-auto text-center px-8 py-3 rounded-sm transition-all duration-200"
                    style={{ background: '#0f0b08', border: '1px solid #5e1b21', color: '#d4c5a9', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '14px' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#e55c35'; e.currentTarget.style.filter = 'brightness(1.12)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#5e1b21'; e.currentTarget.style.filter = 'brightness(1)' }}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </section>
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CharCard({ char, index, isNew }: { char: any; index: number; isNew: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
    >
      <Link href={char.href} className="block group" style={{ aspectRatio: '1 / 1', position: 'relative', overflow: 'hidden', borderRadius: '0.5rem', display: 'block' }}>
        <div style={{ position: 'absolute', inset: 0, transition: 'border-color 200ms', border: '2px solid rgba(255,255,255,0.07)', borderRadius: '0.5rem', zIndex: 2, pointerEvents: 'none' }}
          className="group-hover:border-[#5e1b21]" />

        {/* Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={char.image}
          alt={char.name}
          className="w-full h-full transition-transform duration-200 group-hover:scale-[1.03]"
          style={{ objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }}
          onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }}
        />

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
        }} />

        {/* NEW badge */}
        {isNew && (
          <div style={{
            position: 'absolute', top: '0.5rem', left: '0.5rem', zIndex: 3,
            background: '#16a34a', color: '#fff',
            fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em',
            padding: '0.2rem 0.45rem', borderRadius: '0.25rem',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}>
            NEW
          </div>
        )}

        {/* Name + franchise */}
        <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem', right: '0.75rem', zIndex: 3 }}>
          <p style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.2, fontFamily: 'Inter, system-ui, sans-serif', margin: 0 }}>
            {char.name}
          </p>
          <p style={{ color: '#a89880', fontSize: '0.75rem', lineHeight: 1.3, fontFamily: 'Inter, system-ui, sans-serif', margin: '0.2rem 0 0' }}>
            {char.parentName}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a7560" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 1 }}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
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
