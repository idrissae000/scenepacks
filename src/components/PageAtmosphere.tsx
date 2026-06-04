'use client'

interface Theme {
  texClass?: string
  bgImage?: string
  bg?: string
  surface?: string
}

export default function PageAtmosphere({ theme }: { theme: Theme }) {
  const mobileBg = `linear-gradient(160deg, ${theme.bg || '#0d0a07'} 0%, ${theme.surface || '#1a0a08'} 60%, ${theme.bg || '#0d0a07'} 100%)`

  return (
    <>
      {/* Mobile only — dark gradient, no image */}
      <div
        className="fixed inset-0 pointer-events-none md:hidden"
        style={{ zIndex: -1, background: mobileBg }}
      />

      {/* Desktop only — background image (or texture fallback) */}
      <div
        className={`fixed inset-0 pointer-events-none hidden md:block ${theme.bgImage ? '' : (theme.texClass || '')}`}
        style={{
          zIndex: -1,
          ...(theme.bgImage ? {
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('${theme.bgImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          } : {}),
        }}
      />
    </>
  )
}
