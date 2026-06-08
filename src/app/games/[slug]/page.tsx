import { notFound } from 'next/navigation'
import { games } from '@/data/games'
import ShowHero from '@/components/ShowHero'
import CharacterGrid from '@/components/CharacterGrid'
import PageAtmosphere from '@/components/PageAtmosphere'

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return games.map((g: any) => ({ slug: g.slug }))
}

const gameDescriptions: Record<string, string> = {
  'rdr2': 'Free Red Dead Redemption 2 scenepacks. Arthur Morgan, Dutch van der Linde. 1080p 24fps aesthetic cinematic clips.',
}

export function generateMetadata({ params }: Props) {
  const game = games.find((g: any) => g.slug === params.slug)
  if (!game) return {}
  return {
    title: `${game.name} Scenepacks — Idriss.ae`,
    description: gameDescriptions[game.slug] || `Free ${game.name} scenepacks. 1080p 24fps aesthetic cinematic clips.`,
  }
}

export default function GamePage({ params }: Props) {
  const game = games.find((g: any) => g.slug === params.slug)
  if (!game) notFound()

  return (
    <>
      {game.theme.bgImage && <link rel="preload" as="image" href={game.theme.bgImage} />}
      <div className="relative" style={{ minHeight: '100vh', cursor: game.theme.cursor || 'default' }}>
        <PageAtmosphere theme={game.theme} />
        <div className="relative" style={{ zIndex: 1 }}>
          <ShowHero show={game} type="game" />
          <CharacterGrid show={game} baseHref={`/games/${game.slug}`} />
        </div>
      </div>
    </>
  )
}
