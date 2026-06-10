import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')
  const type = searchParams.get('type')

  if (!slug || !type) return NextResponse.json({ error: 'Missing params' }, { status: 400 })

  const { data, error } = await supabase
    .from('analytics')
    .select('views, downloads')
    .eq('slug', slug)
    .eq('type', type)
    .maybeSingle()

  if (error) return NextResponse.json({ error: 'Failed' }, { status: 500 })

  return NextResponse.json({ views: data?.views ?? 0, downloads: data?.downloads ?? 0 })
}
