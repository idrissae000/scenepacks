'use client'

import { motion } from 'framer-motion'

export default function SupportPage() {
  return (
    <div className="pt-28 pb-20 px-4" style={{ background: '#0d0a07' }}>
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="mob-label mb-3">Keep the Fire Burning</div>
          <h1 className="font-mobsters mb-4" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', color: '#d4c5a9' }}>
            Support the Family
          </h1>
          <div className="mob-divider max-w-[60px] mx-auto mb-6" />
          <p className="text-sm leading-relaxed max-w-md mx-auto font-fell italic" style={{ color: '#847464' }}>
            Everything here is free. If you want to show love and keep this going,
            anything helps. Even a coffee goes a long way.
          </p>
        </motion.div>

        {/* Ko-fi card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-sm overflow-hidden mb-5"
          style={{
            background: '#120e08',
            border: '1px solid rgba(94,27,33,0.3)',
            boxShadow: '0 8px 48px rgba(94,27,33,0.15)',
          }}
        >
          <div className="h-1" style={{ background: 'linear-gradient(90deg, #5e1b21, #e55c35)' }} />
          <div className="p-8 text-center">
            <div className="text-6xl mb-4">☕</div>
            <h2 className="font-mobsters text-3xl mb-3" style={{ color: '#d4c5a9' }}>Buy Me a Coffee</h2>
            <p className="text-sm leading-relaxed mb-8 max-w-sm mx-auto font-fell italic" style={{ color: '#847464' }}>
              Every coffee keeps the scenepacks coming. No subscription, no pressure —
              just a one-time show of love if the work means something to you.
            </p>
            <a
              href="https://ko-fi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-12 py-4 rounded-sm transition-all duration-200 text-xl font-bold tracking-wider uppercase"
              style={{
                background: 'linear-gradient(135deg, #5e1b21, #7a2028)',
                color: '#d4c5a9',
                border: '1px solid rgba(229,92,53,0.3)',
                fontFamily: '"Mobsters", serif',
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 24px rgba(94,27,33,0.5)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
            >
              Support on Ko-fi
            </a>
          </div>
        </motion.div>

        {/* Social cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {[
            {
              href: 'https://www.tiktok.com/@idriss.ae',
              icon: <TikTokIcon />,
              label: 'TikTok',
              sub: '@idriss.ae',
              color: '#e55c35',
            },
            {
              href: 'https://discord.gg/MVA5ySY2',
              icon: <DiscordIcon />,
              label: 'Discord',
              sub: 'Join the community',
              color: '#5e1b21',
            },
          ].map(({ href, icon, label, sub, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-sm transition-all duration-200 group"
              style={{
                background: '#0e0c08',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color}40`}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
            >
              <div className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0"
                style={{ background: '#0a0806', border: `1px solid ${color}20` }}>
                <span style={{ color }}>{icon}</span>
              </div>
              <div>
                <div className="text-sm font-medium font-mobsters" style={{ color: '#d4c5a9' }}>
                  {label}
                </div>
                <div className="text-xs" style={{ color: '#847464' }}>{sub}</div>
              </div>
              <div className="ml-auto text-sm" style={{ color: '#847464' }}>→</div>
            </a>
          ))}
        </motion.div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-14"
        >
          <div className="mob-divider max-w-[80px] mx-auto mb-6" />
          <p className="text-sm opacity-60 font-fell italic" style={{ color: '#847464' }}>
            &ldquo;A man who doesn&apos;t spend time with his family can never be a real man.&rdquo;
          </p>
          <p className="text-xs mt-2 opacity-30" style={{ color: '#847464' }}>— Don Corleone</p>
        </motion.div>
      </div>
    </div>
  )
}

function TikTokIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.22 8.22 0 004.82 1.56V6.81a4.85 4.85 0 01-1.05-.12z" />
    </svg>
  )
}

function DiscordIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.033.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}
