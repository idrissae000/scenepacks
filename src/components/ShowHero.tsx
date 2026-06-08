'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Theme {
  accent: string; accentLight: string; highlight: string
  text: string; muted: string
  headingFont: string; bodyFont: string
  titleFx?: string | null; lightBg?: boolean; timer?: boolean
  label: string; tagline: string; logo?: string
}

interface Show { name: string; theme: Theme }
interface Props { show: Show; type: 'show' | 'movie' | 'game' }

export default function ShowHero({ show, type }: Props) {
  const t = show.theme
  const accent = t.highlight || t.accent

  return (
    <section className="relative pt-28 pb-12 px-4">
      <div className="absolute top-20 left-0 right-0 h-px opacity-25"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />

      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-xs mb-10 flex-wrap"
          style={{ color: t.muted, fontFamily: t.bodyFont }}
        >
          <Link href="/" style={{ color: t.muted }} className="hover:opacity-80 transition-opacity">Home</Link>
          <span>/</span>
          <Link href={`/${type}s`} style={{ color: t.muted }} className="hover:opacity-80 transition-opacity capitalize">{type}s</Link>
          <span>/</span>
          <span style={{ color: accent }}>{show.name}</span>
        </motion.div>

        {/* Label + optional kitchen timer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}
          className="flex items-center gap-3 mb-5"
        >
          <div className="h-px w-8" style={{ background: t.accent }} />
          <span className="mob-label" style={{ color: accent }}>{t.label}</span>
          {t.timer && <KitchenTimer accent={accent} font={t.bodyFont} />}
        </motion.div>

        {/* Title */}
        <Title show={show} accent={accent} />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base sm:text-lg mb-8 max-w-2xl"
          style={{ color: t.muted, fontFamily: t.bodyFont, fontStyle: 'italic' }}
        >
          &ldquo;{t.tagline}&rdquo;
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="h-px max-w-xs origin-left"
          style={{ background: `linear-gradient(90deg, ${t.accent}, ${accent}, transparent)` }}
        />
      </div>
    </section>
  )
}

function Title({ show, accent }: { show: Show; accent: string }) {
  const t = show.theme
  const baseStyle = { fontFamily: t.headingFont, color: t.text } as React.CSSProperties
  const cls = 'text-5xl sm:text-7xl leading-[0.95] mb-4 font-bold'

  if (t.titleFx === 'word-fade') {
    const words = show.name.split(' ')
    return (
      <h1 className={cls} style={baseStyle}>
        {words.map((w, i) => (
          <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.5 }} style={{ display: 'inline-block', marginRight: '0.25em' }}>
            {w}
          </motion.span>
        ))}
      </h1>
    )
  }

  const fxClass = t.titleFx === 'neon' ? 'anim-neon' : t.titleFx === 'dissolve' ? 'anim-chem-dissolve' : ''
  return (
    <motion.h1
      initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
      className={`${cls} ${fxClass}`} style={baseStyle}
    >
      {show.name}
    </motion.h1>
  )
}

function KitchenTimer({ accent, font }: { accent: string; font: string }) {
  const [s, setS] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setS((v) => v + 1), 1000)
    return () => clearInterval(id)
  }, [])
  const mm = String(Math.floor(s / 60)).padStart(2, '0')
  const ss = String(s % 60).padStart(2, '0')
  return (
    <span className="ml-2 px-2 py-0.5 text-xs tabular-nums" style={{
      fontFamily: font, color: accent, border: `1px solid ${accent}`, borderRadius: 3, letterSpacing: '0.1em',
    }}>
      {mm}:{ss}
    </span>
  )
}
