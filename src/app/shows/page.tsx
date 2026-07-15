import { getBackgroundsAuto } from '@/lib/getBackgrounds'
import { shows } from '@/data/shows'
import ShowsClient from './ShowsClient'

export default function ShowsPage() {
  const images = getBackgroundsAuto(shows)
  return <ShowsClient images={images} />
}
