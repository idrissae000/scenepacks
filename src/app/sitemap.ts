import { MetadataRoute } from 'next'
import { shows } from '@/data/shows'
import { movies } from '@/data/movies'
import { games } from '@/data/games'

const BASE = 'https://idrissscenes.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { url: BASE, lastModified: new Date() },
    { url: `${BASE}/shows`, lastModified: new Date() },
    { url: `${BASE}/movies`, lastModified: new Date() },
    { url: `${BASE}/games`, lastModified: new Date() },
    { url: `${BASE}/request`, lastModified: new Date() },
    { url: `${BASE}/support`, lastModified: new Date() },
    { url: `${BASE}/coming-soon`, lastModified: new Date() },
    { url: `${BASE}/apply`, lastModified: new Date() },
  ]

  const showRoutes = shows.flatMap((s: any) => [
    { url: `${BASE}/shows/${s.slug}`, lastModified: new Date() },
    ...s.characters.map((c: any) => ({ url: `${BASE}/shows/${s.slug}/${c.slug}`, lastModified: new Date() })),
  ])

  const movieRoutes = movies.flatMap((m: any) => [
    { url: `${BASE}/movies/${m.slug}`, lastModified: new Date() },
    ...m.characters.map((c: any) => ({ url: `${BASE}/movies/${m.slug}/${c.slug}`, lastModified: new Date() })),
  ])

  const gameRoutes = games.flatMap((g: any) => [
    { url: `${BASE}/games/${g.slug}`, lastModified: new Date() },
    ...g.characters.map((c: any) => ({ url: `${BASE}/games/${g.slug}/${c.slug}`, lastModified: new Date() })),
  ])

  return [...staticRoutes, ...showRoutes, ...movieRoutes, ...gameRoutes]
}
