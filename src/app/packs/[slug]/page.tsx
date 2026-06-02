import { notFound } from 'next/navigation'
import Link from 'next/link'
import { packs } from '@/data/packs'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return packs.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props) {
  const pack = packs.find((p) => p.slug === params.slug)
  if (!pack) return {}
  return {
    title: `${pack.name} — Idriss.ae Scenepacks`,
    description: pack.description,
  }
}

export default function PackPage({ params }: Props) {
  const pack = packs.find((p) => p.slug === params.slug)
  if (!pack) notFound()

  return (
    <div className="pt-28 pb-20 px-4">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/packs"
          className="inline-flex items-center gap-2 text-sm text-cinema-muted hover:text-cinema-gold transition-colors mb-10"
        >
          <span>←</span> Back to all packs
        </Link>

        {/* Pack image placeholder */}
        <div className="relative aspect-video bg-cinema-card border border-cinema-border rounded-sm overflow-hidden mb-8 flex items-center justify-center">
          <div className="text-6xl font-black text-cinema-border/30 tracking-widest uppercase select-none">
            {pack.name.split(' ')[0]}
          </div>
          {/* Letterbox top/bottom bars */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-cinema-black" />
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-cinema-black" />
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <p className="text-xs tracking-widest uppercase text-cinema-gold font-medium mb-2">Scenepack</p>
            <h1 className="text-3xl sm:text-4xl font-black text-cinema-text tracking-tight">{pack.name}</h1>
          </div>
          <div className="w-full h-px bg-cinema-border" />
          <p className="text-cinema-muted leading-relaxed">{pack.description}</p>

          <a
            href={pack.discordLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-sm bg-cinema-gold px-8 py-3.5 text-sm font-bold text-cinema-black hover:bg-cinema-gold-light transition-all duration-200 shadow-lg shadow-cinema-gold/20"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.033.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            Get Pack on Discord
          </a>
        </div>
      </div>
    </div>
  )
}
