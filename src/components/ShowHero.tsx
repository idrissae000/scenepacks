'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

interface Show {
  name: string
  theme: {
    bg: string; surface: string; accent: string; accentLight: string
    highlight?: string; text: string; muted: string; border: string
    headingFont: string; bodyFont: string
    patternClass: string
    emojis: string[]
    gradient: string; heroOverlay: string; label: string; tagline: string
    cursor?: string; specialFx?: string; lightBg?: boolean
  }
}

interface Props { show: Show; type: 'show' | 'movie' }

export default function ShowHero({ show, type }: Props) {
  const t = show.theme
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const el = containerRef.current

    if (t.specialFx === 'rumble') {
      el.style.animation = 'pageRumble 0.4s ease'
      const clear = () => { el.style.animation = '' }
      el.addEventListener('animationend', clear, { once: true })
    }
    if (t.specialFx === 'muzzle') {
      const flash = document.createElement('div')
      flash.style.cssText = 'position:fixed;inset:0;background:white;opacity:0.7;pointer-events:none;z-index:9999;'
      document.body.appendChild(flash)
      setTimeout(() => flash.remove(), 80)
    }
    if (t.specialFx === 'kitchen-cut') {
      el.style.animation = 'kitchenShake 0.25s ease'
      const clear = () => { el.style.animation = '' }
      el.addEventListener('animationend', clear, { once: true })
    }
  }, [t.specialFx])

  const isLight = t.lightBg === true
  const accentColor = isLight ? t.accent : (t.highlight || t.accent)

  return (
    <section
      ref={containerRef}
      className={`relative pt-24 pb-16 px-4 overflow-hidden ${t.patternClass}`}
      style={{ background: t.bg, cursor: t.cursor || 'default' }}
    >
      {/* BG layers */}
      <div className="absolute inset-0" style={{ background: t.gradient }} />
      <div className="absolute inset-0" style={{ background: t.heroOverlay }} />

      {/* Special FX overlays */}
      {t.specialFx === 'smoke' && <SmokeLayer color={t.accent} />}
      {t.specialFx === 'scanline' && <ScanlineLayer />}
      {t.specialFx === 'bat-signal' && <BatSignal color={t.highlight || t.accent} />}
      {t.specialFx === 'stars' && <StarfieldLayer />}

      {/* Top accent rule */}
      <div className="absolute top-16 left-0 right-0 h-px opacity-20"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-xs mb-10 flex-wrap"
          style={{ color: t.muted, fontFamily: t.bodyFont }}
        >
          <Link href="/" style={{ color: t.muted }} className="hover:opacity-80 transition-opacity">Home</Link>
          <span>/</span>
          <Link href={`/${type}s`} style={{ color: t.muted }} className="hover:opacity-80 transition-opacity capitalize">{type}s</Link>
          <span>/</span>
          <span style={{ color: accentColor }}>{show.name}</span>
        </motion.div>

        {/* Emojis */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-4 text-2xl"
        >
          {t.emojis.map((e, i) => (
            <span key={i} className="opacity-70">{e}</span>
          ))}
        </motion.div>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="flex items-center gap-3 mb-5"
        >
          <div className="h-px w-8" style={{ background: t.accent }} />
          <span className="mob-label" style={{ color: accentColor }}>{t.label}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`text-5xl sm:text-7xl font-black leading-none mb-4 ${t.specialFx === 'neon' ? 'anim-neon' : ''} ${t.specialFx === 'torch' ? 'anim-torch' : ''} ${t.specialFx === 'dissolve' ? 'anim-chem-dissolve' : ''}`}
          style={{ fontFamily: t.headingFont, color: t.text }}
        >
          {show.name}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-base sm:text-lg mb-8 font-fell italic"
          style={{ color: t.muted }}
        >
          &ldquo;{t.tagline}&rdquo;
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="h-px max-w-xs origin-left"
          style={{ background: `linear-gradient(90deg, ${t.accent}, ${accentColor}, transparent)` }}
        />
      </div>
    </section>
  )
}

function SmokeLayer({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[
        { left: '15%', delay: '0s', dur: '8s', alt: false },
        { left: '35%', delay: '2s', dur: '10s', alt: true },
        { left: '55%', delay: '1s', dur: '9s', alt: false },
        { left: '70%', delay: '3s', dur: '11s', alt: true },
        { left: '85%', delay: '0.5s', dur: '7s', alt: false },
      ].map((s, i) => (
        <div
          key={i}
          className="absolute bottom-0 w-32 h-32 rounded-full blur-3xl opacity-20"
          style={{
            left: s.left,
            background: color,
            animation: `${s.alt ? 'smokeRiseAlt' : 'smokeRise'} ${s.dur} ease-in-out ${s.delay} infinite`,
          }}
        />
      ))}
    </div>
  )
}

function ScanlineLayer() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)' }}
    >
      <div
        className="absolute left-0 right-0 h-12"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(44,95,138,0.15), transparent)',
          animation: 'scanlineDown 4s linear infinite',
        }}
      />
    </div>
  )
}

function BatSignal({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.06]">
      <div
        className="absolute"
        style={{
          width: '600px', height: '600px',
          top: '50%', left: '50%',
          animation: 'batRotate 25s linear infinite',
          background: `conic-gradient(${color}30 0deg 30deg, transparent 30deg 180deg, ${color}30 180deg 210deg, transparent 210deg 360deg)`,
          borderRadius: '50%',
        }}
      />
    </div>
  )
}

function StarfieldLayer() {
  return (
    <div
      className="absolute inset-0 pointer-events-none anim-stars opacity-70"
      style={{
        backgroundImage: `
          radial-gradient(circle 1px at 5% 8%, rgba(0,212,255,0.7) 0%, transparent 100%),
          radial-gradient(circle 1px at 18% 32%, rgba(255,255,255,0.5) 0%, transparent 100%),
          radial-gradient(circle 1px at 33% 5%, rgba(0,212,255,0.6) 0%, transparent 100%),
          radial-gradient(circle 1px at 47% 48%, rgba(255,255,255,0.6) 0%, transparent 100%),
          radial-gradient(circle 1px at 62% 18%, rgba(0,212,255,0.5) 0%, transparent 100%),
          radial-gradient(circle 1px at 75% 65%, rgba(200,180,255,0.6) 0%, transparent 100%),
          radial-gradient(circle 1px at 88% 12%, rgba(0,212,255,0.7) 0%, transparent 100%),
          radial-gradient(circle 1px at 12% 68%, rgba(255,255,255,0.4) 0%, transparent 100%),
          radial-gradient(circle 1px at 40% 78%, rgba(0,212,255,0.5) 0%, transparent 100%),
          radial-gradient(circle 2px at 82% 85%, rgba(106,13,173,0.8) 0%, transparent 100%)
        `,
      }}
    />
  )
}
