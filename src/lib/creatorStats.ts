import { shows } from '@/data/shows'
import { movies } from '@/data/movies'
import { games } from '@/data/games'
import { sports } from '@/data/sports'
import { creators } from '@/data/creators'

export interface CreatorFranchise {
  name: string
  slug: string
  type: 'show' | 'movie' | 'game' | 'sport'
  logo: string
  packCount: number
}

export interface CreatorWithStats {
  id: string
  slug: string
  name: string
  discordId: string
  tiktok: string
  tiktokUrl: string
  role: string
  bannerImage: string
  totalPacks: number
  franchises: CreatorFranchise[]
}

export function getCreatorStats(): CreatorWithStats[] {
  const allContent: { item: any; type: 'show' | 'movie' | 'game' | 'sport' }[] = [
    ...(shows as any[]).map(s => ({ item: s, type: 'show' as const })),
    ...(movies as any[]).map(m => ({ item: m, type: 'movie' as const })),
    ...(games as any[]).map(g => ({ item: g, type: 'game' as const })),
    ...(sports as any[]).map(s => ({ item: s, type: 'sport' as const })),
  ]

  return (creators as any[]).map(creator => {
    const franchises: CreatorFranchise[] = []
    let totalPacks = 0

    for (const { item, type } of allContent) {
      let packCount = 0
      for (const char of item.characters) {
        if (char.packs) {
          packCount += char.packs.filter((p: any) => p.creatorId === creator.id).length
        } else if (char.creatorId === creator.id) {
          packCount += 1
        }
      }
      if (packCount > 0) {
        franchises.push({
          name: item.name,
          slug: item.slug,
          type,
          logo: item.theme?.logo ?? '',
          packCount,
        })
        totalPacks += packCount
      }
    }

    return { ...creator, totalPacks, franchises } as CreatorWithStats
  })
}
