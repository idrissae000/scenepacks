import fs from 'fs'
import path from 'path'

export function getCreatorBanner(slug: string): string {
  const dir = path.join(process.cwd(), 'public', 'creator-banners')
  let files: string[]
  try {
    files = fs.readdirSync(dir)
  } catch {
    return ''
  }
  // Try full slug first, then each segment (e.g. "inko-visuals" → ["inko","visuals"])
  const segments = [slug, ...slug.split('-')].map(s => s.toLowerCase())
  for (const k of segments) {
    const match = files.find(f => f.toLowerCase().includes(k))
    if (match) return `/creator-banners/${match}`
  }
  return ''
}
