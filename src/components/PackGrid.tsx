'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PackCard from './PackCard'

interface Pack {
  id: number
  name: string
  slug: string
  description: string
  image: string
  discordLink: string
}

interface PackGridProps {
  packs: Pack[]
  showSearch?: boolean
}

export default function PackGrid({ packs, showSearch = true }: PackGridProps) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return packs
    const q = query.toLowerCase()
    return packs.filter((p) => p.name.toLowerCase().includes(q))
  }, [packs, query])

  return (
    <div className="space-y-8">
      {showSearch && (
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-cinema-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search characters..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-cinema-card border border-cinema-border rounded-sm text-sm text-cinema-text placeholder-cinema-muted focus:outline-none focus:border-cinema-gold/50 focus:ring-1 focus:ring-cinema-gold/20 transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-4 flex items-center text-cinema-muted hover:text-cinema-text transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      )}

      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-20 text-cinema-muted"
          >
            <p className="text-lg">No packs found for &ldquo;{query}&rdquo;</p>
            <p className="text-sm mt-2">Try a different character name.</p>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((pack, i) => (
              <PackCard key={pack.id} pack={pack} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {query && filtered.length > 0 && (
        <p className="text-center text-xs text-cinema-muted tracking-wider">
          {filtered.length} pack{filtered.length !== 1 ? 's' : ''} found
        </p>
      )}
    </div>
  )
}
