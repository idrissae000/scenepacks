'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useMemo, useRef, useEffect } from 'react'
import { shows } from '@/data/shows'
import { movies } from '@/data/movies'
import { games } from '@/data/games'
import TrendingCarousel from '@/components/TrendingCarousel'
import { TrendingChar } from '@/lib/serverData'

type FilterType = 'all' | 'show' | 'movie' | 'game'
type SortType = 'popular' | 'newest'

const PAGE_SIZE = 12

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildAllChars(): any[] {
  const result: any[] = []
  for (const s of shows as any[]) {
    for (const c of s.characters) {
      result.push({
        name: c.name, slug: c.slug, image: c.image,
        dateAdded: c.dateAdded || '2020-01-01',
        parentName: s.name, parentSlug: s.slug,
        type: 'show', href: `/shows/${s.slug}/${c.slug}`,
        analyticsSlug: `${s.slug}__${c.slug}`,
      })
    }
  }
  for (const m of movies as any[]) {
    for (const c of m.characters) {
      result.push({
        name: c.name, slug: c.slug, image: c.image,
        dateAdded: c.dateAdded || '2020-01-01',
        parentName: m.name, parentSlug: m.slug,
        type: 'movie', href: `/movies/${m.slug}/${c.slug}`,
        analyticsSlug: `${m.slug}__${c.slug}`,
      })
    }
  }
  for (const g of games as any[]) {
    for (const c of g.characters) {
      result.push({
        name: c.name, slug: c.slug, image: c.image,
        dateAdded: c.dateAdded || '2020-01-01',
        parentName: g.name, parentSlug: g.slug,
        type: 'game', href: `/games/${g.slug}/${c.slug}`,
        analyticsSlug: `${g.slug}__${c.slug}`,
      })
    }
  }
  return result
}

const ALL_CHARS = buildAllChars()
const sortedByDate = [...ALL_CHARS].sort((a, b) => b.dateAdded.localeCompare(a.dateAdded))
const NEW_CHARS = sortedByDate.slice(0, 6)
const REST_CHARS = sortedByDate.slice(6)
const NEW_SLUGS = new Set(NEW_CHARS.map(c => c.analyticsSlug))

const FILTER_PILLS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Shows', value: 'show' },
  { label: 'Movies', value: 'movie' },
  { label: 'Games', value: 'game' },
]

const SORT_OPTIONS: { label: string; value: SortType }[] = [
  { label: 'Most Popular', value: 'popular' },
  { label: 'Newest', value: 'newest' },
]

function loadPref<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try { const p = JSON.parse(localStorage.getItem('scenepack-prefs') || '{}'); return (p[key] as T) ?? fallback } catch { return fallback }
}

interface HomeBrowseProps {
  trendingChars: TrendingChar[]
  initialAnalytics: Record<string, { views: number; downloads: number }>
}

