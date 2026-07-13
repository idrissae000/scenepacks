'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getCreatorStats, CreatorWithStats } from '@/lib/creatorStats'

const CREATOR_STATS = getCreatorStats().sort((a, b) => b.totalPacks - a.totalPacks)

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

function CreatorRow({ creator }: { creator: CreatorWithStats }) {
  const avatar = useDiscordAvatar(creator.discordId)
  const logos = creator.franchises.slice(0, 6)

  return (
    <Link href={`/creators/${creator.slug}`} className="block group">
      <div
        className="rounded-lg overflow-hidden transition-all duration-200"
        style={{
          background: '#0f0b08',
          border: '1px solid #5e1b21',
          padding: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = '#e55c35'
          el.style.filter = 'brightness(1.06)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = '#5e1b21'
          el.style.filter = 'brightness(1)'
        }}
      >
        {/* Avatar */}
        <div style={{ flexShrink: 0 }}>
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatar}
              alt={creator.name}
              width={64}
              height={64}
              style={{ borderRadius: '50%', border: '2px solid #5e1b21', objectFit: 'cover' }}
            />
          ) : (
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'linear-gradient(135deg, #2a1410, #5e1b21)',
              border: '2px solid #5e1b21',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#d4c5a9', fontWeight: 700, fontSize: '1.3rem',
              fontFamily: '"Mobsters","Palatino Linotype",serif',
            }}>
              {creator.name[0]}
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: '"Mobsters","Palatino Linotype",serif',
            color: '#d4c5a9', fontSize: '1.2rem',
          }}>
            {creator.name}
          </div>
          <div style={{ color: '#847464', fontSize: '0.8rem', marginTop: '0.15rem', fontFamily: 'Inter, system-ui, sans-serif' }}>
            {creator.role}
          </div>
          <div style={{ color: '#847464', fontSize: '0.8rem', fontFamily: 'Inter, system-ui, sans-serif' }}>
            {creator.totalPacks} Scenepack{creator.totalPacks !== 1 ? 's' : ''}
          </div>
          <a
            href={creator.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '0.4rem', color: '#d4c5a9', fontSize: '0.75rem', fontFamily: 'Inter, system-ui, sans-serif', opacity: 0.7 }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
          >
            <TikTokIcon />
            @{creator.tiktok}
          </a>
        </div>

        {/* Franchise logos */}
        {logos.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            {logos.map((f, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={f.slug}
                src={f.logo}
                alt={f.name}
                title={f.name}
                width={44}
                height={44}
                style={{
                  borderRadius: '6px',
                  border: '2px solid #0f0b08',
                  objectFit: 'cover',
                  marginLeft: i > 0 ? '-12px' : 0,
                  zIndex: logos.length - i,
                  position: 'relative',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
                }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}

export default function CreatorsPage() {
  return (
    <main className="min-h-screen" style={{ background: '#0d0a07' }}>
      <div className="mx-auto max-w-3xl px-4 py-20">
        <div className="text-center mb-10">
          <h1 style={{
            fontFamily: '"IM Fell English", Georgia, serif',
            color: '#d4c5a9',
            fontSize: '2.5rem',
            lineHeight: 1.1,
          }}>
            Creators
          </h1>
          <div className="divider-stain max-w-[60px] mx-auto mt-3" />
          <p style={{
            color: '#847464',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '0.9rem',
            marginTop: '1rem',
          }}>
            The people behind every scenepack.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {CREATOR_STATS.map(creator => (
            <CreatorRow key={creator.id} creator={creator} />
          ))}
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
