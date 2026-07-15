import { getBackgroundsAuto } from '@/lib/getBackgrounds'
import { movies } from '@/data/movies'
import MoviesClient from './MoviesClient'

export default function MoviesPage() {
  const images = getBackgroundsAuto(movies)
  return <MoviesClient images={images} />
}
