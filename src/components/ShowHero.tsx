'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface Show {
  name: string
  theme: {
    bg: string; surface: string; accent: string; accentLight: string
    gold: string; text: string; muted: string; border: string
    font: string; mood: string; gradient: string; heroOverlay: string
    label: string; tagline: string
  }
}

interface Props {
  show: Show
  type: 'show' | 'movie'
}

export default function ShowHero({ show, type }: Props) {
  const t = show.theme
  const useSerif = t.font === 'serif'

  return (
    <section className="relative pt-24 pb-16 px-4 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0" style={{ background: t.gradient }} />
      <div className="absolute inset-0" style={{ background: t.heroOverlay }} />
      {/* Subtle horizontal rule */}
      <div className="absolute top-16 left-0 right-0 h-px opacity-20"
        style={{ background: `linear-gradient(90deg, transparent, ${t.gold}, transparent)` }} />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-xs mb-10"
          style={{ color: t.muted }}
        >
          <Link href="/" style={{ color: t.muted }} className="hover:opacity-80 transition-opacity">Home</Link>
          <span>/</span>
          <Link href={`/${type}s`} style={{ color: t.muted }} className="hover:opacity-80 transition-opacity capitalize">{type}s</Link>
          <span>/</span>
          <span style={{ color: t.gold }}>{show.name}</span>
        </motion.div>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="flex items-center gap-3 mb-5"
        >
          <div className="h-px w-8" style={{ background: t.accent }} />
          <span className="text-xs tracking-widest uppercase font-medium" style={{ color: t.gold }}>
            {t.label}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-7xl font-black leading-none mb-4"
          style={{
            fontFamily: useSerif ? 'var(--font-playfair)' : 'var(--font-inter)',
            color: t.text,
          }}
        >
          {show.name}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-base sm:text-lg mb-8"
          style={{ color: t.muted, fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}
        >
          &ldquo;{t.tagline}&rdquo;
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="h-px max-w-xs origin-left"
          style={{ background: `linear-gradient(90deg, ${t.accent}, ${t.gold}, transparent)` }}
        />
      </div>
    </section>
  )
}
