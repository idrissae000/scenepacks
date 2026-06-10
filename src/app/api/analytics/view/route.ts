import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { slug, type, label } = await req.json()
    if (!slug || !type) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const { data, error } = await supabase.rpc('increment_views', { p_slug: slug, p_type: type, p_label: label ?? '' })
    if (error) throw error

    return NextResponse.json({ ok: true, views: data })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
