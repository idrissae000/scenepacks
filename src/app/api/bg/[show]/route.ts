import { NextResponse } from 'next/server'

const SOURCES: Record<string, string> = {
  'the-sopranos':    'https://wallpapercave.com/wp/wp1816435.jpg',
  'breaking-bad':    'https://wallpapercave.com/wp/wp2045782.jpg',
  'better-call-saul':'https://wallpapercave.com/wp/wp4956742.jpg',
  'game-of-thrones': 'https://wallpapercave.com/wp/wp1816435.jpg',
  'prison-break':    'https://wallpapercave.com/wp/wp2489851.jpg',
  'sons-of-anarchy': 'https://wallpapercave.com/wp/wp2045782.jpg',
  'you':             'https://wallpapercave.com/wp/wp7154573.jpg',
  'barry':           'https://wallpapercave.com/wp/wp9056832.jpg',
  'the-bear':        'https://wallpapercave.com/wp/wp12377451.jpg',
  'batman-2022':     'https://wallpapercave.com/wp/wp10745428.jpg',
  'mcu':             'https://wallpapercave.com/wp/wp4013799.jpg',
}

export async function GET(
  _req: Request,
  { params }: { params: { show: string } }
) {
  const src = SOURCES[params.show]
  if (!src) return NextResponse.json({ error: 'not found' }, { status: 404 })

  const upstream = await fetch(src, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
    },
    next: { revalidate: 604800 }, // cache 1 week on Vercel edge
  })

  if (!upstream.ok) {
    return NextResponse.json({ error: 'upstream failed', status: upstream.status }, { status: 502 })
  }

  const contentType = upstream.headers.get('content-type') ?? 'image/jpeg'
  const buffer = await upstream.arrayBuffer()

  return new Response(buffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
    },
  })
}
