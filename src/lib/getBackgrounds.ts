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

const STOP_WORDS = new Set(['the', 'a', 'an', 'of', 'and', 'or', 'in', 'v', 'to', 'for', 'on', 'at', 'by', 'is', 'it'])

export function getBackgroundsAuto(data: any[]): string[] {
  const dir = path.join(process.cwd(), 'public', 'backgrounds')
  let files: string[]
  try {
    files = fs.readdirSync(dir)
  } catch {
    return []
  }

  const keywords = new Set<string>()
  for (const item of data) {
    if (item.slug) {
      for (const seg of item.slug.split('-')) {
        const s = seg.toLowerCase()
        if (s.length > 1 && !STOP_WORDS.has(s)) keywords.add(s)
      }
    }
    if (item.name) {
      for (const word of item.name.split(/[^a-zA-Z0-9]+/)) {
        const s = word.toLowerCase()
        if (s.length > 1 && !STOP_WORDS.has(s)) keywords.add(s)
      }
    }
  }

  const seen = new Set<string>()
  const matched: string[] = []
  for (const file of files) {
    const name = file.toLowerCase()
    if ([...keywords].some(k => name.includes(k)) && !seen.has(file)) {
      seen.add(file)
      matched.push(`/backgrounds/${file}`)
    }
  }
  return matched
}
