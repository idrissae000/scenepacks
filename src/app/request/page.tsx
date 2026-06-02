'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function RequestPage() {
  const [form, setForm] = useState({ character: '', show: '', scenes: '', email: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: wire up to form backend (e.g. Formspree, Resend, etc.)
    setSubmitted(true)
  }

  return (
    <div className="pt-28 pb-20 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="mob-label mb-3">Make a Request</div>
          <h1 className="section-title text-5xl sm:text-6xl text-mob-text mb-4">Request a Scenepack</h1>
          <div className="mob-divider max-w-[60px] mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ─── Priority Request ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-sm overflow-hidden"
            style={{ background: '#141414', border: '1px solid rgba(201,168,76,0.2)', boxShadow: '0 8px 40px rgba(107,15,26,0.2)' }}
          >
            {/* Header band */}
            <div className="h-1" style={{ background: 'linear-gradient(90deg, #6b0f1a, #c9a84c)' }} />

            <div className="p-7">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="mob-label mb-1.5">Priority</div>
                  <h2 className="section-title text-2xl text-mob-text">Priority Request</h2>
                </div>
                <div className="text-right">
                  <div className="section-title text-4xl gold-text">$10</div>
                  <div className="text-xs text-mob-muted">one-time</div>
                </div>
              </div>

              <div className="mob-divider mb-5" />

              <p className="text-sm text-mob-muted leading-relaxed mb-6">
                Pay $10 and your request jumps to the top of the queue. If I can&apos;t make it for
                any reason, you get a <strong className="text-mob-text">full refund</strong> — no questions asked.
              </p>

              {/* Ko-fi button */}
              <a
                href="https://ko-fi.com" // TODO: replace with real Ko-fi link
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full mob-btn-gold rounded-sm py-3.5 transition-all duration-200 mb-6"
              >
                <KofiIcon />
                Pay $10 on Ko-fi
              </a>

              <p className="text-xs text-mob-muted text-center mb-6">
                After paying, fill out the form below with your order details.
              </p>

              {/* Form */}
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-3xl mb-3">✓</div>
                  <p className="section-title text-xl gold-text mb-2">Request received.</p>
                  <p className="text-sm text-mob-muted">I&apos;ll be in touch via email.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { key: 'character', label: 'Character Name', placeholder: 'e.g. Tony Montana' },
                    { key: 'show', label: 'Show / Movie', placeholder: 'e.g. Scarface (1983)' },
                    { key: 'email', label: 'Your Email', placeholder: 'you@example.com', type: 'email' },
                  ].map(({ key, label, placeholder, type }) => (
                    <div key={key}>
                      <label className="mob-label block mb-1.5">{label}</label>
                      <input
                        type={type || 'text'}
                        required
                        placeholder={placeholder}
                        value={(form as any)[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-sm text-sm text-mob-text placeholder-mob-muted focus:outline-none transition-all"
                        style={{ background: '#0e0e0e', border: '1px solid rgba(201,168,76,0.12)' }}
                        onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'}
                        onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.12)'}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="mob-label block mb-1.5">Specific Scenes / Preferences</label>
                    <textarea
                      placeholder="Any specific episodes, scenes, moments, or style preferences..."
                      value={form.scenes}
                      onChange={(e) => setForm({ ...form, scenes: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-sm text-sm text-mob-text placeholder-mob-muted focus:outline-none transition-all resize-none"
                      style={{ background: '#0e0e0e', border: '1px solid rgba(201,168,76,0.12)' }}
                      onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'}
                      onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.12)'}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full mob-btn-gold rounded-sm py-3 transition-all duration-200"
                  >
                    Submit Request
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* ─── Free Request ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-sm overflow-hidden flex flex-col"
            style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}
          >
            <div className="h-1" style={{ background: 'linear-gradient(90deg, #333, #555)' }} />

            <div className="p-7 flex flex-col flex-1">
              <div className="mb-4">
                <div className="mob-label mb-1.5">Community</div>
                <h2 className="section-title text-2xl text-mob-text">Free Request</h2>
              </div>

              <div className="mob-divider mb-5" />

              <p className="text-sm text-mob-muted leading-relaxed mb-8 flex-1">
                Join the Discord and drop your request in the requests channel.
                Free requests are worked on when I have time — no guarantees on timing,
                but I try my best to get to everyone.
              </p>

              {/* Perks comparison */}
              <div className="rounded-sm p-4 mb-8" style={{ background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="space-y-3">
                  {[
                    { label: 'Position in queue', free: 'Whenever I get to it', paid: '🥇 Top of the queue' },
                    { label: 'Turnaround', free: 'Days to weeks', paid: 'Priority' },
                    { label: 'Refund policy', free: 'N/A', paid: '100% if I can\'t deliver' },
                    { label: 'Cost', free: 'Free', paid: '$10' },
                  ].map(({ label, free, paid }) => (
                    <div key={label} className="grid grid-cols-3 gap-2 text-xs items-center">
                      <span className="text-mob-muted">{label}</span>
                      <span className="text-mob-muted text-center">{free}</span>
                      <span className="text-center" style={{ color: '#c9a84c' }}>{paid}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs mt-2 pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  <span />
                  <span className="text-mob-muted text-center font-medium">Free</span>
                  <span className="text-center font-medium" style={{ color: '#c9a84c' }}>$10</span>
                </div>
              </div>

              <a
                href="https://discord.gg/MVA5ySY2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full mob-btn-outline rounded-sm py-3.5 transition-all duration-200"
              >
                <DiscordIcon />
                Join Discord to Request
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function KofiIcon() {
  return <span className="text-base">☕</span>
}

function DiscordIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.033.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}
