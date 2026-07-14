'use client'

import Link from 'next/link'
import { CreatorWithStats } from '@/lib/creatorStats'

export type CreatorWithAvatar = CreatorWithStats & { avatarUrl: string }

function CreatorCard({ creator }: { creator: CreatorWithAvatar }) {
  const logos = creator.franchises.slice(0, 4)

  return (
    <Link href={`/creators/${creator.slug}`} className="block group">
      <div
        className="rounded-md overflow-hidden transition-all duration-200"
        style={{
          background: '#0f0b08',
          border: '1px solid #5e1b21',
          padding: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
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
        {/* Left: avatar + info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: 0 }}>
          {/* Avatar */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={creator.avatarUrl}
              alt={creator.name}
              width={52}
              height={52}
              style={{ borderRadius: '50%', border: '2px solid #5e1b21', objectFit: 'cover' }}
              onError={e => {
                const img = e.target as HTMLImageElement
                img.style.display = 'none'
                const parent = img.parentElement
                if (parent) {
                  const fallback = document.createElement('div')
                  fallback.style.cssText = 'width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#2a1410,#5e1b21);border:2px solid #5e1b21;display:flex;align-items:center;justify-content:center;color:#d4c5a9;font-weight:700;font-size:1.1rem'
                  fallback.textContent = creator.name[0]
                  parent.appendChild(fallback)
                }
              }}
            />
          </div>

          {/* Info */}
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontFamily: '"Mobsters","Palatino Linotype",serif',
              color: '#d4c5a9', fontSize: '1.05rem', lineHeight: 1.1,
            }}>
              {creator.name}
            </div>
            <div style={{ color: '#847464', fontSize: '0.72rem', marginTop: '0.2rem', fontFamily: 'Inter, system-ui, sans-serif' }}>
              {creator.role}
            </div>
            <div style={{ color: '#847464', fontSize: '0.72rem', fontFamily: 'Inter, system-ui, sans-serif' }}>
              {creator.totalPacks} Scenepack{creator.totalPacks !== 1 ? 's' : ''}
            </div>
            {/* TikTok */}
            <a
              href={creator.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '0.35rem', color: '#d4c5a9', fontSize: '0.7rem', fontFamily: 'Inter, system-ui, sans-serif', opacity: 0.7 }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
            >
              <TikTokIcon />
              @{creator.tiktok}
            </a>
          </div>
        </div>

        {/* Right: overlapping franchise logos */}
        {logos.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            {logos.map((f, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={f.slug}
                src={f.logo}
                alt={f.name}
                title={f.name}
                width={40}
                height={40}
                style={{
                  borderRadius: '6px',
                  border: '2px solid #0f0b08',
                  objectFit: 'cover',
                  marginLeft: i > 0 ? '-10px' : 0,
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

interface PopularCreatorsProps {
  creators: CreatorWithAvatar[]
}

export default function PopularCreators({ creators }: PopularCreatorsProps) {
  return (
    <section className="px-4 pb-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h2 style={{ fontFamily: '"IM Fell English", Georgia, serif', color: '#d4c5a9', fontSize: '2rem' }}>
            Popular Creators
          </h2>
          <div className="divider-stain max-w-[60px] mx-auto mt-3" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '640px', margin: '0 auto' }}>
          {creators.map(creator => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TikTokIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.22 8.22 0 004.82 1.56V6.81a4.85 4.85 0 01-1.05-.12z"/>
    </svg>
  )
}
