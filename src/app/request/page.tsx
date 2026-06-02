'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function RequestPage() {
  const [form, setForm] = useState({ character: '', show: '', prefs: '', email: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="pt-28 pb-20 px-4" style={{ background: '#0d0a07' }}>
      <div className="mx-auto max-w-5xl">
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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Priority Request (3 cols) ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 rounded-sm overflow-hidden"
            style={{
              background: '#120e08',
              border: '1px solid rgba(94,27,33,0.35)',
              boxShadow: '0 8px 48px rgba(94,27,33,0.18)',
            }}
          >
            <div className="h-1" style={{ background: 'linear-gradient(90deg, #5e1b21, #e55c35)' }} />

            <div className="p-8">
              <div className="flex items-end justify-between mb-2">
                <div>
                  <div className="mob-label mb-1.5">Priority Request</div>
                  <h2 className="font-mobsters" style={{ fontSize: '2rem', color: '#d4c5a9' }}>Skip the Line</h2>
                </div>
                <div className="text-right">
                  <div className="font-mobsters" style={{ fontSize: '3rem', color: '#e55c35' }}>$10</div>
                  <div className="text-xs" style={{ color: '#847464' }}>one-time</div>
                </div>
              </div>

              <div className="mob-divider mb-6" />

              <p className="text-sm leading-relaxed mb-6 font-fell italic" style={{ color: '#847464' }}>
                Pay $10 and your request goes straight to the top. If I can&apos;t deliver
                for any reason, you get every dollar back. No questions. No games.
              </p>

              <a
                href="https://ko-fi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 mb-8 rounded-sm transition-all duration-200 text-base font-bold tracking-wider uppercase"
                style={{
                  background: 'linear-gradient(135deg, #5e1b21, #7a2028)',
                  color: '#d4c5a9',
                  border: '1px solid rgba(229,92,53,0.3)',
                  fontFamily: '"Mobsters", serif',
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 24px rgba(94,27,33,0.5)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
              >
                ☕ Pay $10 on Ko-fi
              </a>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-10 rounded-sm"
                  style={{ background: '#0a0806', border: '1px solid rgba(94,27,33,0.2)' }}
                >
                  <div className="font-mobsters text-5xl mb-3" style={{ color: '#e55c35' }}>✓</div>
                  <p className="font-mobsters text-xl mb-2" style={{ color: '#d4c5a9' }}>Order Received.</p>
                  <p className="text-sm font-fell italic" style={{ color: '#847464' }}>
                    I&apos;ll be in touch via email.
                  </p>
                </motion.div>
              ) : (
                <div className="rounded-sm p-5" style={{ background: '#0a0806', border: '1px solid rgba(94,27,33,0.15)' }}>
                  <div className="mob-label mb-4 pb-2" style={{ borderBottom: '1px solid rgba(94,27,33,0.15)' }}>
                    Order Details — fill out after paying
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                      { key: 'character', label: 'Character Name', placeholder: 'e.g. Tony Soprano', type: 'text' },
                      { key: 'show', label: 'Show or Movie', placeholder: 'e.g. The Sopranos', type: 'text' },
                      { key: 'email', label: 'Your Email', placeholder: 'you@example.com', type: 'email' },
                    ].map(({ key, label, placeholder, type }) => (
                      <div key={key}>
                        <label className="block mob-label mb-1.5">{label}</label>
                        <input
                          type={type}
                          required
                          placeholder={placeholder}
                          value={(form as Record<string, string>)[key]}
                          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-sm text-sm focus:outline-none transition-all font-fell"
                          style={{
                            background: '#141008',
                            border: '1px solid rgba(94,27,33,0.2)',
                            color: '#d4c5a9',
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(229,92,53,0.5)'}
                          onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(94,27,33,0.2)'}
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block mob-label mb-1.5">Specific Preferences</label>
                      <textarea
                        placeholder="Any specific scenes, episodes, moods, or style notes..."
                        value={form.prefs}
                        onChange={(e) => setForm({ ...form, prefs: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-sm text-sm focus:outline-none transition-all resize-none font-fell"
                        style={{
                          background: '#141008',
                          border: '1px solid rgba(94,27,33,0.2)',
                          color: '#d4c5a9',
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(229,92,53,0.5)'}
                        onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(94,27,33,0.2)'}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-sm transition-all duration-200 text-base font-bold tracking-wider uppercase"
                      style={{
                        background: 'linear-gradient(135deg, #5e1b21, #7a2028)',
                        color: '#d4c5a9',
                        border: '1px solid rgba(229,92,53,0.3)',
                        fontFamily: '"Mobsters", serif',
                      }}
                    >
                      Submit Order
                    </button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>

          {/* ── Free Request (2 cols) ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 rounded-sm overflow-hidden flex flex-col"
            style={{
              background: '#0e0c08',
              border: '1px solid rgba(255,255,255,0.05)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
            }}
          >
            <div className="h-1" style={{ background: 'linear-gradient(90deg, #333, #555)' }} />

            <div className="p-7 flex flex-col flex-1">
              <div className="mb-2">
                <div className="mob-label mb-1.5">Community</div>
                <h2 className="font-mobsters text-2xl" style={{ color: '#d4c5a9' }}>
                  The Waiting Room
                </h2>
              </div>

              <div className="mob-divider mb-5" />

              <p className="text-sm leading-relaxed mb-8 flex-1 font-fell italic" style={{ color: '#847464' }}>
                Free requests go through Discord. I get to them when I get to them.
                No guarantees on timing — but I try to get to everyone eventually.
              </p>

              <div className="rounded-sm p-4 mb-7" style={{ background: '#0a0806', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="grid grid-cols-3 gap-1 text-xs mb-2 pb-2"
                  style={{ borderBottom: '1px solid rgba(94,27,33,0.15)' }}>
                  <span style={{ color: '#847464' }} />
                  <span className="text-center" style={{ color: '#847464' }}>Free</span>
                  <span className="text-center" style={{ color: '#e55c35' }}>$10</span>
                </div>
                {[
                  ['Queue position', 'Whenever', '🥇 Top'],
                  ['Speed', 'Weeks+', 'Priority'],
                  ['Refund', 'N/A', '100%'],
                ].map(([label, free, paid]) => (
                  <div key={label} className="grid grid-cols-3 gap-1 text-xs py-1.5"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <span style={{ color: '#847464' }}>{label}</span>
                    <span className="text-center" style={{ color: '#847464' }}>{free}</span>
                    <span className="text-center" style={{ color: '#e55c35' }}>{paid}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://discord.gg/MVA5ySY2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-sm transition-all duration-200 text-base font-bold tracking-wider uppercase"
                style={{
                  background: 'linear-gradient(135deg, #3d1419, #5e1b21)',
                  color: '#d4c5a9',
                  border: '1px solid rgba(94,27,33,0.4)',
                  fontFamily: '"Mobsters", serif',
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
