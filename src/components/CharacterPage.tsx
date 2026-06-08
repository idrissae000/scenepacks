'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import PageAtmosphere from './PageAtmosphere'

interface Pack { label: string; image: string; packLink: string }
interface Character { name: string; slug: string; image: string; description: string; packLink: string; pageImage?: string; packs?: Pack[] }

interface Theme {
  accent: string; accentLight: string; highlight?: string
  text: string; muted: string; cardText?: string
  headingFont: string; bodyFont: string; cardClass: string
  label: string; cursor?: string; lightBg?: boolean
  getPackLabel?: string; nameUpper?: boolean
  texClass?: string; atmosphere?: string[]; loadFx?: string | null
  charZones?: Record<string, { bg: string; border: string; accent: string; label: string; gradient: string }>
}

interface Parent { name: string; slug: string; theme: Theme }
interface Props { character: Character; parent: Parent; type: 'show' | 'movie' | 'game' }

function contrastText(hex: string): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq > 150 ? '#141414' : '#ffffff'
}

export default function CharacterPage({ character, parent, type }: Props) {
  const t = parent.theme
  const zone = t.charZones?.[character.slug]
  const accent = zone ? zone.accent : (t.highlight || t.accent)
  const initials = character.name.split(' ').map((w) => w[0]).join('')
  const pageImage = character.pageImage || `/character-pages/${character.slug}.png`

  return (
    <div className="relative" style={{ minHeight: '100vh', cursor: t.cursor || 'default' }}>
      <PageAtmosphere theme={t} />

      <section className="relative pt-28 pb-16 px-4" style={{ zIndex: 1 }}>
        <div className="absolute top-20 left-0 right-0 h-px opacity-25"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />

        <div className="mx-auto max-w-5xl">
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
            <Link href={`/${type}s/${parent.slug}`} style={{ color: t.muted }} className="hover:opacity-80 transition-opacity">{parent.name}</Link>
            <span>/</span>
            <span style={{ color: accent }}>{character.name}</span>
          </motion.div>

          {character.packs ? (
            /* ── Multi-pack layout ── */
            <div className="flex flex-col gap-10">
              {/* Header */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px w-6" style={{ background: t.accent }} />
                  <span className="mob-label" style={{ color: accent }}>{parent.name}</span>
                </div>
                <h1 className="leading-[0.95] mb-4" style={{
                  fontFamily: t.headingFont, color: t.text, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700,
                }}>
                  {character.name}
                </h1>
                <div className="h-px mb-5" style={{ background: `linear-gradient(90deg, ${t.accent}, ${accent}, transparent)` }} />
                <p className="text-base leading-relaxed max-w-2xl" style={{ color: t.muted, fontFamily: t.bodyFont }}>
                  {character.description}
                </p>
              </motion.div>

              {/* Pack Includes */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
                className="rounded-md p-5 max-w-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${accent}33` }}>
                <div className="mob-label mb-3" style={{ color: accent }}>Pack Includes</div>
                <ul className="space-y-2 text-sm" style={{ color: t.muted, fontFamily: t.bodyFont }}>
                  {['High-quality cinematic scene clips', 'Individual clips prioritized for aesthetic edits', '1080p 24fps 16:9'].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span style={{ color: accent, marginTop: '1px' }}>—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2">
                    <span style={{ color: accent, marginTop: '1px' }}>—</span>
                    <span>Free to use — credit required<br />
                      <span style={{ color: accent, fontWeight: 700 }}>Credit: @idriss.ae on TikTok</span>
                    </span>
                  </li>
                </ul>
              </motion.div>

              {/* Pack cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {character.packs.map((pack, i) => (
                  <motion.div
                    key={pack.label}
                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.2 + i * 0.1 }}
                  >
                    <div className={`${t.cardClass} rounded-md overflow-hidden flex flex-col`}>
                      {/* Pack image */}
                      <div className="relative overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={pack.image}
                          alt={pack.label}
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            const el = e.target as HTMLImageElement
                            el.style.display = 'none'
                            const fb = el.nextElementSibling as HTMLElement | null
                            if (fb) fb.style.display = 'flex'
                          }}
                        />
                        <div className="absolute inset-0 items-center justify-center hidden" aria-hidden="true">
                          <span className="select-none" style={{ fontFamily: t.headingFont, color: accent, opacity: 0.16, fontSize: '5rem', fontWeight: 700 }}>
                            {initials}
                          </span>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }} />
                      </div>
                      {/* Pack footer */}
                      <div className="p-4 flex flex-col gap-3">
                        <div style={{ fontFamily: t.headingFont, color: t.text, fontSize: '1.15rem', fontWeight: 700 }}>
                          {pack.label}
                        </div>
                        <a href={pack.packLink} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 py-3 rounded-sm tracking-wider uppercase transition-transform duration-200 hover:scale-[1.02]"
                          style={{
                            fontFamily: t.headingFont, fontSize: '0.85rem', fontWeight: 700,
                            background: `linear-gradient(135deg, ${t.accent}, ${accent})`,
                            color: contrastText(accent), border: `1px solid ${accent}55`,
                          }}
                        >
                          <DiscordIcon /> Get Pack
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link href={`/${type}s/${parent.slug}`} className="text-center text-xs tracking-widest uppercase opacity-60 hover:opacity-90 transition-opacity"
                style={{ color: t.muted, fontFamily: t.bodyFont }}>
                ← Back to {parent.name}
              </Link>
            </div>
          ) : (
            /* ── Single-pack layout (original) ── */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Portrait */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
                <div
                  className={`${t.cardClass} rounded-md overflow-hidden relative`}
                  style={{ aspectRatio: '1 / 1', ...(zone ? { background: zone.gradient, borderColor: `${zone.border}66` } : {}) }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pageImage}
                    alt={character.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement
                      el.style.display = 'none'
                      const fb = el.nextElementSibling as HTMLElement | null
                      if (fb) fb.style.display = 'flex'
                    }}
                  />
                  <div className="absolute inset-0 items-center justify-center hidden" aria-hidden="true">
                    <span className="select-none" style={{ fontFamily: t.headingFont, color: accent, opacity: 0.16, fontSize: '7rem', fontWeight: 700 }}>
                      {initials}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Info */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-px w-6" style={{ background: t.accent }} />
                  <span className="mob-label" style={{ color: accent }}>{zone ? zone.label : parent.name}</span>
                </div>

                <h1 className="leading-[0.95]" style={{
                  fontFamily: t.headingFont, color: t.text, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700,
                  textTransform: t.nameUpper ? 'uppercase' : undefined, letterSpacing: t.nameUpper ? '0.06em' : undefined,
                }}>
                  {character.name}
                </h1>

                <div className="h-px" style={{ background: `linear-gradient(90deg, ${t.accent}, ${accent}, transparent)` }} />

                <p className="text-base leading-relaxed" style={{ color: t.muted, fontFamily: t.bodyFont }}>
                  {character.description}
                </p>

                <div className="rounded-md p-5" style={{ background: t.lightBg ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.03)', border: `1px solid ${accent}33` }}>
                  <div className="mob-label mb-3" style={{ color: accent }}>Pack Includes</div>
                  <ul className="space-y-2 text-sm" style={{ color: t.muted, fontFamily: t.bodyFont }}>
                    {['High-quality cinematic scene clips', 'Individual clips prioritized for aesthetic edits', '1080p 24fps 16:9'].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span style={{ color: accent, marginTop: '1px' }}>—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                    <li className="flex items-start gap-2">
                      <span style={{ color: accent, marginTop: '1px' }}>—</span>
                      <span>
                        Free to use — credit required<br />
                        <span style={{ color: accent, fontWeight: 700 }}>Credit: @idriss.ae on TikTok</span>
                      </span>
                    </li>
                  </ul>
                </div>

                <a href={character.packLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 py-4 rounded-md tracking-wider uppercase transition-transform duration-200 hover:scale-[1.02]"
                  style={{
                    fontFamily: t.headingFont, fontSize: '1.1rem', fontWeight: 700,
                    background: `linear-gradient(135deg, ${t.accent}, ${accent})`,
                    color: contrastText(accent), boxShadow: `0 4px 24px ${accent}40`, border: `1px solid ${accent}55`,
                  }}
                >
                  <DiscordIcon /> {t.getPackLabel ? t.getPackLabel : 'Get Pack on Discord'}
                </a>

                <Link href={`/${type}s/${parent.slug}`} className="text-center text-xs tracking-widest uppercase opacity-60 hover:opacity-90 transition-opacity"
                  style={{ color: t.muted, fontFamily: t.bodyFont }}>
                  ← Back to {parent.name}
                </Link>
              </motion.div>
            </div>
          )}
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
