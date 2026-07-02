import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  const session = await getServerSession()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { type, question1, question2, question3, discordUsername, discordId } = body

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL
  if (!webhookUrl) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  const isAudio = type === 'audio'
  const title = isAudio
    ? 'New Audio Creator Application'
    : 'New Scenepack Creator Application'

  const fields: { name: string; value: string; inline?: boolean }[] = [
    {
      name: isAudio ? 'What type of audios do you make?' : 'What type of scenepacks do you want to make?',
      value: question1 || '—',
    },
    {
      name: isAudio ? 'Audio Sample 1' : 'Scenepack Link',
      value: question2 || '—',
    },
  ]

  if (isAudio && question3) {
    fields.push({ name: 'Audio Sample 2', value: question3 })
  }

  const embed = {
    title,
    color: 5793266,
    fields,
    footer: {
      text: `${discordUsername} • ID: ${discordId}`,
    },
    timestamp: new Date().toISOString(),
  }

  // Send to Discord (unchanged)
  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ embeds: [embed] }),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to send to Discord' }, { status: 500 })
  }

  // Also save to Supabase (non-blocking — never fail the request over this)
  void supabase.from('applications').insert({
    type,
    discord_id:       discordId ?? null,
    discord_username: discordUsername ?? null,
    question1:        question1 ?? null,
    question2:        question2 ?? null,
    question3:        question3 ?? null,
  })

  return NextResponse.json({ ok: true })
}
