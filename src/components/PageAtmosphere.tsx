'use client'

import { useEffect } from 'react'

interface Theme {
  texClass?: string
  bgImage?: string
  atmosphere?: string[]
  loadFx?: string | null
}

export default function PageAtmosphere({ theme }: { theme: Theme }) {
  const atmosphere = theme.atmosphere || []

  // One-shot load effects (muzzle flash / kitchen 3-frame / rumble)
  useEffect(() => {
    if (theme.loadFx === 'muzzle') {
      const f = document.createElement('div')
      f.style.cssText = 'position:fixed;inset:0;background:#fff;z-index:9998;pointer-events:none;'
      document.body.appendChild(f)
      const t = setTimeout(() => f.remove(), 80)
      return () => { clearTimeout(t); f.remove() }
    }
    if (theme.loadFx === 'kitchen') {
      const f = document.createElement('div')
      f.style.cssText = 'position:fixed;inset:0;z-index:9998;pointer-events:none;background:#ffffff;'
      document.body.appendChild(f)
      const t1 = setTimeout(() => { f.style.background = '#8f8f8f' }, 90)
      const t2 = setTimeout(() => { f.style.background = 'transparent' }, 190)
      const t3 = setTimeout(() => f.remove(), 280)
      return () => { [t1, t2, t3].forEach(clearTimeout); f.remove() }
    }
    if (theme.loadFx === 'rumble') {
      document.body.classList.add('anim-rumble')
      const t = setTimeout(() => document.body.classList.remove('anim-rumble'), 540)
      return () => { clearTimeout(t); document.body.classList.remove('anim-rumble') }
    }
  }, [theme.loadFx])

  const layer = 'fixed inset-0 pointer-events-none'

  return (
    <>
      {/* Base background: image with dark overlay, or CSS texture fallback */}
      <div
        className={`${layer} ${theme.bgImage ? '' : (theme.texClass || '')}`}
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

      {/* Ambient effect layers */}
      {atmosphere.includes('rain') && <div className={`${layer} fx-rain`} style={{ zIndex: -1 }} />}
      {atmosphere.includes('scanline') && <div className={`${layer} fx-scanline`} style={{ zIndex: 0, overflow: 'hidden' }} />}
      {atmosphere.includes('torch') && <div className={`${layer} fx-torch`} style={{ zIndex: -1 }} />}
      {atmosphere.includes('stars') && <div className={`${layer} fx-stars`} style={{ zIndex: -1 }} />}
      {atmosphere.includes('batsignal') && <div className={`${layer} fx-batsignal`} style={{ zIndex: -1 }} />}
      {atmosphere.includes('smoke') && <Smoke />}
    </>
  )
}

function Smoke() {
  const wisps = [
    { left: '8%',  w: 150, delay: 0,   dur: 13, alt: false },
    { left: '26%', w: 110, delay: 2.5, dur: 15, alt: true },
    { left: '44%', w: 180, delay: 1,   dur: 14, alt: false },
    { left: '62%', w: 120, delay: 3.5, dur: 16, alt: true },
    { left: '80%', w: 150, delay: 1.8, dur: 12, alt: false },
    { left: '92%', w: 100, delay: 4.2, dur: 15, alt: true },
  ]
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
      {wisps.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', bottom: '-40px', left: s.left,
          width: s.w, height: s.w, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,233,228,0.16) 0%, rgba(220,216,210,0.05) 55%, transparent 72%)',
          filter: 'blur(24px)',
          animation: `${s.alt ? 'smokeRiseAlt' : 'smokeRise'} ${s.dur}s ease-out ${s.delay}s infinite`,
        }} />
      ))}
    </div>
  )
}
