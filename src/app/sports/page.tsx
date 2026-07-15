import { getBackgroundsAuto } from '@/lib/getBackgrounds'
import { sports } from '@/data/sports'
import SportsClient from './SportsClient'

export default function SportsPage() {
  const images = getBackgroundsAuto(sports)
  return <SportsClient images={images} />
}
