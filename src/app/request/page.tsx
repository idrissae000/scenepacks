'use client'

import { motion } from 'framer-motion'

export default function RequestPage() {
  return (
    <div className="pt-28 pb-20 px-4" style={{ background: '#0d0a07' }}>
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="mob-label mb-3">Make Your Move</div>
          <h1 className="font-mobsters mb-4" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', color: '#d4c5a9' }}>
            Request a Pack
          </h1>
          <div className="mob-divider max-w-[60px] mx-auto" />
        </motion.div>

        {/* Free Request */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-sm overflow-hidden"
          style={{
            background: '#0e0c08',
            border: '1px solid rgba(94,27,33,0.35)',
            boxShadow: '0 8px 48px rgba(94,27,33,0.18)',
          }}
        >
          <div className="h-1" style={{ background: 'linear-gradient(90deg, #5e1b21, #e55c35)' }} />

          <div className="p-8">
            <div className="mb-2">
              <div className="mob-label mb-1.5">Community</div>
              <h2 className="font-fell italic" style={{ fontSize: '2.1rem', color: '#d4c5a9' }}>
                The Waiting Room
              </h2>
            </div>

            <div className="mob-divider mb-6" />

            <p className="text-sm leading-relaxed mb-8 font-fell italic" style={{ color: '#847464' }}>
              Free requests go through Discord. I get to them when I get to them.
              No guarantees on timing — but I try to get to everyone eventually.
            </p>

            <a
              href="https://discord.gg/MVA5ySY2"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-sm transition-all duration-200 text-base font-bold tracking-wider uppercase"
              style={{
                background: 'linear-gradient(135deg, #3d1419, #5e1b21)',
                color: '#d4c5a9',
                border: '1px solid rgba(94,27,33,0.4)',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(229,92,53,0.5)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(94,27,33,0.4)'}
            >
              <DiscordIcon /> Join Discord to Request
            </a>
          </div>
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
