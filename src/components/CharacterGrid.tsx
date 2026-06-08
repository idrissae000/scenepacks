'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Character { name: string; slug: string; image: string; description: string; packLink: string; groupLabel?: string }

interface Theme {
  accent: string; highlight?: string; text: string; muted: string
  cardText?: string; cardMuted?: string
  headingFont: string; bodyFont: string; cardClass: string
  getPackLabel?: string; stamp?: string; nameUpper?: boolean; lightBg?: boolean
  charZones?: Record<string, { bg: string; border: string; accent: string; label: string; gradient: string }>
}

interface Show { characters: Character[]; theme: Theme }
interface Props { show: Show; baseHref: string }

// Pick readable text color (#111 vs #fff) for a given background hex
function contrastText(hex: string): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq > 150 ? '#141414' : '#ffffff'
}

export default function CharacterGrid({ show, baseHref }: Props) {
  const t = show.theme
  const accent = t.highlight || t.accent
  const cardText = t.cardText || t.text
  const cardMuted = t.cardMuted || t.muted
  const packLabel = t.getPackLabel || 'Get Pack'

  return (
    <section className="relative px-4 pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-6" style={{ background: t.accent }} />
          <div className="mob-label" style={{ color: accent }}>
            {show.characters.length} Character{show.characters.length !== 1 ? 's' : ''} Available
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {show.characters.map((char, i) => {
            const zone = t.charZones?.[char.slug]
            const cAccent = zone ? zone.accent : accent
            const initials = char.name.split(' ').map((w) => w[0]).join('')
            const prevGroupLabel = i > 0 ? show.characters[i - 1].groupLabel : undefined
            const showGroupHeader = char.groupLabel && char.groupLabel !== prevGroupLabel

            return (
              <React.Fragment key={char.slug}>
                {showGroupHeader && (
                  <div className="col-span-full flex items-center gap-4 mt-4 mb-1">
                    <div className="h-px flex-1 opacity-20" style={{ background: accent }} />
                    <span style={{ fontFamily: t.headingFont, color: accent, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.7 }}>
                      {char.groupLabel}
                    </span>
                    <div className="h-px flex-1 opacity-20" style={{ background: accent }} />
                  </div>
                )}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Link href={`${baseHref}/${char.slug}`} className="block group">
                  <article
                    className={`${t.cardClass} rounded-md overflow-hidden h-full`}
                    style={zone ? { background: zone.gradient, borderColor: `${zone.border}66` } : undefined}
                  >
                    {t.stamp && <span className="stamp-classified">{t.stamp}</span>}

                    {/* Character portrait */}
                    <div className="relative overflow-hidden w-full" style={{ aspectRatio: '1 / 1' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={char.image}
                        alt={char.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          const el = e.target as HTMLImageElement
                          el.style.display = 'none'
                          const fb = el.nextElementSibling as HTMLElement | null
                          if (fb) fb.style.display = 'flex'
                        }}
                      />
                      {/* Initials fallback (shown if image missing) */}
                      <div className="absolute inset-0 items-center justify-center hidden" aria-hidden="true" style={{
                        background: 'rgba(0,0,0,0.3)',
                      }}>
                        <span className="select-none" style={{
                          fontFamily: t.headingFont, color: cAccent, opacity: 0.3,
                          fontSize: '5rem', lineHeight: 1, fontWeight: 700,
                        }}>
                          {initials}
                        </span>
                      </div>
                      {/* Gradient overlay at bottom for text legibility */}
                      <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
                      {zone && (
                        <span className="absolute top-3 left-3 text-xs px-2 py-0.5 rounded-sm" style={{
                          fontFamily: t.headingFont, color: zone.accent, border: `1px solid ${zone.border}`,
                          letterSpacing: '0.08em', background: 'rgba(0,0,0,0.5)',
                        }}>
                          {zone.label}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="mb-2 leading-tight" style={{
                        fontFamily: t.headingFont, color: cardText, fontSize: '1.2rem', fontWeight: 700,
                        textTransform: t.nameUpper ? 'uppercase' : undefined,
                        letterSpacing: t.nameUpper ? '0.1em' : undefined,
                      }}>
                        {char.name}
                      </h3>
                      <p className="text-sm leading-relaxed line-clamp-3 mb-4" style={{ color: cardMuted, fontFamily: t.bodyFont }}>
                        {char.description}
                      </p>
                      <span
                        className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-sm text-xs tracking-wider uppercase"
                        style={{
                          fontFamily: t.headingFont, fontWeight: 700,
                          background: cAccent, border: `1px solid ${cAccent}`, color: t.cardText || '#ffffff',
                        }}
                      >
                        <DiscordIcon /> {packLabel}
                      </span>
                    </div>
                  </article>
                </Link>
              </motion.div>
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function DiscordIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.033.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}
