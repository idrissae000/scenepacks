import { sports } from '@/data/sports'
import { CharacterPage } from '@/components/CharacterPage'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return (sports as any[]).flatMap(s =>
    s.characters.map((c: any) => ({ slug: s.slug, character: c.slug }))
  )
}

export default function SportCharacterPage({ params }: { params: { slug: string; character: string } }) {
  const sport = (sports as any[]).find(s => s.slug === params.slug)
  const char = sport?.characters.find((c: any) => c.slug === params.character)
  if (!sport || !char) notFound()

  return (
    <CharacterPage
      character={char}
      parent={{ name: sport.name, slug: sport.slug, theme: sport.theme }}
      type="sport"
    />
  )
}
