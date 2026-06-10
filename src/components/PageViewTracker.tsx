'use client'

import { useEffect } from 'react'

interface Props {
  slug: string
  type: 'show' | 'movie' | 'game' | 'character'
  label: string
}

export default function PageViewTracker({ slug, type, label }: Props) {
  useEffect(() => {
    const key = `viewed_${type}_${slug}`
    if (typeof window === 'undefined' || sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, '1')
    fetch('/api/analytics/view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, type, label }),
    }).catch(() => {})
  }, [slug, type, label])

  return null
}
