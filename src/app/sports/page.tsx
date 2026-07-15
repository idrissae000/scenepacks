import { getBackgrounds } from '@/lib/getBackgrounds'
import SportsClient from './SportsClient'

const SPORTS_KEYWORDS = ['world cup', 'worldcup', 'world-cup', 'football', 'soccer', 'fifa']

export default function SportsPage() {
  const images = getBackgrounds(SPORTS_KEYWORDS)
  return <SportsClient images={images} />
}
