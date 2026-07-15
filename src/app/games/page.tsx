import { getBackgroundsAuto } from '@/lib/getBackgrounds'
import { games } from '@/data/games'
import GamesClient from './GamesClient'

export default function GamesPage() {
  const images = getBackgroundsAuto(games)
  return <GamesClient images={images} />
}
