import { notFound } from 'next/navigation'
import { games } from '@/data/games'
import CharacterPage from '@/components/CharacterPage'

interface Props { params: { slug: string; character: string } }

export function generateStaticParams() {
  return games.flatMap((g: any) =>
    g.characters.map((c: any) => ({ slug: g.slug, character: c.slug }))
  )
}

export function generateMetadata({ params }: Props) {
  const game = games.find((g: any) => g.slug === params.slug)
  const char = game?.characters.find((c: any) => c.slug === params.character)
  if (!char || !game) return {}
  return {
    title: `${char.name} Scenepack — ${game.name} — Idriss.ae`,
    description: `Free ${char.name} scenepack from ${game.name}. 1080p 24fps aesthetic cinematic clips. Credit: @idriss.ae`,
  }
}

export default function GameCharacterPage({ params }: Props) {
  const game = games.find((g: any) => g.slug === params.slug)
  const char = game?.characters.find((c: any) => c.slug === params.character)
  if (!game || !char) notFound()

  return <CharacterPage character={char} parent={{ name: game.name, slug: game.slug, theme: game.theme }} type="game" />
}
