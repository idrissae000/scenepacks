'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface Character {
  name: string; slug: string; image: string; description: string; packLink: string
}

interface Theme {
  bg: string; surface: string; accent: string; accentLight: string
  gold: string; text: string; muted: string; border: string
  headingFont: string; bodyFont: string; gradient: string
  heroOverlay: string; label: string; tagline: string
  patternClass: string; emojis: string[]
}

interface Parent {
  name: string; slug: string; theme: Theme
}

interface Props {
  character: Character; parent: Parent; type: 'show' | 'movie'
}

export default function CharacterPage({ character, parent, type }: Props) {
  const t = parent.theme
  const initials = character.name.split(' ').map((w: string) => w[0]).join('')

  return (
    <div style={{ background: t.bg, minHeight: '100vh' }} className={t.patternClass}>
      <section className="relative pt-24 pb-10 px-4 overflow-hidden">
        <div className="absolute inset-0" style={{ background: t.gradient }} />
        <div className="absolute inset-0" style={{ background: t.heroOverlay }} />
        <div className="absolute top-16 left-0 right-0 h-px opacity-20"
          style={{ background: `linear-gradient(90deg, transparent, ${t.gold}, transparent)` }} />

        <div className="relative z-10 mx-auto max-w-5xl">
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
            <Link href={`/${type}s/${parent.slug}`} style={{ color: t.muted }} className="hover:opacity-80 transition-opacity">{parent.name}</Link>
            <span>/</span>
            <span style={{ color: t.gold }}>{character.name}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div
                className="relative aspect-[3/4] rounded-sm overflow-hidden flex items-center justify-center"
                style={{ background: t.surface, border: `1px solid ${t.border}` }}
              >
                {/* Letterbox bars */}
                <div className="absolute top-0 left-0 right-0 h-8 z-10" style={{ background: t.bg }} />
                <div className="absolute bottom-0 left-0 right-0 h-8 z-10" style={{ background: t.bg }} />

                {/* Placeholder initials — remove when real image is added */}
                <span className="text-[8rem] font-black select-none leading-none opacity-[0.08]"
                  style={{ fontFamily: t.headingFont, color: t.gold }}>
                  {initials}
                </span>
                {/* TODO: Replace placeholder with real image: */}
                {/* <Image src={character.image} alt={character.name} fill className="object-cover object-top" /> */}

                {/* Emojis badge */}
                <div className="absolute top-12 right-4 z-10 flex flex-col gap-1">
                  {t.emojis.slice(0, 3).map((e, i) => (
                    <span key={i} className="text-xl opacity-50">{e}</span>
                  ))}
                </div>

                <div className="absolute inset-x-0 bottom-0 h-40 z-[5]"
                  style={{ background: `linear-gradient(to top, ${t.surface}, transparent)` }} />

                {/* Gold corner brackets */}
                {['top-8 left-3', 'top-8 right-3', 'bottom-8 left-3', 'bottom-8 right-3'].map((pos, idx) => (
                  <div key={idx} className={`absolute ${pos} w-8 h-8 z-10`} style={{
                    borderTop: idx < 2 ? `2px solid ${t.gold}55` : 'none',
                    borderBottom: idx >= 2 ? `2px solid ${t.gold}55` : 'none',
                    borderLeft: idx % 2 === 0 ? `2px solid ${t.gold}55` : 'none',
                    borderRight: idx % 2 === 1 ? `2px solid ${t.gold}55` : 'none',
                  }} />
                ))}

                <div className="absolute bottom-10 left-0 right-0 text-center z-10 px-4">
                  <div className="mob-label" style={{ color: t.gold, opacity: 0.5 }}>{t.label}</div>
                </div>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col gap-6"
            >
              {/* Show badge */}
              <div className="flex items-center gap-2">
                <div className="h-px w-6" style={{ background: t.accent }} />
                <span className="mob-label" style={{ color: t.gold }}>{parent.name}</span>
              </div>

              {/* Name */}
              <h1 className="leading-none" style={{ fontFamily: t.headingFont, color: t.text, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900 }}>
                {character.name}
              </h1>

              {/* Rule */}
              <div className="h-px" style={{ background: `linear-gradient(90deg, ${t.accent}, ${t.gold}, transparent)` }} />

              {/* Description */}
              <p className="text-sm leading-relaxed" style={{ color: t.muted, fontFamily: t.bodyFont }}>
                {character.description}
              </p>

              {/* Pack details box */}
              <div className="rounded-sm p-5" style={{ background: t.surface, border: `1px solid ${t.border}` }}>
                <div className="mob-label mb-3" style={{ color: t.gold }}>Pack Includes</div>
                <ul className="space-y-2 text-xs" style={{ color: t.muted, fontFamily: t.bodyFont }}>
                  {[
                    'High-quality cinematic scene clips',
                    'Color-graded for aesthetic edits',
                    'Multiple aspect ratios available',
                    'Free to use — no credit required (but appreciated)',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span style={{ color: t.gold, marginTop: '1px' }}>—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs mt-4 opacity-40" style={{ color: t.muted, fontStyle: 'italic' }}>
                  * Pack details are placeholder — update with real scene info
                </p>
              </div>

              {/* CTA */}
              <a
                href={character.packLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 py-4 rounded-sm font-bold tracking-wider uppercase transition-all duration-200"
                style={{
                  fontFamily: t.headingFont,
                  fontSize: '1.1rem',
                  background: `linear-gradient(135deg, ${t.accent}, ${t.accentLight})`,
                  color: t.text,
                  boxShadow: `0 4px 24px ${t.accent}50`,
                  border: `1px solid ${t.gold}30`,
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 6px 32px ${t.accent}70`}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 4px 24px ${t.accent}50`}
              >
                <DiscordIcon /> Get Pack on Discord
              </a>

              <Link
                href={`/${type}s/${parent.slug}`}
                className="text-center text-xs tracking-widest uppercase opacity-50 hover:opacity-80 transition-opacity"
                style={{ color: t.muted, fontFamily: t.bodyFont }}
              >
                ← Back to {parent.name}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

function DiscordIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.033.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}
