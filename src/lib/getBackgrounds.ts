import fs from 'fs'
import path from 'path'

export function getBackgrounds(keywords: string[]): string[] {
  const dir = path.join(process.cwd(), 'public', 'backgrounds')
  let files: string[]
  try {
    files = fs.readdirSync(dir)
  } catch {
    return []
  }

  const lower = keywords.map(k => k.toLowerCase())
  const matched = files.filter(f => {
    const name = f.toLowerCase()
    return lower.some(k => name.includes(k))
  })

  if (matched.length === 0) return []
  return matched.map(f => `/backgrounds/${f}`)
}
