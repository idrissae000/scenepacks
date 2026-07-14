import { createClient } from '@supabase/supabase-js'
import { shows } from '@/data/shows'
import { movies } from '@/data/movies'
import { games } from '@/data/games'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export interface TrendingChar {
  analyticsSlug: string
  name: string
  image: string
  href: string
  parentName: string
}

function buildCharLookup(): Map<string, TrendingChar> {
  const map = new Map<string, TrendingChar>()
  for (const s of shows as any[]) {
    for (const c of s.characters) {
      const slug = `${s.slug}__${c.slug}`
      map.set(slug, { analyticsSlug: slug, name: c.name, image: c.image, href: `/shows/${s.slug}/${c.slug}`, parentName: s.name })
    }
  }
  for (const m of movies as any[]) {
    for (const c of m.characters) {
      const slug = `${m.slug}__${c.slug}`
      map.set(slug, { analyticsSlug: slug, name: c.name, image: c.image, href: `/movies/${m.slug}/${c.slug}`, parentName: m.name })
    }
  }
  for (const g of games as any[]) {
    for (const c of g.characters) {
      const slug = `${g.slug}__${c.slug}`
      map.set(slug, { analyticsSlug: slug, name: c.name, image: c.image, href: `/games/${g.slug}/${c.slug}`, parentName: g.name })
    }
  }
  return map
}

const CHAR_LOOKUP = buildCharLookup()
const DEFAULT_AVATAR = 'https://cdn.discordapp.com/embed/avatars/0.png'

export async function getTrendingChars(): Promise<TrendingChar[]> {
  try {
    const supabase = getSupabase()
    const { data } = await supabase.rpc('get_trending', { days_back: 14, result_limit: 10 })
    const slugs: string[] = (data ?? []).map((r: any) => r.slug)
    return slugs.map(s => CHAR_LOOKUP.get(s)).filter(Boolean) as TrendingChar[]
  } catch {
    return []
  }
}

export async function getAnalyticsMap(): Promise<Record<string, { views: number; downloads: number }>> {
  try {
    const supabase = getSupabase()
    const { data } = await supabase
      .from('analytics')
      .select('slug, views, downloads')
      .eq('type', 'character')
    const map: Record<string, { views: number; downloads: number }> = {}
    for (const row of data ?? []) {
      map[row.slug] = { views: row.views ?? 0, downloads: row.downloads ?? 0 }
    }
    return map
  } catch {
    return {}
  }
}

export async function getDiscordAvatar(discordId: string): Promise<string> {
  try {
    const res = await fetch(`https://discord.com/api/users/${discordId}`, {
      headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return DEFAULT_AVATAR
    const user = await res.json()
    return user.avatar
      ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
      : DEFAULT_AVATAR
  } catch {
    return DEFAULT_AVATAR
  }
}
