import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { slug, type, label, method, discordId, username, creatorId } = await req.json()
    if (!slug || !type) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const { data, error } = await supabase.rpc('increment_downloads', {
      p_slug:       slug,
      p_type:       type,
      p_label:      label ?? '',
      p_method:     method ?? 'unknown',
      p_discord_id: discordId ?? null,
      p_username:   username ?? null,
      p_creator_id: creatorId ?? null,
    })
    if (error) throw error

    return NextResponse.json({ ok: true, downloads: data })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
