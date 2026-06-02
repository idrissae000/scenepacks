import { notFound } from 'next/navigation'
import Link from 'next/link'
import { shows } from '@/data/shows'
import ShowHero from '@/components/ShowHero'
import CharacterGrid from '@/components/CharacterGrid'

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
    <div style={{ background: show.theme.bg, minHeight: '100vh' }}>
      <ShowHero show={show} type="show" />
      <CharacterGrid show={show} baseHref={`/shows/${show.slug}`} />
    </div>
  )
}
