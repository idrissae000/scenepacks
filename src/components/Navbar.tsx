'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

const links = [
  { label: 'Home',   href: '/' },
  { label: 'Shows',  href: '/shows' },
  { label: 'Movies', href: '/movies' },
  { label: 'Games',  href: '/games' },
  { label: 'Sports', href: '/sports' },
  { label: 'Apply',  href: '/apply' },
]

const moreLinks: { label: string; href: string }[] = []

export default function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [moreExpanded, setMoreExpanded] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  const moreActive = moreLinks.some(l => pathname.startsWith(l.href))

  const closeDrawer = useCallback(() => {
    setMobileOpen(false)
    setMoreExpanded(false)
  }, [])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Handle browser back button closing drawer
  useEffect(() => {
    if (!mobileOpen) return
    const handlePopState = () => closeDrawer()
    window.history.pushState(null, '', window.location.href)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [mobileOpen, closeDrawer])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false)
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setUserMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    setDropdownOpen(false)
    setUserMenuOpen(false)
    closeDrawer()
  }, [pathname, closeDrawer])

  return (
    <>
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

            {/* Brand */}
            <Link href="/" className="relative flex flex-col shrink-0" style={{ lineHeight: 1 }}>
              <span style={{ fontFamily: '"Mobsters","Palatino Linotype",serif', color: '#d4c5a9', fontSize: '1.55rem', lineHeight: 1 }}>
                Idriss Scenes
              </span>
              <span style={{
                fontFamily: '"Great Vibes", cursive',
                color: '#a08868',
                fontSize: '1.25rem',
                marginTop: '-0.5rem',
                paddingLeft: '0.4rem',
                lineHeight: 1,
              }}>
                aesthetic scenepacks
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {links.map(({ label, href }) => {
                const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
                return (
                  <Link
                    key={href}
                    href={href}
                    className="relative px-4 py-2 transition-colors duration-200"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.95rem', letterSpacing: '0.04em', color: active ? '#d4c5a9' : '#847464' }}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#d4c5a9' }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.color = '#847464' }}
                  >
                    {label}
                    {active && (
                      <motion.div layoutId="nav-active" className="absolute bottom-0 left-2 right-2 h-px" style={{ background: '#5e1b21' }} />
                    )}
                  </Link>
                )
              })}

              {/* More dropdown */}
              {moreLinks.length > 0 && <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setDropdownOpen(v => !v)}
                  className="relative flex items-center gap-1 px-4 py-2 transition-colors duration-200"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.95rem', letterSpacing: '0.04em', color: moreActive || dropdownOpen ? '#d4c5a9' : '#847464', background: 'none', border: 'none', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#d4c5a9'}
                  onMouseLeave={e => { if (!moreActive && !dropdownOpen) e.currentTarget.style.color = '#847464' }}
                >
                  More
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"
                    style={{ transition: 'transform 200ms', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', marginTop: '1px' }}>
                    <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {moreActive && (
                    <motion.div layoutId="nav-active" className="absolute bottom-0 left-2 right-2 h-px" style={{ background: '#5e1b21' }} />
                  )}
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 min-w-[160px] rounded-md overflow-hidden"
                      style={{ background: 'rgba(13,10,7,0.97)', border: '1px solid #3d1215', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
                    >
                      {moreLinks.map(({ label, href }) => {
                        const active = pathname.startsWith(href)
                        return (
                          <Link
                            key={href}
                            href={href}
                            className="block px-4 py-2.5 transition-colors duration-150"
                            style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.9rem', letterSpacing: '0.03em', color: active ? '#d4c5a9' : '#847464', borderLeft: active ? '2px solid #5e1b21' : '2px solid transparent' }}
                            onMouseEnter={e => { e.currentTarget.style.color = '#d4c5a9'; e.currentTarget.style.background = 'rgba(94,27,33,0.18)' }}
                            onMouseLeave={e => { e.currentTarget.style.color = active ? '#d4c5a9' : '#847464'; e.currentTarget.style.background = 'transparent' }}
                          >
                            {label}
                          </Link>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>}
            </nav>

            {/* Right — auth buttons + hamburger */}
            <div className="flex items-center gap-2">
              {/* Desktop auth area */}
              <div className="hidden sm:flex items-center gap-2">
                <a
                  href="https://discord.com/invite/98C5YUeEz7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-join flex items-center gap-2 rounded-full px-5 py-2 text-sm"
                >
                  <DiscordIcon /> Join the Family
                </a>

                {!session ? (
                  <button
                    onClick={() => signIn('discord')}
                    className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold"
                    style={{ background: '#5865F2', color: '#ffffff', border: 'none', cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.875rem', fontWeight: 700, transition: 'background 0.18s ease' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#4752C4'}
                    onMouseLeave={e => e.currentTarget.style.background = '#5865F2'}
                  >
                    <DiscordIcon /> Log In
                  </button>
                ) : (
                  <div ref={userMenuRef} className="relative">
                    <button
                      onClick={() => setUserMenuOpen(v => !v)}
                      className="flex items-center gap-2 rounded-full px-3 py-1.5"
                      style={{ background: 'rgba(88,101,242,0.15)', border: '1px solid #5865F2', cursor: 'pointer', color: '#d4c5a9', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.85rem' }}
                    >
                      {session.user?.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={session.user.image} alt="" width={22} height={22} style={{ borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                      )}
                      <span style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{session.user?.name}</span>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"
                        style={{ transform: userMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms', flexShrink: 0 }}>
                        <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                          style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, minWidth: '140px', background: 'rgba(13,10,7,0.97)', border: '1px solid #3d1215', borderRadius: '0.375rem', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
                        >
                          <button
                            onClick={() => { signOut(); setUserMenuOpen(false) }}
                            style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.625rem 1rem', background: 'none', border: 'none', cursor: 'pointer', color: '#847464', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.875rem', transition: 'color 0.15s' }}
                            onMouseEnter={e => { e.currentTarget.style.color = '#d4c5a9'; e.currentTarget.style.background = 'rgba(94,27,33,0.18)' }}
                            onMouseLeave={e => { e.currentTarget.style.color = '#847464'; e.currentTarget.style.background = 'transparent' }}
                          >
                            Sign Out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Hamburger button */}
              <button
                onClick={() => setMobileOpen(v => !v)}
                className="md:hidden flex items-center justify-center p-2"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                style={{ background: 'none', border: 'none', cursor: 'pointer', width: '40px', height: '40px' }}
              >
                <HamburgerIcon open={mobileOpen} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer portal */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              onClick={closeDrawer}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 60,
                background: 'rgba(0,0,0,0.6)',
              }}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '80%',
                maxWidth: '360px',
                zIndex: 70,
                background: '#0d0a07',
                borderLeft: '2px solid #5e1b21',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
              }}
            >
              {/* Drawer header */}
              <div style={{ padding: '1.25rem 1.25rem 1rem', borderBottom: '1px solid #5e1b21', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontFamily: '"Mobsters","Palatino Linotype",serif', color: '#d4c5a9', fontSize: '1.4rem', lineHeight: 1 }}>
                      Idriss Scenes
                    </div>
                    <div style={{ fontFamily: '"IM Fell English", Georgia, serif', color: '#847464', fontSize: '0.8rem', fontStyle: 'italic', marginTop: '0.25rem' }}>
                      aesthetic scenepacks
                    </div>
                  </div>
                  <button
                    onClick={closeDrawer}
                    aria-label="Close menu"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', marginTop: '2px', flexShrink: 0 }}
                  >
                    <XIcon />
                  </button>
                </div>
              </div>

              {/* Nav links */}
              <div style={{ flex: 1, padding: '0.5rem 0' }}>
                {links.map(({ label, href }) => {
                  const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
                  return (
                    <DrawerLink key={href} href={href} active={active} onClick={closeDrawer}>
                      {label}
                    </DrawerLink>
                  )
                })}

                {/* More section */}
                {moreLinks.length > 0 && <button
                  onClick={() => setMoreExpanded(v => !v)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0.875rem 1.25rem',
                    background: 'none',
                    border: 'none',
                    borderLeft: moreActive ? '3px solid #5e1b21' : '3px solid transparent',
                    cursor: 'pointer',
                    fontFamily: '"IM Fell English", Georgia, serif',
                    fontSize: '18px',
                    color: moreActive ? '#d4c5a9' : '#d4c5a9',
                    textAlign: 'left',
                    transition: 'background 200ms, border-color 200ms',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(94,27,33,0.15)'; e.currentTarget.style.borderLeftColor = '#5e1b21' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; if (!moreActive) e.currentTarget.style.borderLeftColor = 'transparent' }}
                >
                  <span>More</span>
                  <svg
                    width="12" height="12" viewBox="0 0 10 10" fill="none"
                    style={{ transition: 'transform 250ms ease', transform: moreExpanded ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}
                  >
                    <path d="M1 3l4 4 4-4" stroke="#847464" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <AnimatePresence initial={false}>
                  {moreExpanded && moreLinks.length > 0 && (
                    <motion.div
                      key="more-links"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      {moreLinks.map(({ label, href }) => {
                        const active = pathname.startsWith(href)
                        return (
                          <DrawerLink key={href} href={href} active={active} onClick={closeDrawer} indent>
                            {label}
                          </DrawerLink>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
                }
              </div>

              {/* Bottom section */}
              <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid #2a1410', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {/* Join Discord */}
                <a
                  href="https://discord.com/invite/98C5YUeEz7"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeDrawer}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '0.875rem 1rem',
                    background: '#5865F2',
                    color: '#ffffff',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'background 200ms',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = '#6875f5'}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = '#5865F2'}
                >
                  <DiscordIcon size={16} />
                  Join the Family
                </a>

                {/* Login section */}
                {!session ? (
                  <button
                    onClick={() => { signIn('discord'); closeDrawer() }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      width: '100%',
                      padding: '0.875rem 1rem',
                      background: 'transparent',
                      color: '#d4c5a9',
                      borderRadius: '8px',
                      border: '1px solid #5865F2',
                      cursor: 'pointer',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      transition: 'background 200ms',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(88,101,242,0.15)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <DiscordIcon size={16} />
                    Log In with Discord
                  </button>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.5rem 0' }}>
                      {session.user?.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={session.user.image}
                          alt=""
                          width={32}
                          height={32}
                          style={{ borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '1px solid #5865F2' }}
                        />
                      )}
                      <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.9rem', color: '#d4c5a9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {session.user?.name}
                      </span>
                    </div>
                    <button
                      onClick={() => { signOut(); closeDrawer() }}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '0.625rem 1rem',
                        background: 'transparent',
                        color: '#847464',
                        borderRadius: '6px',
                        border: '1px solid #2a1410',
                        cursor: 'pointer',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: '0.875rem',
                        transition: 'color 200ms, background 200ms',
                        textAlign: 'center',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#d4c5a9'; e.currentTarget.style.background = 'rgba(94,27,33,0.15)' }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#847464'; e.currentTarget.style.background = 'transparent' }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}

                {/* Footer */}
                <div style={{ textAlign: 'center', paddingTop: '0.25rem' }}>
                  <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '11px', color: '#847464' }}>
                    idrissscenes.com
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top line */}
      <line
        x1="3" y1="6" x2="19" y2="6"
        stroke="#d4c5a9"
        strokeWidth="1.75"
        strokeLinecap="round"
        style={{
          transformOrigin: '11px 6px',
          transition: 'transform 300ms cubic-bezier(0.4,0,0.2,1)',
          transform: open ? 'translateY(5px) rotate(45deg)' : 'none',
        }}
      />
      {/* Middle line */}
      <line
        x1="3" y1="11" x2="19" y2="11"
        stroke="#d4c5a9"
        strokeWidth="1.75"
        strokeLinecap="round"
        style={{
          transformOrigin: '11px 11px',
          transition: 'opacity 200ms ease, transform 300ms cubic-bezier(0.4,0,0.2,1)',
          opacity: open ? 0 : 1,
          transform: open ? 'scaleX(0)' : 'none',
        }}
      />
      {/* Bottom line */}
      <line
        x1="3" y1="16" x2="19" y2="16"
        stroke="#d4c5a9"
        strokeWidth="1.75"
        strokeLinecap="round"
        style={{
          transformOrigin: '11px 16px',
          transition: 'transform 300ms cubic-bezier(0.4,0,0.2,1)',
          transform: open ? 'translateY(-5px) rotate(-45deg)' : 'none',
        }}
      />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5 5l10 10M15 5L5 15" stroke="#847464" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function DrawerLink({ href, active, onClick, children, indent }: {
  href: string
  active: boolean
  onClick: () => void
  children: React.ReactNode
  indent?: boolean
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        display: 'block',
        padding: `0.875rem ${indent ? '2.25rem' : '1.25rem'}`,
        fontFamily: '"IM Fell English", Georgia, serif',
        fontSize: indent ? '16px' : '18px',
        color: '#d4c5a9',
        textDecoration: 'none',
        borderLeft: active ? '3px solid #5e1b21' : '3px solid transparent',
        background: active ? 'rgba(94,27,33,0.1)' : 'transparent',
        transition: 'background 200ms, border-color 200ms',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(94,27,33,0.15)'; e.currentTarget.style.borderLeftColor = '#5e1b21' }}
      onMouseLeave={e => { e.currentTarget.style.background = active ? 'rgba(94,27,33,0.1)' : 'transparent'; e.currentTarget.style.borderLeftColor = active ? '#5e1b21' : 'transparent' }}
    >
      {children}
    </Link>
  )
}

function DiscordIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.033.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}
