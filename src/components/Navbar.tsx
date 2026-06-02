'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState } from 'react'

const links = [
  { label: 'Home',    href: '/' },
  { label: 'Shows',   href: '/shows' },
  { label: 'Movies',  href: '/movies' },
  { label: 'Request', href: '/request' },
  { label: 'Support', href: '/support' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(13,10,7,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid #5e1b21',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left — logo (Mobsters) */}
          <Link href="/" className="flex items-baseline gap-2 shrink-0">
            <span style={{ fontFamily: '"Mobsters","Palatino Linotype",serif', color: '#d4c5a9', fontSize: '1.55rem', lineHeight: 1 }}>
              Idriss.ae
            </span>
            <span style={{ color: '#847464', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
              Scenepacks
            </span>
          </Link>

          {/* Center — nav links */}
          <nav className="hidden md:flex items-center gap-0.5">
            {links.map(({ label, href }) => {
              const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className="relative px-4 py-2 transition-colors duration-200"
                  style={{
                    fontFamily: '"IM Fell English", Georgia, serif',
                    fontSize: '0.95rem',
                    letterSpacing: '0.04em',
                    color: active ? '#d4c5a9' : '#847464',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#d4c5a9' }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = '#847464' }}
                >
                  {label}
                  {active && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-0 left-2 right-2 h-px"
                      style={{ background: '#5e1b21' }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right — Join the Family */}
          <div className="flex items-center gap-3">
            <a
              href="https://discord.gg/MVA5ySY2"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 btn-join rounded-sm px-6 py-2.5 text-sm"
            >
              <DiscordIcon /> Join the Family
            </a>

            <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Menu">
              <div className="w-5 space-y-1.5">
                {[0, 1, 2].map(i => (
                  <span key={i} className={`block h-px transition-all duration-200 ${
                    i === 0 && open ? 'rotate-45 translate-y-2' :
                    i === 1 && open ? 'opacity-0' :
                    i === 2 && open ? '-rotate-45 -translate-y-2' : ''
                  }`} style={{ background: '#5e1b21' }} />
                ))}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden"
          style={{ background: '#0a0704', borderTop: '1px solid #2a1410' }}
        >
          <div className="px-4 py-4 space-y-1">
            {links.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 transition-colors"
                style={{ fontFamily: '"IM Fell English", Georgia, serif', fontSize: '1.05rem', color: '#847464', letterSpacing: '0.04em' }}
                onMouseEnter={e => e.currentTarget.style.color = '#d4c5a9'}
                onMouseLeave={e => e.currentTarget.style.color = '#847464'}
              >
                {label}
              </Link>
            ))}
            <a
              href="https://discord.gg/MVA5ySY2"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 btn-join rounded-sm px-5 py-3 mt-2 w-full"
            >
              <DiscordIcon /> Join the Family
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

function DiscordIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.033.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}
