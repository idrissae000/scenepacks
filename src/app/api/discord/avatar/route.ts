import { NextRequest, NextResponse } from 'next/server'

const DEFAULT_AVATAR = 'https://cdn.discordapp.com/embed/avatars/0.png'

// In-process cache: discordId → { url, expiresAt }
const cache = new Map<string, { url: string; expiresAt: number }>()

export async function GET(req: NextRequest) {
  const discordId = req.nextUrl.searchParams.get('discordId')
  if (!discordId) {
    return NextResponse.json({ url: DEFAULT_AVATAR })
  }

  const cached = cache.get(discordId)
  if (cached && cached.expiresAt > Date.now()) {
    return NextResponse.json({ url: cached.url }, {
      headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
    })
  }

  try {
    const res = await fetch(`https://discord.com/api/users/${discordId}`, {
      headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
      cache: 'no-store',
    })
    if (!res.ok) throw new Error(`Discord API ${res.status}`)

    const user = await res.json()
    const url = user.avatar
      ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
      : DEFAULT_AVATAR

    cache.set(discordId, { url, expiresAt: Date.now() + 3_600_000 })

    return NextResponse.json({ url }, {
      headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
    })
  } catch {
    return NextResponse.json({ url: DEFAULT_AVATAR })
  }
}
