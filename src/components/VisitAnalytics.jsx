import { useEffect } from 'react'
import { Analytics, track } from '@vercel/analytics/react'

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']

/**
 * Records page views, referrers, and UTM tags from the landing URL.
 * Vercel Web Analytics must be enabled on the project, and this only
 * sends data from a production deploy — not from the local dev server.
 */
export default function VisitAnalytics() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const properties = {}
    for (const key of UTM_KEYS) {
      const value = params.get(key)?.trim()
      if (value) properties[key.slice(4)] = value.slice(0, 120)
    }
    if (Object.keys(properties).length === 0) return
    track('Visit source', properties)
  }, [])

  return <Analytics />
}
