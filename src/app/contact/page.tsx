'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { shows } from '@/data/shows'
import { movies } from '@/data/movies'
import { games } from '@/data/games'

const totalChars = (shows as any[]).reduce((a, s) => a + s.characters.length, 0)
  + (movies as any[]).reduce((a, m) => a + m.characters.length, 0)
  + (games as any[]).reduce((a, g) => a + g.characters.length, 0)

const OPPORTUNITIES = [
  {
    title: 'Pre-Download Sponsorships',
    desc: 'Your brand shown before users access a scenepack. High intent, highly engaged audience.',
  },
  {
    title: 'Affiliate Partnerships',
    desc: 'Promote editing tools, presets, plugins or software your audience actually uses.',
  },
  {
    title: 'Brand Deals & Shoutouts',
    desc: 'Featured placement on the site, Discord server, or TikTok.',
  },
  {
    title: 'Sponsored Packs',
    desc: 'Commission a themed scenepack around your product or IP.',
  },
  {
    title: 'Collaborations',
    desc: 'Creator collabs, joint content, cross-promotion opportunities.',
  },
  {
    title: 'Custom Opportunities',
    desc: "Have something else in mind? Reach out — we're open to it.",
  },
]

const STATS = [
  { value: `${totalChars}`, label: 'Characters Available' },
  { value: '15M+', label: 'TikTok Views' },
  { value: '900+', label: 'Discord Members' },
]

const ACCENT = '#e55c35'
const MUTED = '#847464'
const TEXT = '#d4c5a9'
const HEADING_FONT = '"Mobsters","Palatino Linotype",serif'
const BODY_FONT = 'Inter, system-ui, sans-serif'

export default function ContactPage() {
  return (
    <div className="relative" style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #1a0800 0%, #0f0602 40%, #080604 100%)' }}>
      {/* top line */}
      <div className="absolute top-20 left-0 right-0 h-px opacity-20"
        style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />

      <div className="mx-auto max-w-4xl px-4 pt-28 pb-24">

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-xs mb-12 flex-wrap"
          style={{ color: MUTED, fontFamily: BODY_FONT }}
        >
          <Link href="/" style={{ color: MUTED }} className="hover:opacity-80 transition-opacity">Home</Link>
          <span>/</span>
          <span style={{ color: ACCENT }}>Business Inquiries</span>
        </motion.div>

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px w-8" style={{ background: ACCENT }} />
            <span className="mob-label" style={{ color: ACCENT }}>Business</span>
          </div>
          <h1 style={{ fontFamily: HEADING_FONT, color: TEXT, fontSize: 'clamp(2.8rem, 8vw, 5rem)', lineHeight: 0.95, fontWeight: 700 }}>
            Work With Us
          </h1>
          <div className="h-px mt-5 mb-6 max-w-xs" style={{ background: `linear-gradient(90deg, ${ACCENT}, transparent)` }} />
          <p className="text-base sm:text-lg leading-relaxed max-w-2xl" style={{ color: MUTED, fontFamily: BODY_FONT }}>
            Idriss Scenes reaches a highly engaged audience of video editors, content creators, and fans of prestige TV, film and gaming. If you have an opportunity worth exploring, we want to hear from it.
          </p>
        </motion.div>

        {/* ── Stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-16"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              className="rounded-md p-5 text-center"
              style={{ background: 'rgba(229,92,53,0.06)', border: `1px solid ${ACCENT}30` }}
            >
              <div style={{ fontFamily: HEADING_FONT, color: ACCENT, fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', lineHeight: 1, fontWeight: 700 }}>
                {s.value}
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest" style={{ color: MUTED, fontFamily: BODY_FONT }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Opportunities ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px w-6" style={{ background: ACCENT }} />
            <span className="mob-label" style={{ color: ACCENT }}>Partnerships</span>
          </div>
          <h2 style={{ fontFamily: HEADING_FONT, color: TEXT, fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', lineHeight: 0.95, fontWeight: 700, marginBottom: '1.5rem' }}>
            What We&apos;re Open To
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {OPPORTUNITIES.map((op, i) => (
              <motion.div
                key={op.title}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.07 }}
                className="rounded-md p-5"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(94,27,33,0.4)' }}
              >
                <div className="flex items-start gap-2 mb-2">
                  <span style={{ color: ACCENT, lineHeight: 1.6 }}>—</span>
                  <div style={{ fontFamily: HEADING_FONT, color: TEXT, fontSize: '1.1rem', lineHeight: 1.2 }}>
                    {op.title}
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: MUTED, fontFamily: BODY_FONT, paddingLeft: '1.1rem' }}>
                  {op.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Contact ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
          className="rounded-md p-8"
          style={{ background: 'rgba(229,92,53,0.04)', border: `1px solid ${ACCENT}40` }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px w-6" style={{ background: ACCENT }} />
            <span className="mob-label" style={{ color: ACCENT }}>Contact</span>
          </div>
          <h2 style={{ fontFamily: HEADING_FONT, color: TEXT, fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', lineHeight: 0.95, fontWeight: 700, marginBottom: '1rem' }}>
            Get In Touch
          </h2>
          <p className="text-sm mb-5" style={{ color: MUTED, fontFamily: BODY_FONT }}>
            Send a detailed message about your opportunity to:
          </p>

          <a
            href="mailto:idriss.ae000@gmail.com"
            className="inline-block mb-6 transition-opacity hover:opacity-80"
            style={{ fontFamily: HEADING_FONT, color: ACCENT, fontSize: 'clamp(1.3rem, 4vw, 2rem)', wordBreak: 'break-all', lineHeight: 1.2 }}
          >
            idriss.ae000@gmail.com
          </a>

          <p className="text-sm mb-8 leading-relaxed max-w-lg" style={{ color: MUTED, fontFamily: BODY_FONT, fontStyle: 'italic' }}>
            Please include details about your brand, the type of opportunity, and your budget or proposal. We respond to serious inquiries only.
          </p>

          <div className="h-px mb-8" style={{ background: `linear-gradient(90deg, ${ACCENT}40, transparent)` }} />

          <p className="text-sm mb-4" style={{ color: MUTED, fontFamily: BODY_FONT }}>
            Prefer Discord? Reach out directly in our server.
          </p>
          <a
            href="https://discord.com/invite/98C5YUeEz7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-semibold tracking-wider uppercase transition-transform hover:scale-[1.02]"
            style={{
              fontFamily: HEADING_FONT,
              background: 'rgba(18,12,10,0.88)',
              border: `1px solid ${ACCENT}`,
              color: ACCENT,
            }}
          >
            <DiscordIcon /> Join the Server
          </a>
        </motion.div>

      </div>
    </div>
  )
}

function DiscordIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.033.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}
