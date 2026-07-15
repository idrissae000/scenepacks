import { getCreatorBanner } from '@/lib/getCreatorBanner'
import { getCreatorStats } from '@/lib/creatorStats'
import CreatorPageClient from './CreatorPageClient'

export function generateStaticParams() {
  return getCreatorStats().map(c => ({ slug: c.slug }))
}

export default function CreatorPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const bannerUrl = getCreatorBanner(slug)
  return <CreatorPageClient slug={slug} bannerUrl={bannerUrl} />
}
