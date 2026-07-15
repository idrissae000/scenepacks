'use client'

import { useEffect } from 'react'

interface Props {
  slug: string
  type: 'show' | 'movie' | 'game' | 'character' | 'sport'
  label: string
}

export default function PageViewTracker({ slug, type, label }: Props) {
  useEffect(() => {
    fetch('/api/analytics/view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, type, label }),
    }).catch(() => {})
  }, [slug, type, label])

  return null
}
