import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { userId, accessToken } = await req.json()

    const guildId = process.env.DISCORD_GUILD_ID
    const botToken = process.env.DISCORD_BOT_TOKEN

    if (!guildId || !botToken) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
    }

    const res = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members/${userId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bot ${botToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ access_token: accessToken }),
    })

    // 201 = joined, 204 = already a member — both success
    if (res.status === 201 || res.status === 204) {
      return NextResponse.json({ success: true })
    }

    const data = await res.json().catch(() => ({}))
    return NextResponse.json(
      { error: (data as any).message || 'Failed to join server' },
      { status: res.status }
    )
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
