'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getCreatorStats, CreatorWithStats, CreatorFranchise } from '@/lib/creatorStats'

const ALL_CREATORS = getCreatorStats()

function useDiscordAvatar(discordId: string) {
  const [url, setUrl] = useState<string | null>(null)
  useEffect(() => {
    fetch(`/api/discord/avatar?discordId=${discordId}`)
      .then(r => r.json())
      .then(d => setUrl(d.url))
      .catch(() => {})
  }, [discordId])
  return url
}

function FranchiseCard({ franchise }: { franchise: CreatorFranchise }) {
  const typeLabel = franchise.type === 'show' ? 'shows' : franchise.type === 'movie' ? 'movies' : franchise.type === 'sport' ? 'sports' : 'games'
  return (
    <Link href={`/${typeLabel}/${franchise.slug}`} className="block group">
      <div
        className="rounded-lg overflow-hidden transition-all duration-200"
        style={{
          background: '#0f0b08',
          border: '1px solid #5e1b21',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = '#e55c35'
          el.style.filter = 'brightness(1.08)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = '#5e1b21'
          el.style.filter = 'brightness(1)'
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={franchise.logo}
          alt={franchise.name}
          style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        <div style={{ padding: '0.75rem 1rem' }}>
          <div style={{ fontFamily: '"Mobsters","Palatino Linotype",serif', color: '#d4c5a9', fontSize: '1rem' }}>
            {franchise.name}
          </div>
          <div style={{ color: '#847464', fontSize: '0.75rem', fontFamily: 'Inter, system-ui, sans-serif', marginTop: '0.2rem' }}>
            {franchise.packCount} Scenepack{franchise.packCount !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function CreatorPageClient({ slug, bannerUrl }: { slug: string; bannerUrl: string }) {
  const creator = ALL_CREATORS.find(c => c.slug === slug)
  const avatar = useDiscordAvatar(creator?.discordId ?? '')

  if (!creator) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: '#0d0a07' }}>
        <div style={{ color: '#847464', fontFamily: 'Inter, system-ui, sans-serif' }}>Creator not found.</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen" style={{ background: '#0d0a07' }}>
      {/* Banner */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bannerUrl}
          alt={creator.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 60%, #0d0a07 100%)',
        }} />

        {/* Creator info bottom-left */}
        <div style={{
          position: 'absolute', bottom: '1.5rem', left: '1.5rem',
          display: 'flex', alignItems: 'center', gap: '1rem',
        }}>
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatar}
              alt={creator.name}
              width={64}
              height={64}
              style={{ borderRadius: '50%', border: '2px solid #d4c5a9', objectFit: 'cover', flexShrink: 0 }}
            />
          ) : (
            <div style={{
              width: 64, height: 64, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, #2a1410, #5e1b21)',
              border: '2px solid #d4c5a9',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#d4c5a9', fontWeight: 700, fontSize: '1.4rem',
              fontFamily: '"Mobsters","Palatino Linotype",serif',
            }}>
              {creator.name[0]}
            </div>
          )}
          <div>
            <div style={{ fontFamily: '"Mobsters","Palatino Linotype",serif', color: '#d4c5a9', fontSize: '1.6rem', lineHeight: 1.1, textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
              {creator.name}
            </div>
            <div style={{ color: '#d4c5a9', fontSize: '0.8rem', opacity: 0.7, fontFamily: 'Inter, system-ui, sans-serif', marginTop: '0.2rem' }}>
              {creator.role}
            </div>
            <div style={{ color: '#d4c5a9', fontSize: '0.8rem', opacity: 0.7, fontFamily: 'Inter, system-ui, sans-serif' }}>
              {creator.totalPacks} Scenepack{creator.totalPacks !== 1 ? 's' : ''}
            </div>
            <a
              href={creator.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '0.35rem', color: '#d4c5a9', fontSize: '0.75rem', fontFamily: 'Inter, system-ui, sans-serif', opacity: 0.8 }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}
            >
              <TikTokIcon />
              @{creator.tiktok}
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h2 style={{
          fontFamily: '"IM Fell English", Georgia, serif',
          color: '#d4c5a9',
          fontSize: '1.8rem',
          marginBottom: '0.5rem',
        }}>
          Scenepacks by {creator.name}
        </h2>
        <div className="divider-stain max-w-[60px] mt-2 mb-8" />

        {creator.franchises.length === 0 ? (
          <p style={{ color: '#847464', fontFamily: 'Inter, system-ui, sans-serif' }}>No scenepacks yet.</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1rem',
          }}>
            {creator.franchises.map(f => (
              <FranchiseCard key={f.slug} franchise={f} />
            ))}
          </div>
        )}

        <div style={{ marginTop: '3rem' }}>
          <Link
            href="/creators"
            style={{
              color: '#847464',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#d4c5a9')}
            onMouseLeave={e => (e.currentTarget.style.color = '#847464')}
          >
            ← All Creators
          </Link>
        </div>
      </div>
    </main>
  )
}

function TikTokIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.22 8.22 0 004.82 1.56V6.81a4.85 4.85 0 01-1.05-.12z"/>
    </svg>
  )
}
