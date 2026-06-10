import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// GET /api/analytics/bulk?type=show
// Returns { [slug]: { views, downloads } } for all rows of that type
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type')

  if (!type) return NextResponse.json({ error: 'Missing type' }, { status: 400 })

  const { data, error } = await supabase
    .from('analytics')
    .select('slug, views, downloads')
    .eq('type', type)

  if (error) return NextResponse.json({ error: 'Failed' }, { status: 500 })

  const map: Record<string, { views: number; downloads: number }> = {}
  for (const row of data ?? []) {
    map[row.slug] = { views: row.views, downloads: row.downloads }
  }

  return NextResponse.json(map)
}
