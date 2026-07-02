'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

type CreatorType = 'scenepack' | 'audio'

const INPUT_STYLE: React.CSSProperties = {
  background: '#0f0b08',
  border: '1px solid #3d1215',
  borderRadius: '0.375rem',
  color: '#ffffff',
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: '15px',
  padding: '0.75rem 1rem',
  width: '100%',
  outline: 'none',
  transition: 'border-color 150ms',
}

const LABEL_STYLE: React.CSSProperties = {
  color: '#d4c5a9',
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  display: 'block',
  marginBottom: '0.5rem',
}

const SUBTEXT_STYLE: React.CSSProperties = {
  color: '#847464',
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: '13px',
  marginTop: '-0.25rem',
  marginBottom: '0.5rem',
}

export default function ApplyPage() {
  const { data: session, status } = useSession()
  const [creatorType, setCreatorType] = useState<CreatorType>('scenepack')
  const [q1, setQ1] = useState('')
  const [q2, setQ2] = useState('')
  const [q3, setQ3] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isLoggedIn = status === 'authenticated' && session?.user
  const canSubmit = q1.trim().length > 0 && q2.trim().length > 0 && !loading

  const isDriveLink = (v: string) => /drive\.google\.com/i.test(v)
  const hasDriveLink = isDriveLink(q2) || isDriveLink(q3)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: creatorType,
          question1: q1,
          question2: q2,
          question3: q3,
          discordUsername: session?.user?.name ?? 'Unknown',
          discordId: (session?.user as any)?.discordId ?? (session?.user as any)?.id ?? 'Unknown',
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none" style={{
        zIndex: -1,
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.82), rgba(0,0,0,0.88)), url(/backgrounds/sopranos.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#0d0a07',
      }} />

      <div className="min-h-screen pt-28 pb-20 px-4">
        <div className="mx-auto max-w-xl">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-center mb-10">
            <p className="mob-label mb-3">Creator Program</p>
            <h1 style={{
              fontFamily: '"Mobsters","Palatino Linotype",serif',
              color: '#d4c5a9',
              fontSize: 'clamp(2.8rem, 7vw, 3.8rem)',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}>
              Become a Creator
            </h1>
            <p style={{
              fontFamily: '"IM Fell English", Georgia, serif',
              fontStyle: 'italic',
              color: '#d4c5a9',
              fontSize: '16px',
              lineHeight: 1.6,
            }}>
              Join the Idriss Scenes creator team. Apply to make scenepacks or audios for the community.
            </p>
            <div className="divider-stain max-w-[60px] mx-auto mt-5" />
          </motion.div>

          {/* Auth block */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}>
            {!isLoggedIn ? (
              <div className="text-center py-8">
                <p style={{ color: '#847464', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '15px', marginBottom: '1.5rem' }}>
                  You must log in with Discord to apply.
                </p>
                <button
                  onClick={() => signIn('discord')}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-lg transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
                  style={{ background: '#5865F2', color: '#ffffff', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700, fontSize: '1.05rem' }}
                >
                  <DiscordIcon size={22} />
                  Login with Discord
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between mb-8 px-4 py-3 rounded-lg"
                style={{ background: 'rgba(88,101,242,0.12)', border: '1px solid rgba(88,101,242,0.3)' }}>
                <div className="flex items-center gap-3">
                  {session.user?.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={session.user.image} alt="avatar" className="w-9 h-9 rounded-full" />
                  )}
                  <span style={{ color: '#d4c5a9', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '15px' }}>
                    Logged in as <strong>{session.user?.name}</strong>
                  </span>
                </div>
                <button
                  onClick={() => signOut()}
                  style={{ color: '#847464', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', cursor: 'pointer', background: 'none', border: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#d4c5a9')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#847464')}
                >
                  Log out
                </button>
              </div>
            )}
          </motion.div>

          {/* Form — only shown when logged in */}
          {isLoggedIn && !submitted && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>

              {/* Creator type toggle */}
              <div className="flex gap-3 mb-8">
                {(['scenepack', 'audio'] as CreatorType[]).map(t => (
                  <button
                    key={t}
                    onClick={() => { setCreatorType(t); setQ1(''); setQ2(''); setQ3('') }}
                    className="flex-1 py-3 rounded-lg transition-all duration-200"
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontWeight: 600,
                      fontSize: '15px',
                      border: '2px solid',
                      borderColor: creatorType === t ? '#5e1b21' : '#3d1215',
                      background: creatorType === t ? 'rgba(94,27,33,0.25)' : 'rgba(15,11,8,0.6)',
                      color: '#d4c5a9',
                      cursor: 'pointer',
                    }}
                  >
                    {t === 'scenepack' ? 'Scenepack Creator' : 'Audio Creator'}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Q1 — shared textarea style, different label */}
                <div>
                  <label style={LABEL_STYLE}>
                    {creatorType === 'scenepack'
                      ? 'What type of scenepacks do you want to make?'
                      : 'What type of audios do you make?'}
                  </label>
                  <textarea
                    value={q1}
                    onChange={e => setQ1(e.target.value)}
                    maxLength={500}
                    rows={4}
                    placeholder={creatorType === 'scenepack'
                      ? 'e.g. aesthetic, sad, mixed, dark, cinematic...'
                      : 'Describe your style, genres, vibe...'}
                    className="apply-input" style={{ ...INPUT_STYLE, resize: 'vertical' }}
                    onFocus={e => e.currentTarget.style.borderColor = '#5e1b21'}
                    onBlur={e => e.currentTarget.style.borderColor = '#3d1215'}
                    required
                  />
                  <p style={{ color: '#847464', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', marginTop: '0.35rem', textAlign: 'right' }}>{q1.length}/500</p>
                </div>

                {/* Q2 */}
                <div>
                  <label style={LABEL_STYLE}>
                    {creatorType === 'scenepack'
                      ? 'Attach a link to a scenepack you\'ve made'
                      : 'Share a link to an audio sample'}
                  </label>
                  {creatorType === 'audio' && (
                    <p style={SUBTEXT_STYLE}>
                      Upload your .mp3 or .wav to Google Drive or any file sharing service and paste the link here
                    </p>
                  )}
                  <input
                    type="text"
                    value={q2}
                    onChange={e => setQ2(e.target.value)}
                    maxLength={500}
                    placeholder={creatorType === 'scenepack'
                      ? 'Google Drive, YouTube, TikTok link etc.'
                      : 'Paste your audio link here'}
                    className="apply-input" style={INPUT_STYLE}
                    onFocus={e => e.currentTarget.style.borderColor = '#5e1b21'}
                    onBlur={e => e.currentTarget.style.borderColor = '#3d1215'}
                    required
                  />
                </div>

                {/* Q3 — audio only, optional */}
                {creatorType === 'audio' && (
                  <div>
                    <label style={LABEL_STYLE}>
                      Share a second audio sample <span style={{ color: '#847464', fontWeight: 400 }}>(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={q3}
                      onChange={e => setQ3(e.target.value)}
                      maxLength={500}
                      placeholder="Paste second audio link here"
                      className="apply-input" style={INPUT_STYLE}
                      onFocus={e => e.currentTarget.style.borderColor = '#5e1b21'}
                      onBlur={e => e.currentTarget.style.borderColor = '#3d1215'}
                    />
                  </div>
                )}

                {hasDriveLink && (
                  <div style={{
                    background: 'rgba(201,168,76,0.12)',
                    border: '1px solid rgba(201,168,76,0.5)',
                    borderRadius: '8px',
                    padding: '1rem 1.25rem',
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'flex-start',
                  }}>
                    <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '1px' }}>⚠️</span>
                    <div>
                      <p style={{ color: '#c9a84c', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700, fontSize: '14px', marginBottom: '0.3rem' }}>
                        Google Drive link detected
                      </p>
                      <p style={{ color: '#d4c5a9', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', lineHeight: 1.55, margin: 0 }}>
                        Make sure your sharing settings are set to{' '}
                        <strong style={{ color: '#c9a84c' }}>"Anyone with the link"</strong>{' '}
                        and the role is set to{' '}
                        <strong style={{ color: '#c9a84c' }}>"Viewer"</strong>
                        {' '}— otherwise we won't be able to open it.
                        <br />
                        <span style={{ color: '#847464', fontSize: '12px' }}>
                          In Google Drive: right-click file → Share → Change to Anyone with the link → Viewer → Copy link
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                {error && (
                  <p style={{ color: '#e55c35', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '15px', textAlign: 'center' }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full py-4 rounded-lg transition-all duration-200"
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: 700,
                    fontSize: '1rem',
                    background: canSubmit ? '#5e1b21' : 'rgba(94,27,33,0.3)',
                    color: canSubmit ? '#d4c5a9' : '#6a5040',
                    border: 'none',
                    cursor: canSubmit ? 'pointer' : 'not-allowed',
                    letterSpacing: '0.03em',
                  }}
                >
                  {loading ? 'Submitting…' : 'Submit Application'}
                </button>
              </form>
            </motion.div>
          )}

          {/* Success state */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
              className="text-center py-10"
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✓</div>
              <h2 style={{
                fontFamily: '"Mobsters","Palatino Linotype",serif',
                color: '#d4c5a9',
                fontSize: '2rem',
                marginBottom: '1rem',
              }}>
                Application Received
              </h2>
              <p style={{
                fontFamily: '"IM Fell English", Georgia, serif',
                fontStyle: 'italic',
                color: '#d4c5a9',
                fontSize: '16px',
                lineHeight: 1.6,
                marginBottom: '2rem',
              }}>
                We&rsquo;ll review your application and reach out through Discord if you make the cut. Keep creating.
              </p>
              <Link href="/"
                className="inline-block px-8 py-3 rounded-sm transition-all duration-200 hover:brightness-110"
                style={{ background: '#5e1b21', color: '#d4c5a9', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}>
                Back to Home
              </Link>
            </motion.div>
          )}

        </div>
      </div>
    </>
  )
}

function DiscordIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.033.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}
