import { notFound } from 'next/navigation'
import { shows } from '@/data/shows'
import ShowHero from '@/components/ShowHero'
import CharacterGrid from '@/components/CharacterGrid'
import PageAtmosphere from '@/components/PageAtmosphere'

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return shows.map((s) => ({ slug: s.slug }))
}

export function generateMetadata({ params }: Props) {
  const show = shows.find((s) => s.slug === params.slug)
  if (!show) return {}
  return { title: `${show.name} — Idriss.ae Scenepacks`, description: show.theme.tagline }
}

export default function ShowPage({ params }: Props) {
  const show = shows.find((s) => s.slug === params.slug)
  if (!show) notFound()

  return (
    <div className="relative" style={{ minHeight: '100vh', cursor: show.theme.cursor || 'default' }}>
      <PageAtmosphere theme={show.theme} />
      <div className="relative" style={{ zIndex: 1 }}>
        <ShowHero show={show} type="show" />
        <CharacterGrid show={show} baseHref={`/shows/${show.slug}`} />
      </div>
    </div>
  )
}
