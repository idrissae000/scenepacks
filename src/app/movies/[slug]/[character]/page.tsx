import { notFound } from 'next/navigation'
import { movies } from '@/data/movies'
import CharacterPage from '@/components/CharacterPage'

interface Props { params: { slug: string; character: string } }

export function generateStaticParams() {
  return movies.flatMap((m) =>
    m.characters.map((c) => ({ slug: m.slug, character: c.slug }))
  )
}

export function generateMetadata({ params }: Props) {
  const movie = movies.find((m) => m.slug === params.slug)
  const char = movie?.characters.find((c) => c.slug === params.character)
  if (!char) return {}
  return { title: `${char.name} — ${movie!.name} — Idriss.ae Scenepacks` }
}

export default function MovieCharacterPage({ params }: Props) {
  const movie = movies.find((m) => m.slug === params.slug)
  const char = movie?.characters.find((c) => c.slug === params.character)
  if (!movie || !char) notFound()

  return <CharacterPage character={char} parent={{ name: movie.name, slug: movie.slug, theme: movie.theme }} type="movie" />
}
