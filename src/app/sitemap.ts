import { MetadataRoute } from 'next'
import { shows } from '@/data/shows'
import { movies } from '@/data/movies'

const BASE = 'https://idrissscenes.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { url: BASE, lastModified: new Date() },
    { url: `${BASE}/shows`, lastModified: new Date() },
    { url: `${BASE}/movies`, lastModified: new Date() },
    { url: `${BASE}/request`, lastModified: new Date() },
    { url: `${BASE}/support`, lastModified: new Date() },
  ]

  const showRoutes = shows.flatMap((s) => [
    { url: `${BASE}/shows/${s.slug}`, lastModified: new Date() },
    ...s.characters.map((c) => ({ url: `${BASE}/shows/${s.slug}/${c.slug}`, lastModified: new Date() })),
  ])

  const movieRoutes = movies.flatMap((m) => [
    { url: `${BASE}/movies/${m.slug}`, lastModified: new Date() },
    ...m.characters.map((c) => ({ url: `${BASE}/movies/${m.slug}/${c.slug}`, lastModified: new Date() })),
  ])

  return [...staticRoutes, ...showRoutes, ...movieRoutes]
}
