'use client'

import { motion } from 'framer-motion'

export default function SupportPage() {
  return (
    <div className="pt-28 pb-20 px-4">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="mob-label mb-3">Keep It Going</div>
          <h1 className="section-title text-5xl sm:text-6xl text-mob-text mb-4">
            Support{' '}
            <span className="gold-text">Idriss.ae</span>
          </h1>
          <div className="mob-divider max-w-[60px] mx-auto mb-6" />
          <p className="text-mob-muted text-sm leading-relaxed max-w-md mx-auto">
            All scenepacks are completely free. If you enjoy them and want to help
            keep this going, any support means a lot.
          </p>
        </motion.div>

        {/* Ko-fi card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-sm overflow-hidden mb-6"
          style={{ background: '#141414', border: '1px solid rgba(201,168,76,0.2)', boxShadow: '0 8px 40px rgba(107,15,26,0.15)' }}
        >
          <div className="h-1" style={{ background: 'linear-gradient(90deg, #6b0f1a, #c9a84c)' }} />
          <div className="p-8 text-center">
            <div className="text-5xl mb-4">☕</div>
            <h2 className="section-title text-2xl text-mob-text mb-3">Buy Me a Coffee</h2>
            <p className="text-sm text-mob-muted leading-relaxed mb-8 max-w-sm mx-auto">
              Every coffee keeps the scenepacks coming. No pressure, no subscription —
              just a one-time show of love if you want to.
            </p>
            <a
              href="https://ko-fi.com" // TODO: replace with real Ko-fi link
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mob-btn-gold rounded-sm px-10 py-3.5 transition-all duration-200"
            >
              Support on Ko-fi
            </a>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <a
            href="https://www.tiktok.com/@idriss.ae"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 rounded-sm transition-all duration-200 group"
            style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
          >
            <div className="w-10 h-10 rounded-sm flex items-center justify-center"
              style={{ background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.08)' }}>
              <TikTokIcon />
            </div>
            <div>
              <div className="text-sm font-medium text-mob-text group-hover:text-mob-gold transition-colors">TikTok</div>
              <div className="text-xs text-mob-muted">@idriss.ae</div>
            </div>
            <div className="ml-auto text-mob-muted group-hover:text-mob-gold transition-colors text-xs">→</div>
          </a>

          <a
            href="https://discord.gg/MVA5ySY2"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 rounded-sm transition-all duration-200 group"
            style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
          >
            <div className="w-10 h-10 rounded-sm flex items-center justify-center"
              style={{ background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.08)' }}>
              <DiscordIcon />
            </div>
            <div>
              <div className="text-sm font-medium text-mob-text group-hover:text-mob-gold transition-colors">Discord</div>
              <div className="text-xs text-mob-muted">Join the community</div>
            </div>
            <div className="ml-auto text-mob-muted group-hover:text-mob-gold transition-colors text-xs">→</div>
          </a>
        </motion.div>

        {/* Closing note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-mob-muted text-sm" style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>
            &ldquo;A man who doesn&apos;t spend time with his family can never be a real man.&rdquo;
          </p>
          <p className="text-xs text-mob-muted mt-2 opacity-50">— Don Corleone</p>
        </motion.div>
      </div>
    </div>
  )
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-mob-muted">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.22 8.22 0 004.82 1.56V6.81a4.85 4.85 0 01-1.05-.12z" />
    </svg>
  )
}

function DiscordIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-mob-muted">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.033.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}
