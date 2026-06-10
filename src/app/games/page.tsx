'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { games } from '@/data/games'
import BackgroundSlideshow from '@/components/BackgroundSlideshow'
import { formatCount } from '@/lib/analytics'

const GAME_BACKGROUNDS = [
  '/backgrounds/rdr2bg.jpg',
  '/backgrounds/arkhambg.jpeg',
]

export default function GamesPage() {
  const [analytics, setAnalytics] = useState<Record<string, { views: number }>>({})

  useEffect(() => {
    fetch('/api/analytics/bulk?type=game')
      .then(r => r.json())
      .then(d => setAnalytics(d))
      .catch(() => {})
  }, [])

  return (
    <>
      <BackgroundSlideshow images={GAME_BACKGROUNDS} mobileBg="#0f0905" />
      <div className="pt-28 pb-20 px-4">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="mob-label mb-3">The Collection</div>
            <h1 className="font-mobsters mb-4" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', color: '#d4c5a9' }}>
              Games
            </h1>
            <div className="mob-divider max-w-[60px] mx-auto mb-4" />
            <p className="text-sm" style={{ color: '#847464' }}>
              {games.length} game{games.length !== 1 ? 's' : ''} &middot; {games.reduce((a: number, g: any) => a + g.characters.length, 0)} characters
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {games.map((game: any, i: number) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <Link href={`/games/${game.slug}`} className="block">
                  <article className="card-clean rounded-md overflow-hidden h-full">
                    <div className="logo-placeholder aspect-video flex items-center justify-center overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={game.theme.logo}
                        alt={game.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const el = e.target as HTMLImageElement
                          el.style.display = 'none'
                        }}
                      />
                    </div>
                    <div className="p-5">
                      <h2 className="font-mobsters leading-tight" style={{ color: '#d4c5a9', fontSize: '1.45rem' }}>
                        {game.name}
                      </h2>
                      <div className="mt-2 mb-3 flex items-center gap-3 flex-wrap">
                        <span className="inline-block text-sm font-semibold" style={{
                          color: '#e8dcc4',
                          background: 'rgba(94,27,33,0.45)',
                          border: '1px solid #5e1b21',
                          borderRadius: '4px',
                          padding: '3px 10px',
                          letterSpacing: '0.03em',
                        }}>
                          {game.characters.length} Character{game.characters.length !== 1 ? 's' : ''}
                        </span>
                        <span className="text-xs" style={{ color: '#847464' }}>
                          {analytics[game.slug] ? formatCount(analytics[game.slug].views) : '—'} views
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#9a8b76' }}>
                        {game.blurb}
                      </p>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
