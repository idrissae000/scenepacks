'use client'

import { motion } from 'framer-motion'
import { comingSoon } from '@/data/coming-soon'

const categoryColors: Record<string, string> = {
  Show:  'rgba(94,27,33,0.5)',
  Movie: 'rgba(30,40,80,0.5)',
  Game:  'rgba(60,30,10,0.5)',
}
const categoryBorders: Record<string, string> = {
  Show:  '#5e1b21',
  Movie: '#2a3a6a',
  Game:  '#5a2a0a',
}

export default function ComingSoonPage() {
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
          <div className="mob-label mb-3">In the Pipeline</div>
          <h1 className="font-mobsters mb-4" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', color: '#d4c5a9' }}>
            Coming Soon
          </h1>
          <div className="mob-divider max-w-[60px] mx-auto mb-4" />
          <p className="text-sm font-fell italic" style={{ color: '#847464' }}>
            These packs are in the works. Check back soon.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {comingSoon.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <article
                className="rounded-md overflow-hidden h-full flex flex-col"
                style={{
                  background: 'rgba(10,7,4,0.85)',
                  border: '1px solid rgba(60,35,20,0.4)',
                  borderTop: '3px solid rgba(80,40,15,0.5)',
                  filter: 'saturate(0.7)',
                  opacity: 0.82,
                }}
              >
                {/* Muted placeholder image area */}
                <div
                  className="w-full flex items-center justify-center"
                  style={{
                    aspectRatio: '16 / 9',
                    background: 'rgba(15,10,5,0.9)',
                    borderBottom: '1px solid rgba(60,35,20,0.3)',
                  }}
                >
                  <span style={{
                    fontFamily: '"Mobsters","Palatino Linotype",serif',
                    color: 'rgba(132,116,100,0.2)',
                    fontSize: '3.5rem',
                    letterSpacing: '0.05em',
                    userSelect: 'none',
                  }}>
                    ?
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  {/* Category badge */}
                  <div>
                    <span
                      className="inline-block text-xs font-semibold"
                      style={{
                        background: categoryColors[item.category] || 'rgba(60,35,20,0.4)',
                        border: `1px solid ${categoryBorders[item.category] || '#5e1b21'}`,
                        color: '#a09080',
                        borderRadius: '4px',
                        padding: '2px 8px',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        fontSize: '0.68rem',
                        fontFamily: 'Inter, system-ui, sans-serif',
                      }}
                    >
                      {item.category}
                    </span>
                  </div>

                  {/* Name */}
                  <h2
                    className="font-mobsters leading-tight"
                    style={{ color: '#8a7a68', fontSize: '1.3rem' }}
                  >
                    {item.name}
                  </h2>

                  {/* Franchise */}
                  <p
                    className="text-sm font-fell italic"
                    style={{ color: '#5a4e40' }}
                  >
                    {item.franchise}
                  </p>

                  {/* Coming Soon label */}
                  <div className="mt-auto pt-2">
                    <div
                      className="flex items-center justify-center w-full py-2.5 rounded-sm text-xs tracking-widest uppercase"
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontWeight: 600,
                        background: 'rgba(20,14,8,0.8)',
                        border: '1px solid rgba(80,55,30,0.3)',
                        color: '#5a4e3a',
                        letterSpacing: '0.15em',
                      }}
                    >
                      Coming Soon
                    </div>
                  </div>
                </div>
              </article>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
