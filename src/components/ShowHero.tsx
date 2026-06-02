'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface Show {
  name: string
  theme: {
    bg: string; surface: string; accent: string; accentLight: string
    gold: string; text: string; muted: string; border: string
    headingFont: string; bodyFont: string
    patternClass: string; animClass: string
    emojis: string[]
    gradient: string; heroOverlay: string; label: string; tagline: string
  }
}

interface Props { show: Show; type: 'show' | 'movie' }

export default function ShowHero({ show, type }: Props) {
  const t = show.theme

  return (
    <section
      className={`relative pt-24 pb-16 px-4 overflow-hidden ${t.patternClass} ${t.animClass}`}
    >
      {/* BG layers */}
      <div className="absolute inset-0" style={{ background: t.gradient }} />
      <div className="absolute inset-0" style={{ background: t.heroOverlay }} />

      {/* Batman special: bat signal */}
      {show.name === 'Batman (2022)' && <BatSignal color={t.gold} />}

      {/* MCU special: starfield layer */}
      {show.name === 'Marvel Cinematic Universe' && <StarfieldLayer />}

      {/* Top accent rule */}
      <div className="absolute top-16 left-0 right-0 h-px opacity-20"
        style={{ background: `linear-gradient(90deg, transparent, ${t.gold}, transparent)` }} />

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
          <span style={{ color: t.muted }}>/</span>
          <Link href={`/${type}s`} style={{ color: t.muted }} className="hover:opacity-80 transition-opacity capitalize">{type}s</Link>
          <span style={{ color: t.muted }}>/</span>
          <span style={{ color: t.gold }}>{show.name}</span>
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
          <span className="mob-label" style={{ color: t.gold }}>{t.label}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`text-5xl sm:text-7xl font-black leading-none mb-4 ${t.animClass === 'anim-neon-flicker' ? 'anim-neon-flicker' : ''} ${t.animClass === 'anim-torch-flicker' ? 'anim-torch-flicker' : ''} ${t.animClass === 'anim-flash' ? 'anim-flash' : ''} ${t.animClass === 'anim-kitchen' ? 'anim-kitchen' : ''}`}
          style={{ fontFamily: t.headingFont, color: t.text }}
        >
          {show.name}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-base sm:text-lg mb-8"
          style={{ color: t.muted, fontFamily: t.bodyFont, fontStyle: 'italic' }}
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

function BatSignal({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]">
      <div
        className="absolute"
        style={{
          width: '500px',
          height: '500px',
          top: '50%',
          left: '50%',
          animation: 'batSignalRotate 25s linear infinite',
          background: `conic-gradient(${color}20 0deg 30deg, transparent 30deg 180deg, ${color}20 180deg 210deg, transparent 210deg 360deg)`,
          borderRadius: '50%',
        }}
      />
    </div>
  )
}

function StarfieldLayer() {
  return (
    <div
      className="absolute inset-0 pointer-events-none anim-star-drift opacity-80"
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
          radial-gradient(circle 1px at 58% 40%, rgba(255,255,255,0.35) 0%, transparent 100%),
          radial-gradient(circle 2px at 82% 85%, rgba(106,13,173,0.8) 0%, transparent 100%),
          radial-gradient(circle 1px at 27% 55%, rgba(255,255,255,0.3) 0%, transparent 100%)
        `,
      }}
    />
  )
}
