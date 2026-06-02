import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t" style={{ borderColor: 'rgba(201,168,76,0.12)', background: '#080808' }}>
      {/* Top accent */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(107,15,26,0.6), rgba(201,168,76,0.3), rgba(107,15,26,0.6), transparent)' }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="font-playfair text-2xl font-bold gold-text mb-1">Idriss.ae</div>
            <div className="text-xs tracking-widest uppercase text-mob-muted">Scenepacks</div>
            <p className="mt-3 text-xs text-mob-muted max-w-xs leading-relaxed">
              The finest collection of aesthetic scenepacks. Curated with care. Free for the family.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-8 text-center sm:text-left">
            <div>
              <div className="mob-label mb-3">Navigate</div>
              <div className="space-y-2">
                {[['/', 'Home'], ['/shows', 'Shows'], ['/movies', 'Movies'], ['/request', 'Request'], ['/support', 'Support']].map(([href, label]) => (
                  <div key={href}>
                    <Link href={href} className="text-xs text-mob-muted hover:text-mob-gold transition-colors">
                      {label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mob-label mb-3">Connect</div>
              <div className="space-y-2">
                <div>
                  <a href="https://discord.gg/MVA5ySY2" target="_blank" rel="noopener noreferrer"
                    className="text-xs text-mob-muted hover:text-mob-gold transition-colors flex items-center justify-center sm:justify-start gap-1.5">
                    <DiscordIcon /> Discord
                  </a>
                </div>
                <div>
                  <a href="https://www.tiktok.com/@idriss.ae" target="_blank" rel="noopener noreferrer"
                    className="text-xs text-mob-muted hover:text-mob-gold transition-colors flex items-center justify-center sm:justify-start gap-1.5">
                    <TikTokIcon /> @idriss.ae
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mob-divider my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <p className="text-xs text-mob-muted">
            Credits:{' '}
            <a href="https://www.tiktok.com/@idriss.ae" target="_blank" rel="noopener noreferrer"
              className="gold-text font-medium hover:opacity-80 transition-opacity">
              Idriss.ae
            </a>{' '}
            on TikTok
          </p>
          <p className="text-xs text-mob-muted" style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>
            &ldquo;Those who want respect, give respect.&rdquo;
          </p>
        </div>
      </div>
    </footer>
  )
}

function DiscordIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.033.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.22 8.22 0 004.82 1.56V6.81a4.85 4.85 0 01-1.05-.12z" />
    </svg>
  )
}
