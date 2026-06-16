import { getBackgrounds } from '@/lib/getBackgrounds'
import MoviesClient from './MoviesClient'

const MOVIES_KEYWORDS = ['batman', 'mcu', 'marvel']

export default function MoviesPage() {
  const images = getBackgrounds(MOVIES_KEYWORDS)
  return <MoviesClient images={images} />
}
