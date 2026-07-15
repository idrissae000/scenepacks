import fs from 'fs'
import path from 'path'

export function getCreatorBanner(keyword: string): string {
  const dir = path.join(process.cwd(), 'public', 'creator-banners')
  let files: string[]
  try {
    files = fs.readdirSync(dir)
  } catch {
    return ''
  }
  const k = keyword.toLowerCase()
  const match = files.find(f => f.toLowerCase().includes(k))
  return match ? `/creator-banners/${match}` : ''
}
