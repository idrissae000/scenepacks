import { notFound } from 'next/navigation'
import { movies } from '@/data/movies'
import ShowHero from '@/components/ShowHero'
import CharacterGrid from '@/components/CharacterGrid'
import PageAtmosphere from '@/components/PageAtmosphere'

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return movies.map((m) => ({ slug: m.slug }))
}

export function generateMetadata({ params }: Props) {
  const movie = movies.find((m) => m.slug === params.slug)
  if (!movie) return {}
  return { title: `${movie.name} — Idriss.ae Scenepacks`, description: movie.theme.tagline }
}

export default function MoviePage({ params }: Props) {
  const movie = movies.find((m) => m.slug === params.slug)
  if (!movie) notFound()

  return (
    <>
      {movie.theme.bgImage && <link rel="preload" as="image" href={movie.theme.bgImage} />}
      <div className="relative" style={{ minHeight: '100vh', cursor: movie.theme.cursor || 'default' }}>
        <PageAtmosphere theme={movie.theme} />
        <div className="relative" style={{ zIndex: 1 }}>
          <ShowHero show={movie} type="movie" />
          <CharacterGrid show={movie} baseHref={`/movies/${movie.slug}`} />
        </div>
      </div>
    </>
  )
}
