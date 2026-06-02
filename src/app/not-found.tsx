import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl font-black text-cinema-border/30 mb-4">404</p>
        <h1 className="text-2xl font-bold text-cinema-text mb-3">Page not found</h1>
        <p className="text-cinema-muted mb-8">This scene was cut from the final edit.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-sm border border-cinema-border bg-cinema-card px-6 py-2.5 text-sm text-cinema-text hover:border-cinema-gold/40 hover:text-cinema-gold transition-all duration-200"
        >
          ← Back home
        </Link>
      </div>
    </div>
  )
}
