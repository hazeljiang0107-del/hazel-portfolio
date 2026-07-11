import { useEffect, useMemo, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { COUNT_DURATION_MS } from '../../motion/caseStudyMotion'

/**
 * Count-up emphasis — ported from motion-anything recipes/web/count-up
 * Animates once on enter; reduced-motion shows the final value immediately.
 */
export default function CountUp({
  value,
  className = '',
  style,
  duration = COUNT_DURATION_MS,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const prefersReducedMotion = useReducedMotion()
  const parsed = useMemo(() => parseCountValue(value), [value])
  const [display, setDisplay] = useState(() =>
    prefersReducedMotion || !parsed.animatable ? value : formatCount(0, parsed)
  )

  useEffect(() => {
    if (!inView) return
    if (prefersReducedMotion || !parsed.animatable) {
      setDisplay(value)
      return
    }

    let start = null
    let frame = 0
    const target = parsed.number

    const step = (ts) => {
      if (start === null) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(formatCount(target * eased, parsed))
      if (p < 1) frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [inView, prefersReducedMotion, value, duration, parsed])

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  )
}

function parseCountValue(raw) {
  const text = String(raw ?? '').trim()
  const match = text.match(/^([^0-9−-]*)([−-]?[\d,.]+)(.*)$/)
  if (!match) return { animatable: false, number: 0, prefix: '', suffix: '', decimals: 0 }

  const prefix = match[1]
  const numRaw = match[2].replace(/,/g, '').replace('−', '-')
  const suffix = match[3]
  const number = parseFloat(numRaw)
  if (!Number.isFinite(number)) return { animatable: false, number: 0, prefix, suffix, decimals: 0 }

  const decimals = numRaw.includes('.') ? (numRaw.split('.')[1]?.length ?? 0) : 0
  return { animatable: true, number, prefix, suffix, decimals }
}

function formatCount(n, parsed) {
  const abs = Math.abs(n)
  const fixed =
    parsed.decimals > 0 ? abs.toFixed(parsed.decimals) : Math.round(abs).toLocaleString()
  const sign = n < 0 ? '−' : ''
  return `${parsed.prefix}${sign}${fixed}${parsed.suffix}`
}
