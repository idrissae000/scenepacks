import HeroSection from '@/components/HeroSection'
import HomeBrowse from '@/components/HomeBrowse'
import PopularCreators from '@/components/PopularCreators'
import { getTrendingChars, getAnalyticsMap, getDiscordAvatar } from '@/lib/serverData'
import { getCreatorStats } from '@/lib/creatorStats'

export const revalidate = 60

export default async function HomePage() {
  const [trendingChars, analyticsMap] = await Promise.all([
    getTrendingChars(),
    getAnalyticsMap(),
  ])

  const creatorStats = getCreatorStats().sort((a, b) => b.totalPacks - a.totalPacks)
  const creatorsWithAvatars = await Promise.all(
    creatorStats.map(async creator => ({
      ...creator,
      avatarUrl: await getDiscordAvatar(creator.discordId),
    }))
  )

  return (
    <>
      <div className="fixed inset-0 pointer-events-none" style={{
        zIndex: -1,
        background: 'linear-gradient(to bottom, #6b0000 0%, #3d0000 35%, #1a0000 70%, #0d0a07 100%)',
      }} />

      <HeroSection />

      <HomeBrowse
        trendingChars={trendingChars}
        initialAnalytics={analyticsMap}
      />

      <PopularCreators creators={creatorsWithAvatars} />
    </>
  )
}
