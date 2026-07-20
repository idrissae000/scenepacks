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
        style={{ background: '#0f0b08', border: '1px solid #5e1b21' }}
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

function CreatorSidebar({ creator, avatar }: { creator: CreatorWithStats; avatar: string | null }) {
  return (
    <aside style={{
      width: '220px',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      paddingTop: '0.5rem',
    }}>
      {/* Avatar */}
      {avatar ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatar}
          alt={creator.name}
          width={96}
          height={96}
          style={{ borderRadius: '50%', border: '3px solid #d4c5a9', objectFit: 'cover' }}
        />
      ) : (
        <div style={{
          width: 96, height: 96, borderRadius: '50%',
          background: 'linear-gradient(135deg, #2a1410, #5e1b21)',
          border: '3px solid #d4c5a9',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#d4c5a9', fontWeight: 700, fontSize: '2rem',
          fontFamily: '"Mobsters","Palatino Linotype",serif',
        }}>
          {creator.name[0]}
        </div>
      )}

      {/* Name + meta */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: '"Mobsters","Palatino Linotype",serif', color: '#d4c5a9', fontSize: '1.4rem', lineHeight: 1.15 }}>
          {creator.name}
        </div>
        <div style={{ color: '#847464', fontSize: '0.75rem', fontFamily: 'Inter, system-ui, sans-serif', marginTop: '0.2rem' }}>
          {creator.role}
        </div>
        <div style={{ color: '#5e4030', fontSize: '0.72rem', fontFamily: 'Inter, system-ui, sans-serif', marginTop: '0.1rem' }}>
          {creator.totalPacks} Scenepack{creator.totalPacks !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
        {/* TikTok / Credit Link */}
        <a
          href={creator.tiktokUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            padding: '0.55rem 0', borderRadius: '6px', width: '100%',
            background: '#0f0b08', border: '1px solid #5e1b21',
            color: '#d4c5a9', fontSize: '0.78rem', fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 600, textDecoration: 'none', transition: 'border-color 0.15s, color 0.15s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e55c35' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#5e1b21' }}
        >
          <TikTokIcon />
          Credit Link
        </a>

        {/* Discord Server */}
        {creator.discordServer && (
          <a
            href={creator.discordServer}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              padding: '0.55rem 0', borderRadius: '6px', width: '100%',
              background: '#5865F2', border: '1px solid #5865F2',
              color: '#ffffff', fontSize: '0.78rem', fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 600, textDecoration: 'none', transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
          >
            <DiscordIcon />
            {creator.name.replace(/\.$/, '')}{creator.name.endsWith('s') ? "'" : "'s"} Discord
          </a>
        )}
      </div>

      {/* Back link */}
      <div style={{ marginTop: '0.5rem', width: '100%' }}>
        <Link
          href="/creators"
          style={{
            color: '#5e4030', fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#847464')}
          onMouseLeave={e => (e.currentTarget.style.color = '#5e4030')}
        >
          ← All Creators
        </Link>
      </div>
    </aside>
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
      <div className="mx-auto max-w-7xl px-4" style={{ paddingTop: '7rem', paddingBottom: '4rem' }}>
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>
          {/* Left sidebar */}
          <CreatorSidebar creator={creator} avatar={avatar} />

          {/* Right: packs */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ paddingBottom: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid #2a1410' }}>
              <h2 style={{
                fontFamily: '"IM Fell English", Georgia, serif',
                color: '#d4c5a9',
                fontSize: '1.8rem',
                marginBottom: '0.5rem',
              }}>
                Scenepacks by {creator.name}
              </h2>
              <div className="divider-stain max-w-[60px] mt-2" />
            </div>

            {creator.franchises.length === 0 ? (
              <p style={{ color: '#847464', fontFamily: 'Inter, system-ui, sans-serif' }}>No scenepacks yet.</p>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '1rem',
              }}>
                {creator.franchises.map(f => (
                  <FranchiseCard key={f.slug} franchise={f} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

function TikTokIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.22 8.22 0 004.82 1.56V6.81a4.85 4.85 0 01-1.05-.12z"/>
    </svg>
  )
}

function DiscordIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/>
    </svg>
  )
}