export default function HomeBrowse({ trendingChars, initialAnalytics }: HomeBrowseProps) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<FilterType>(() => loadPref('filter', 'all' as FilterType))
  const [sortType, setSortType] = useState<SortType>(() => loadPref('sortType', 'newest' as SortType))
  const [sortDesc, setSortDesc] = useState<boolean>(() => loadPref('sortDesc', true))
  const [analytics] = useState<Record<string, { views: number; downloads: number }>>(initialAnalytics)
  const trendingSlugs = useMemo(() => new Set(trendingChars.map(c => c.analyticsSlug)), [trendingChars])
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [loadingMore, setLoadingMore] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Persist sort/filter preferences
  useEffect(() => {
    try { localStorage.setItem('scenepack-prefs', JSON.stringify({ sortType, sortDesc, filter })) } catch (_) {}
  }, [sortType, sortDesc, filter])

  // Reset visible count when sort/filter changes
  useEffect(() => { setVisibleCount(PAGE_SIZE) }, [sortType, sortDesc, filter])

  const sortedAllChars = useMemo(() => {
    if (sortType === 'popular') {
      const withViews = ALL_CHARS.map(c => ({ ...c, views: analytics[c.analyticsSlug]?.views ?? 0 }))
      return sortDesc
        ? [...withViews].sort((a, b) => b.views - a.views)
        : [...withViews].sort((a, b) => a.views - b.views)
    }
    const rest = sortDesc
      ? [...REST_CHARS].sort((a, b) => b.dateAdded.localeCompare(a.dateAdded))
      : [...REST_CHARS].sort((a, b) => a.dateAdded.localeCompare(b.dateAdded))
    return [...NEW_CHARS, ...rest]
  }, [sortType, sortDesc, analytics])

  const isSearching = query.trim().length > 0

  const searchResults = useMemo(() => {
    if (!isSearching) return []
    const q = query.trim().toLowerCase()
    if (filter === 'all') {
      return ALL_CHARS.filter(c =>
        c.name.toLowerCase().includes(q) || c.parentName.toLowerCase().includes(q)
      )
    }
    if (filter === 'show') {
      return (shows as any[]).filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.characters.some((c: any) => c.name.toLowerCase().includes(q))
      )
    }
    if (filter === 'movie') {
      return (movies as any[]).filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.characters.some((c: any) => c.name.toLowerCase().includes(q))
      )
    }
    return (games as any[]).filter(g =>
      g.name.toLowerCase().includes(q) ||
      g.characters.some((c: any) => c.name.toLowerCase().includes(q))
    )
  }, [query, filter, isSearching])

  const showCategoryCards = filter !== 'all' && !isSearching
  const showCharGrid = filter === 'all' && !isSearching

  const categoryItems = useMemo(() => {
    if (filter === 'show') return shows as any[]
    if (filter === 'movie') return movies as any[]
    if (filter === 'game') return games as any[]
    return []
  }, [filter])

  const categoryHrefBase = filter === 'show' ? '/shows' : filter === 'movie' ? '/movies' : '/games'

  const visibleChars = sortedAllChars.slice(0, visibleCount)
  const hasMore = visibleCount < sortedAllChars.length

  const handleLoadMore = () => {
    setLoadingMore(true)
    setTimeout(() => {
      setVisibleCount(v => v + PAGE_SIZE)
      setLoadingMore(false)
    }, 300)
  }

  const pillBase: React.CSSProperties = {
    background: '#0f0b08', color: '#847464',
    border: '1px solid #3d1215', borderRadius: '999px',
    padding: '6px 16px', fontSize: '13px', fontWeight: 500,
    fontFamily: 'Inter, system-ui, sans-serif', cursor: 'pointer',
    transition: 'all 0.18s ease', whiteSpace: 'nowrap',
  }
  const pillActive: React.CSSProperties = {
    background: '#5e1b21', color: '#d4c5a9', border: '1px solid transparent',
  }

  return (
    <section className="pb-20 px-4 pt-0">
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

        {/* Trending Carousel */}
        <TrendingCarousel chars={trendingChars} />

        {/* Controls */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 max-w-4xl mx-auto flex flex-col gap-3">
          {/* Search */}
          <div className="relative">
            <SearchIcon />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={filter === 'all' ? 'Search characters, shows, games...' : `Search ${filter}s...`}
              className="w-full pl-11 pr-4 py-3 rounded-lg outline-none transition-all duration-200"
              style={{
                background: 'rgba(18,10,8,0.9)', border: '2px solid #5e1b21',
                color: '#d4c5a9', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.95rem',
              }}
            />
          </div>

          {/* Filter pills + sort */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0" style={{ scrollbarWidth: 'none' }}>
              {FILTER_PILLS.map(pill => (
                <button key={pill.value} onClick={() => { setFilter(pill.value); setQuery('') }}
                  style={{ ...pillBase, ...(filter === pill.value ? pillActive : {}) }}>
                  {pill.label}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {filter === 'all' && (
                <motion.div key="sort"
                  initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center gap-2 shrink-0"
                >
                  <select value={sortType} onChange={e => setSortType(e.target.value as SortType)}
                    style={{
                      background: '#0f0b08', border: '1px solid #3d1215', color: '#847464',
                      borderRadius: '999px', padding: '6px 28px 6px 12px', fontSize: '13px',
                      fontFamily: 'Inter, system-ui, sans-serif', cursor: 'pointer', outline: 'none', appearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23847464' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center',
                    }}>
                    {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>

                  <button onClick={() => setSortDesc(v => !v)} title="Reverse order"
                    style={{
                      background: '#0f0b08', border: '1px solid #3d1215', borderRadius: '50%',
                      width: '32px', height: '32px', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
                    }}>
                    <motion.svg animate={{ rotate: sortDesc ? 0 : 180 }} transition={{ duration: 0.22, ease: 'easeInOut' }}
                      width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="#847464" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </motion.svg>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── Content ── */}
        <AnimatePresence mode="wait">

          {/* Search results */}
          {isSearching && (
            <motion.div key="search" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              {searchResults.length === 0 ? (
                <p className="text-center py-16" style={{ color: '#8a7560', fontFamily: 'Inter, system-ui, sans-serif' }}>
                  No results for &ldquo;{query}&rdquo;
                </p>
              ) : filter === 'all' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {(searchResults as any[]).map((char, i) => (
                    <CharCard key={`${char.type}-${char.parentSlug}-${char.slug}`} char={char} index={i}
                      isNew={NEW_SLUGS.has(char.analyticsSlug)} isTrending={trendingSlugs.has(char.analyticsSlug)} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-w-5xl mx-auto">
                  {(searchResults as any[]).map((item, i) => (
                    <CompactCategoryCard key={item.id} item={item} index={i} hrefBase={categoryHrefBase} />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Category cards */}
          {showCategoryCards && (
            <motion.div key={`cat-${filter}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-w-5xl mx-auto">
                {categoryItems.map((item: any, i: number) => (
                  <CompactCategoryCard key={item.id} item={item} index={i} hrefBase={categoryHrefBase} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Character grid with Load More */}
          {showCharGrid && (
            <motion.div key="chars" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {visibleChars.map((char, i) => (
                  <CharCard key={`${char.type}-${char.parentSlug}-${char.slug}`} char={char} index={i}
                    isNew={sortType !== 'popular' && NEW_SLUGS.has(char.analyticsSlug)}
                    isTrending={trendingSlugs.has(char.analyticsSlug)} />
                ))}
              </div>

              {hasMore && (
                <div className="mt-10 flex justify-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    style={{
                      background: loadingMore ? '#1a1008' : '#0f0b08',
                      border: '1px solid #5e1b21', color: '#d4c5a9',
                      borderRadius: '999px', padding: '12px 36px',
                      fontSize: '14px', fontFamily: 'Inter, system-ui, sans-serif',
                      fontWeight: 500, cursor: loadingMore ? 'default' : 'pointer',
                      transition: 'all 0.18s ease',
                    }}
                    onMouseEnter={e => { if (!loadingMore) e.currentTarget.style.background = '#5e1b21' }}
                    onMouseLeave={e => { e.currentTarget.style.background = loadingMore ? '#1a1008' : '#0f0b08' }}
                  >
                    {loadingMore ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CharCard({ char, index, isNew, isTrending }: { char: any; index: number; isNew: boolean; isTrending?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3) }}
    >
      <Link href={char.href} className="block group"
        style={{ aspectRatio: '1 / 1', position: 'relative', overflow: 'hidden', borderRadius: '0.5rem', display: 'block' }}>
        <div style={{ position: 'absolute', inset: 0, transition: 'border-color 200ms', border: '2px solid rgba(255,255,255,0.07)', borderRadius: '0.5rem', zIndex: 2, pointerEvents: 'none' }}
          className="group-hover:border-[#5e1b21]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={char.image} alt={char.name}
          className="w-full h-full transition-transform duration-200 group-hover:scale-[1.03]"
          style={{ objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }}
          onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }}
        />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)' }} />
        {isNew && (
          <div style={{
            position: 'absolute', top: '0.5rem', left: '0.5rem', zIndex: 3,
            background: '#16a34a', color: '#fff', fontSize: '0.65rem', fontWeight: 700,
            letterSpacing: '0.08em', padding: '0.2rem 0.45rem', borderRadius: '0.25rem',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}>NEW</div>
        )}
        {isTrending && (
          <div style={{
            position: 'absolute', top: isNew ? '1.8rem' : '0.5rem', left: '0.5rem', zIndex: 3,
            background: '#8b0000', color: '#fff', fontSize: '0.65rem', fontWeight: 700,
            letterSpacing: '0.08em', padding: '0.2rem 0.45rem', borderRadius: '0.25rem',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}>TRENDING</div>
        )}
        <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem', right: '0.75rem', zIndex: 3 }}>
          <p style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.2, fontFamily: 'Inter, system-ui, sans-serif', margin: 0 }}>{char.name}</p>
          <p style={{ color: '#a89880', fontSize: '0.75rem', lineHeight: 1.3, fontFamily: 'Inter, system-ui, sans-serif', margin: '0.2rem 0 0' }}>{char.parentName}</p>
        </div>
      </Link>
    </motion.div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CompactCategoryCard({ item, index, hrefBase }: { item: any; index: number; hrefBase: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
    >
      <Link href={`${hrefBase}/${item.slug}`} className="block group">
        <article className="rounded-md overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(94,27,33,0.35)', transition: 'border-color 0.18s' }}>
          <div className="overflow-hidden" style={{ aspectRatio: '16/9' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.theme.logo} alt={item.name}
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.04]"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
          </div>
          <div className="px-3 py-2.5">
            <h2 className="font-mobsters leading-tight truncate" style={{ color: '#d4c5a9', fontSize: '1rem' }}>{item.name}</h2>
            <span className="inline-block mt-1 text-xs font-semibold" style={{
              color: '#e8dcc4', background: 'rgba(94,27,33,0.45)',
              border: '1px solid #5e1b21', borderRadius: '3px', padding: '1px 7px',
            }}>
              {item.characters.reduce((a: number, c: any) => a + (c.packs ? c.packs.length : 1), 0)} Scenepack{item.characters.reduce((a: number, c: any) => a + (c.packs ? c.packs.length : 1), 0) !== 1 ? 's' : ''}
            </span>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a7560" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 1 }}>
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}
