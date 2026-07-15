'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { sports } from '@/data/sports'
import BackgroundSlideshow from '@/components/BackgroundSlideshow'

export default function SportsClient({ images }: { images: string[] }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return sports
    return sports.filter((s: any) =>
      s.name.toLowerCase().includes(q) ||
      s.characters.some((c: any) => c.name.toLowerCase().includes(q))
    )
  }, [query])

  return (
    <>
      <BackgroundSlideshow images={images} />
      <div className="pt-28 pb-20 px-4">
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
              Sports
            </h1>
            <div className="mob-divider max-w-[60px] mx-auto mb-4" />
            <p className="text-sm" style={{ color: '#847464' }}>
              {sports.length} tournament{sports.length !== 1 ? 's' : ''} &middot; {sports.reduce((a: number, s: any) => a + s.characters.reduce((b: number, c: any) => b + (c.packs ? c.packs.length : 1), 0), 0)} scenepacks
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
              placeholder="Search tournaments or athletes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-sm text-sm focus:outline-none transition-all font-fell"
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
              <p className="font-fell italic">No results for &ldquo;{query}&rdquo;</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((sport: any, i: number) => (
                <motion.div
                  key={sport.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                >
                  <Link href={`/sports/${sport.slug}`} className="block">
                    <article className="card-clean rounded-md overflow-hidden h-full">
                      <div className="logo-placeholder aspect-video flex items-center justify-center overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={sport.theme.logo}
                          alt={sport.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const el = e.target as HTMLImageElement
                            el.style.display = 'none'
                          }}
                        />
                      </div>

                      <div className="p-5">
                        <h2 className="font-mobsters leading-tight" style={{ color: '#d4c5a9', fontSize: '1.45rem' }}>
                          {sport.name}
                        </h2>
                        <div className="mt-2 mb-3">
                          <span className="inline-block text-sm font-semibold" style={{
                            color: '#e8dcc4',
                            background: 'rgba(94,27,33,0.45)',
                            border: '1px solid #5e1b21',
                            borderRadius: '4px',
                            padding: '3px 10px',
                            letterSpacing: '0.03em',
                          }}>
                            {sport.characters.reduce((a: number, c: any) => a + (c.packs ? c.packs.length : 1), 0)} Scenepack{sport.characters.reduce((a: number, c: any) => a + (c.packs ? c.packs.length : 1), 0) !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#9a8b76' }}>
                          {sport.blurb}
                        </p>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
