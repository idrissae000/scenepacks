'use client'

interface Theme {
  texClass?: string
  bgImage?: string
}

export default function PageAtmosphere({ theme }: { theme: Theme }) {
  return (
    <div
      className={`fixed inset-0 pointer-events-none ${theme.bgImage ? '' : (theme.texClass || '')}`}
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
  )
}
