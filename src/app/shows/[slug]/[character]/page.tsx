import { notFound } from 'next/navigation'
import { shows } from '@/data/shows'
import CharacterPage from '@/components/CharacterPage'

interface Props { params: { slug: string; character: string } }

export function generateStaticParams() {
  return shows.flatMap((s) =>
    s.characters.map((c) => ({ slug: s.slug, character: c.slug }))
  )
}

export function generateMetadata({ params }: Props) {
  const show = shows.find((s) => s.slug === params.slug)
  const char = show?.characters.find((c) => c.slug === params.character)
  if (!char || !show) return {}
  return {
    title: `${char.name} Scenepack — ${show.name} — Idriss.ae`,
    description: `Free ${char.name} scenepack from ${show.name}. 1080p 24fps aesthetic cinematic clips. Credit: @idriss.ae`,
  }
}

export default function ShowCharacterPage({ params }: Props) {
  const show = shows.find((s) => s.slug === params.slug)
  const char = show?.characters.find((c) => c.slug === params.character)
  if (!show || !char) notFound()

  return <CharacterPage character={char} parent={{ name: show.name, slug: show.slug, theme: show.theme }} type="show" />
}
