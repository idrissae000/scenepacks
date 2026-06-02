import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'radial-gradient(ellipse at center, #0f0306 0%, #0a0a0a 70%)' }}>
      <div className="text-center">
        <div className="section-title text-[10rem] leading-none font-black text-mob-border opacity-10 select-none">
          404
        </div>
        <h1 className="section-title text-3xl text-mob-text mb-3 -mt-8">
          This scene was cut.
        </h1>
        <p className="text-mob-muted text-sm mb-8" style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>
          &ldquo;What, you gonna cry now?&rdquo;
        </p>
        <Link
          href="/"
          className="mob-btn-outline rounded-sm px-8 py-3 transition-all duration-200 inline-block"
        >
          ← Back home
        </Link>
      </div>
    </div>
  )
}
