import { getBackgrounds } from '@/lib/getBackgrounds'
import ShowsClient from './ShowsClient'

const SHOWS_KEYWORDS = [
  'sopranos', 'breaking', 'saul', 'thrones',
  'prison', 'anarchy', 'you', 'barry', 'bear',
  'btas', 'animated', 'boys', 'batman-btas',
]

export default function ShowsPage() {
  const images = getBackgrounds(SHOWS_KEYWORDS)
  return <ShowsClient images={images} />
}
