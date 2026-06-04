import { notFound } from 'next/navigation'
import { shows } from '@/data/shows'
import ShowHero from '@/components/ShowHero'
import CharacterGrid from '@/components/CharacterGrid'
import PageAtmosphere from '@/components/PageAtmosphere'

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return shows.map((s) => ({ slug: s.slug }))
}

const showDescriptions: Record<string, string> = {
  'the-sopranos': 'Free Sopranos scenepacks. Tony Soprano, Christopher Moltisanti, Paulie Gualtieri, Silvio Dante, Ralph Cifaretto and more. 1080p 24fps aesthetic clips.',
  'breaking-bad': 'Free Breaking Bad scenepacks. Walter White, Jesse Pinkman — the full Heisenberg arc. 1080p 24fps aesthetic cinematic clips.',
  'better-call-saul': 'Free Better Call Saul scenepacks. Jimmy McGill, Saul Goodman, Kim Wexler, Lalo Salamanca. 1080p 24fps aesthetic clips.',
  'game-of-thrones': 'Free Game of Thrones scenepacks. Jon Snow, Daenerys Targaryen, Arya Stark, Jaime Lannister, Ned Stark and more. 1080p 24fps aesthetic clips.',
  'prison-break': 'Free Prison Break scenepacks. Alexander Mahone, Paul Kellerman. 1080p 24fps aesthetic cinematic clips.',
  'sons-of-anarchy': 'Free Sons of Anarchy scenepacks. Jax Teller and SAMCRO. 1080p 24fps aesthetic cinematic clips.',
  'you': 'Free YOU scenepacks. Joe Goldberg — the most unsettling narrator on TV. 1080p 24fps aesthetic cinematic clips.',
  'barry': 'Free Barry scenepacks. Barry Berkman, hitman turned actor. 1080p 24fps aesthetic cinematic clips.',
  'the-bear': 'Free The Bear scenepacks. Carmy Berzatto in the kitchen. 1080p 24fps aesthetic cinematic clips.',
}

export function generateMetadata({ params }: Props) {
  const show = shows.find((s) => s.slug === params.slug)
  if (!show) return {}
  return {
    title: `${show.name} Scenepacks — Idriss.ae`,
    description: showDescriptions[show.slug] || `Free ${show.name} scenepacks. 1080p 24fps aesthetic cinematic clips.`,
  }
}

export default function ShowPage({ params }: Props) {
  const show = shows.find((s) => s.slug === params.slug)
  if (!show) notFound()

  return (
    <>
      {show.theme.bgImage && <link rel="preload" as="image" href={show.theme.bgImage} />}
      <div className="relative" style={{ minHeight: '100vh', cursor: show.theme.cursor || 'default' }}>
        <PageAtmosphere theme={show.theme} />
        <div className="relative" style={{ zIndex: 1 }}>
          <ShowHero show={show} type="show" />
          <CharacterGrid show={show} baseHref={`/shows/${show.slug}`} />
        </div>
      </div>
    </>
  )
}
