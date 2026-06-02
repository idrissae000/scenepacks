'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface Character {
  name: string
  slug: string
  image: string
  description: string
  packLink: string
}

interface Show {
  characters: Character[]
  theme: {
    bg: string; surface: string; accent: string; accentLight: string
    gold: string; text: string; muted: string; border: string
    font: string
  }
}

interface Props {
  show: Show
  baseHref: string
}

export default function CharacterGrid({ show, baseHref }: Props) {
  const t = show.theme
  const useSerif = t.font === 'serif'

  return (
    <section className="px-4 pb-20">
      <div className="mx-auto max-w-7xl">
        <div className="mob-label mb-8" style={{ color: t.gold }}>
          {show.characters.length} Character{show.characters.length !== 1 ? 's' : ''} Available
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {show.characters.map((char, i) => (
            <motion.div
              key={char.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
            >
              <Link href={`${baseHref}/${char.slug}`} className="block group">
                <div
                  className="rounded-sm overflow-hidden transition-all duration-300 group-hover:ring-1"
                  style={{
                    background: t.surface,
                    border: `1px solid ${t.border}`,
                    boxShadow: `0 8px 32px rgba(0,0,0,0.5)`,
                    '--tw-ring-color': t.gold + '40',
                  } as React.CSSProperties}
                >
                  {/* Color band */}
                  <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${t.accent}, ${t.gold}, transparent)` }} />

                  {/* Image placeholder */}
                  <div className="relative aspect-[4/3] flex items-center justify-center overflow-hidden"
                    style={{ background: t.bg }}>
                    <span className="text-6xl font-black select-none opacity-10"
                      style={{ fontFamily: useSerif ? 'var(--font-playfair)' : 'var(--font-inter)', color: t.gold }}>
                      {char.name.split(' ').map((w: string) => w[0]).join('')}
                    </span>
                    {/* TODO: replace with actual image */}
                    {/* <Image src={char.image} alt={char.name} fill className="object-cover" /> */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `radial-gradient(ellipse at center, ${t.accent}20, transparent)` }} />
                    <div className="absolute bottom-0 left-0 right-0 h-12"
                      style={{ background: `linear-gradient(to top, ${t.surface}, transparent)` }} />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3
                      className="text-base font-semibold mb-2 leading-tight"
                      style={{
                        color: t.text,
                        fontFamily: useSerif ? 'var(--font-playfair)' : 'var(--font-inter)',
                      }}
                    >
                      {char.name}
                    </h3>
                    <p className="text-xs leading-relaxed line-clamp-2 mb-4" style={{ color: t.muted }}>
                      {char.description}
                    </p>
                    <a
                      href={char.packLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-sm text-xs font-bold tracking-widest uppercase transition-all duration-200"
                      style={{
                        background: 'transparent',
                        border: `1px solid ${t.gold}50`,
                        color: t.gold,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = t.gold + '15'
                        e.currentTarget.style.borderColor = t.gold + 'aa'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.borderColor = t.gold + '50'
                      }}
                    >
                      <DiscordIcon /> Get Pack
                    </a>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
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
