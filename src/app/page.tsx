'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useMemo, useRef, useEffect } from 'react'
import { shows } from '@/data/shows'
import { movies } from '@/data/movies'
import { games } from '@/data/games'
import TrendingCarousel from '@/components/TrendingCarousel'

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

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<FilterType>(() => loadPref('filter', 'all' as FilterType))
  const [sortType, setSortType] = useState<SortType>(() => loadPref('sortType', 'newest' as SortType))
  const [sortDesc, setSortDesc] = useState<boolean>(() => loadPref('sortDesc', true))
  const [analytics, setAnalytics] = useState<Record<string, { views: number }>>({})
  const [trendingSlugs, setTrendingSlugs] = useState<Set<string>>(new Set())
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [loadingMore, setLoadingMore] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/trending')
      .then(r => r.json())
      .then(({ trending }: { trending: string[] }) => setTrendingSlugs(new Set(trending ?? [])))
      .catch(() => {})
  }, [])

  useEffect(() => {
    fetch('/api/analytics/bulk?type=character')
      .then(r => r.json())
      .then(d => setAnalytics(d))
      .catch(() => {})
  }, [])

  // Persist sort/filter preferences
  useEffect(() => {
    try { localStorage.setItem('scenepack-prefs', JSON.stringify({ sortType, sortDesc, filter })) } catch (_) {}
  }, [sortType, sortDesc, filter])

  // Reset visible count when sort/filter changes
  useEffect(() => { setVisibleCount(PAGE_SIZE) }, [sortType, sortDesc, filter])

  // Full sorted list for the character grid
  const sortedAllChars = useMemo(() => {
    if (sortType === 'popular') {
      const withViews = ALL_CHARS.map(c => ({ ...c, views: analytics[c.analyticsSlug]?.views ?? 0 }))
      return sortDesc
        ? [...withViews].sort((a, b) => b.views - a.views)
        : [...withViews].sort((a, b) => a.views - b.views)
    }
    // newest: always pin NEW_CHARS first, then sort the rest
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
    <>
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
              className="flex items-center justify-center gap-3 px-7 py-5 rounded-lg transition-all duration-200 hover:scale-[1.02] hover:brightness-110 flex-1"
              style={{ background: 'rgba(18,12,10,0.88)', border: '2px solid #f5a3c7', color: '#f5a3c7' }}>
              <BagIcon />
              <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#f5a3c7' }}>
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

      {/* ═══ BROWSE ═══ */}
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
          <TrendingCarousel />

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
    </>
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
              {item.characters.length} char{item.characters.length !== 1 ? 's' : ''}
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
