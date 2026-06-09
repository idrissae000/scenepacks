'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative mt-24" style={{ background: '#080604', borderTop: '1px solid #5e1b21' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div style={{ lineHeight: 1 }}>
              <div style={{ fontFamily: '"Mobsters","Palatino Linotype",serif', color: '#d4c5a9', fontSize: '1.6rem', lineHeight: 1 }}>
                Idriss Scenes
              </div>
              <div style={{ fontFamily: '"Great Vibes", cursive', color: '#a08868', fontSize: '1.25rem', marginTop: '-0.4rem', paddingLeft: '0.4rem', lineHeight: 1 }}>
                aesthetic scenepacks
              </div>
            </div>
            <p className="mt-3 text-sm max-w-xs leading-relaxed" style={{ color: '#6a5a48', fontFamily: 'Inter, system-ui, sans-serif', fontStyle: 'italic' }}>
              The finest cuts. Free for the family.
            </p>
          </div>

          <div className="flex gap-10">
            <div>
              <div className="mob-label mb-3">Navigate</div>
              <div className="space-y-2">
                {[['/', 'Home'], ['/shows', 'Shows'], ['/movies', 'Movies'], ['/games', 'Games'], ['/request', 'Request'], ['/support', 'Support'], ['/coming-soon', 'Coming Soon']].map(([href, label]) => (
                  <div key={href}>
                    <Link href={href} className="text-sm transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#847464' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#d4c5a9'}
                      onMouseLeave={e => e.currentTarget.style.color = '#847464'}>
                      {label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="mob-label mb-3">The Family</div>
              <div className="space-y-2">
                <a href="https://discord.com/invite/98C5YUeEz7" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm transition-opacity hover:opacity-80" style={{ color: '#e55c35', fontFamily: 'Inter, system-ui, sans-serif' }}>
                  <DiscordIcon /> Discord
                </a>
                <a href="https://www.tiktok.com/@idriss.ae" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm transition-opacity hover:opacity-80" style={{ color: '#e55c35', fontFamily: 'Inter, system-ui, sans-serif' }}>
                  <TikTokIcon /> @idriss.ae
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="divider-stain my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#6a5a48' }}>
            <span style={{ fontFamily: '"Mobsters","Palatino Linotype",serif', color: '#d4c5a9' }}>idriss.ae</span>
            <span> on </span>
            <a href="https://www.tiktok.com/@idriss.ae" target="_blank" rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80" style={{ color: '#e55c35' }}>TikTok</a>
            <span style={{ fontStyle: 'italic' }}> — Give your credits or sleep with the fishes.</span>
          </p>
          <p className="text-sm opacity-40" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontStyle: 'italic', color: '#847464' }}>
            &ldquo;A man who doesn&apos;t spend time with his family can never be a real man.&rdquo;
          </p>
        </div>
      </div>
    </footer>
  )
}

function DiscordIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.033.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
}
function TikTokIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.22 8.22 0 004.82 1.56V6.81a4.85 4.85 0 01-1.05-.12z"/></svg>
}
