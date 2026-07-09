import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const revalidate = 0

export async function GET() {
  try {
    const { data, error } = await supabase.rpc('get_trending', { days_back: 14, result_limit: 10 })
    if (error) throw error
    const trending = (data ?? []).map((r: { slug: string; label: string; score: number }) => r.slug)
    return NextResponse.json({ trending })
  } catch {
    return NextResponse.json({ trending: [] })
  }
}
