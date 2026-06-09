'use client'

import { useState, useEffect, useRef } from 'react'

interface Props {
  images: string[]
  mobileBg?: string
}

// Shuffle array (Fisher-Yates) — called once on mount
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const DISPLAY_MS = 2000
const FADE_MS = 800
const DESKTOP_BREAKPOINT = 768

export default function BackgroundSlideshow({ images, mobileBg = '#0d0a07' }: Props) {
  const [order] = useState(() => shuffle(images))
  const [isDesktop, setIsDesktop] = useState(false)
  // Two layer indices — activeLayer alternates 0/1
  const [activeLayer, setActiveLayer] = useState(0)
  const [layerSrc, setLayerSrc] = useState<[string, string]>([order[0] ?? '', order[1] ?? order[0] ?? ''])
  const idxRef = useRef(0)

  // Detect desktop on mount and on resize
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > DESKTOP_BREAKPOINT)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Preload all images on mount (desktop only — no point loading on mobile)
  useEffect(() => {
    if (!isDesktop) return
    order.forEach(src => {
      const img = new Image()
      img.src = src
    })
  }, [order, isDesktop])

  useEffect(() => {
    if (!isDesktop || order.length <= 1) return

    const timer = setInterval(() => {
      idxRef.current = (idxRef.current + 1) % order.length
      const next = order[idxRef.current]
      const incoming = activeLayer === 0 ? 1 : 0

      setLayerSrc(prev => {
        const updated: [string, string] = [...prev] as [string, string]
        updated[incoming] = next
        return updated
      })
      setActiveLayer(incoming)
    }, DISPLAY_MS + FADE_MS)

    return () => clearInterval(timer)
  }, [order, activeLayer, isDesktop])

  const overlay = 'linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.82))'

  // Mobile: solid color only
  if (!isDesktop) {
    return (
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1, background: mobileBg }} />
    )
  }

  // Desktop: full cross-fade slideshow
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      {([0, 1] as const).map(layer => (
        <div
          key={layer}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `${overlay}, url(${layerSrc[layer]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: activeLayer === layer ? 1 : 0,
            transition: `opacity ${FADE_MS}ms ease-in-out`,
            willChange: 'opacity',
          }}
        />
      ))}
      {/* Fallback base color so there's never a white flash */}
      <div style={{ position: 'absolute', inset: 0, background: '#0d0a07', zIndex: -1 }} />
    </div>
  )
}
