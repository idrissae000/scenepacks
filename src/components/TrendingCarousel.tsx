'use client'

import { useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { TrendingChar } from '@/lib/serverData'

const CARD_W = 224
const GAP = 14
const STEP = CARD_W + GAP
const SPEED = 0.36

interface TrendingCarouselProps {
  chars: TrendingChar[]
}

export default function TrendingCarousel({ chars }: TrendingCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const pausedRef = useRef(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (chars.length === 0) return
    const totalHalf = chars.length * STEP

    const tick = () => {
      if (!pausedRef.current) {
        offsetRef.current += SPEED
        if (offsetRef.current >= totalHalf) offsetRef.current -= totalHalf
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [chars.length])

  const advance = useCallback((dir: 1 | -1) => {
    const totalHalf = chars.length * STEP
    offsetRef.current = ((offsetRef.current + dir * STEP) % totalHalf + totalHalf) % totalHalf
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`
    }
  }, [chars.length])

  if (chars.length === 0) return null

  const doubled = [...chars, ...chars]

  return (
    <div style={{ marginBottom: '2.5rem' }}>
      {/* Heading */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.9rem', paddingLeft: '0.25rem' }}>
        <span style={{ fontSize: '1rem', lineHeight: 1 }}>🔥</span>
        <span style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontWeight: 700,
          fontSize: '0.8rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#8b0000',
        }}>Trending</span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, #8b0000, transparent)', opacity: 0.4 }} />
      </div>

      {/* Carousel viewport */}
      <div style={{ position: 'relative' }}>
        {/* Left arrow */}
        <button
          onClick={() => advance(-1)}
          aria-label="Previous"
          style={{
            position: 'absolute', left: '-18px', top: '50%', transform: 'translateY(-50%)',
            zIndex: 10, background: 'rgba(13,10,7,0.9)', border: '1px solid rgba(139,0,0,0.5)',
            borderRadius: '50%', width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#d4c5a9', transition: 'border-color 150ms, background 150ms',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#8b0000'; (e.currentTarget as HTMLButtonElement).style.background = '#1a0000' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(139,0,0,0.5)'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(13,10,7,0.9)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Right arrow */}
        <button
          onClick={() => advance(1)}
          aria-label="Next"
          style={{
            position: 'absolute', right: '-18px', top: '50%', transform: 'translateY(-50%)',
            zIndex: 10, background: 'rgba(13,10,7,0.9)', border: '1px solid rgba(139,0,0,0.5)',
            borderRadius: '50%', width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#d4c5a9', transition: 'border-color 150ms, background 150ms',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#8b0000'; (e.currentTarget as HTMLButtonElement).style.background = '#1a0000' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(139,0,0,0.5)'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(13,10,7,0.9)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Overflow mask */}
        <div
          style={{ overflow: 'hidden', position: 'relative' }}
          onMouseEnter={() => { pausedRef.current = true }}
          onMouseLeave={() => { pausedRef.current = false }}
        >
          {/* Left/right fade masks */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '56px', background: 'linear-gradient(to right, #0d0a07, transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '56px', background: 'linear-gradient(to left, #0d0a07, transparent)', zIndex: 2, pointerEvents: 'none' }} />

          {/* Scrolling track */}
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              gap: `${GAP}px`,
              width: `${doubled.length * STEP}px`,
              willChange: 'transform',
            }}
          >
            {doubled.map((char, i) => (
              <CarouselCard key={`${char.analyticsSlug}-${i}`} char={char} priority={i < 3} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function CarouselCard({ char, priority }: { char: TrendingChar; priority?: boolean }) {
  return (
    <Link
      href={char.href}
      style={{
        flexShrink: 0,
        width: `${CARD_W}px`,
        aspectRatio: '1 / 1',
        borderRadius: '6px',
        overflow: 'hidden',
        display: 'block',
        position: 'relative',
        border: '1px solid rgba(255,255,255,0.08)',
        transition: 'transform 200ms ease, border-color 200ms ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.transform = 'scale(1.03)'
        el.style.borderColor = '#8b0000'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.transform = 'scale(1)'
        el.style.borderColor = 'rgba(255,255,255,0.08)'
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={char.image}
        alt={char.name}
        loading={priority ? 'eager' : 'lazy'}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
        onError={e => { (e.target as HTMLImageElement).style.opacity = '0' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)' }} />
      <div style={{
        position: 'absolute', top: '0.4rem', left: '0.4rem',
        background: '#8b0000', color: '#fff',
        fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em',
        padding: '0.18rem 0.4rem', borderRadius: '0.2rem',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}>
        TRENDING
      </div>
      <div style={{ position: 'absolute', bottom: '0.6rem', left: '0.5rem', right: '0.5rem' }}>
        <p style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.88rem', lineHeight: 1.2, fontFamily: 'Inter, system-ui, sans-serif', margin: 0 }}>
          {char.name}
        </p>
        <p style={{ color: '#9a8b76', fontSize: '0.72rem', fontFamily: 'Inter, system-ui, sans-serif', margin: '0.2rem 0 0', lineHeight: 1.2 }}>
          {char.parentName}
        </p>
      </div>
    </Link>
  )
}
