import { notFound } from 'next/navigation'
import { movies } from '@/data/movies'
import ShowHero from '@/components/ShowHero'
import CharacterGrid from '@/components/CharacterGrid'
import PageAtmosphere from '@/components/PageAtmosphere'
import PageViewTracker from '@/components/PageViewTracker'

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return movies.map((m) => ({ slug: m.slug }))
}

const movieDescriptions: Record<string, string> = {
  'batman-2022': 'Free Batman (2022) scenepacks. Robert Pattinson as the Dark Knight. 1080p 24fps aesthetic cinematic clips.',
  'mcu': 'Free MCU scenepacks. Iron Man, Spider-Man, Thanos and more. 1080p 24fps aesthetic cinematic clips.',
}

export function generateMetadata({ params }: Props) {
  const movie = movies.find((m) => m.slug === params.slug)
  if (!movie) return {}
  return {
    title: `${movie.name} Scenepacks — Idriss.ae`,
    description: movieDescriptions[movie.slug] || `Free ${movie.name} scenepacks. 1080p 24fps aesthetic cinematic clips.`,
  }
}

export default function MoviePage({ params }: Props) {
  const movie = movies.find((m) => m.slug === params.slug)
  if (!movie) notFound()

  return (
    <>
      {movie.theme.bgImage && <link rel="preload" as="image" href={movie.theme.bgImage} />}
      <div className="relative" style={{ minHeight: '100vh', cursor: movie.theme.cursor || 'default' }}>
        <PageAtmosphere theme={movie.theme} />
        <PageViewTracker slug={movie.slug} type="movie" label={movie.name} />
        <div className="relative" style={{ zIndex: 1 }}>
          <ShowHero show={movie} type="movie" />
          <CharacterGrid show={movie} baseHref={`/movies/${movie.slug}`} />
        </div>
      </div>
    </>
  )
}
