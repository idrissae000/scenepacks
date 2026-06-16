import { getBackgrounds } from '@/lib/getBackgrounds'
import GamesClient from './GamesClient'

const GAMES_KEYWORDS = ['rdr', 'redemption', 'arkham', 'kratos', 'god', 'war']

export default function GamesPage() {
  const images = getBackgrounds(GAMES_KEYWORDS)
  return <GamesClient images={images} />
}
