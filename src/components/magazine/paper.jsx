import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useReduced } from '../redesign/scrollFx'

/* ───────────── small hooks ───────────── */

/** True once the element has scrolled into view (immediately true for reduced motion). */
export function useInView(ref, { threshold = 0.3, once = true } = {}) {
  const reduce = useReduced()
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (reduce || typeof IntersectionObserver === 'undefined') {
      setOn(true)
      return undefined
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true)
          if (once) io.disconnect()
        } else if (!once) setOn(false)
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, reduce, threshold, once])
  return on
}

/* ───────────── torn paper edge ───────────── */
function rng(seed) {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * A clip-path polygon whose top and/or bottom edge is ripped. Deterministic per seed, so the
 * same page always tears the same way. Pure geometry: no raster images.
 */
export function tornClip(seed = 1, { top = false, bottom = true, amp = 9, steps = 46 } = {}) {
  const r = rng(seed * 9973)
  const edge = (flip) => {
    const pts = []
    let drift = 0
    for (let i = 0; i <= steps; i++) {
      drift += (r() - 0.5) * amp * 0.9
      drift *= 0.82
      const j = Math.max(0, Math.min(amp, amp / 2 + drift + (r() - 0.5) * amp * 0.7))
      pts.push([(i / steps) * 100, j])
    }
    return flip ? pts.reverse() : pts
  }
  const t = edge(false).map(([x, j]) => `${x.toFixed(2)}% ${top ? j.toFixed(1) : 0}px`)
  const b = edge(true).map(([x, j]) => `${x.toFixed(2)}% ${bottom ? `calc(100% - ${j.toFixed(1)}px)` : '100%'}`)
  return `polygon(${[...t, ...b].join(',')})`
}

export function useTorn(seed, opts) {
  const { top, bottom, amp, steps } = opts || {}
  return useMemo(() => tornClip(seed, { top, bottom, amp, steps }), [seed, top, bottom, amp, steps])
}

/** A narrow strip of ripped paper that sits between sections. Decorative. */
export function Tear({ seed = 3, flip = false }) {
  const clip = useTorn(seed, { top: true, bottom: false, amp: 14, steps: 60 })
  return (
    <div className={`mg-tear${flip ? ' is-flip' : ''}`} aria-hidden="true">
      <div className="mg-tear__p" style={{ clipPath: clip }} />
    </div>
  )
}

/* ───────────── tape ───────────── */
export function Tape({ rot = -4, tone = 'kraft', className = '', style }) {
  return <i className={`mg-tape mg-tape--${tone} ${className}`} style={{ '--tr': `${rot}deg`, ...style }} aria-hidden="true" />
}

/* ───────────── ink stamp ───────────── */
export function Stamp({ text, sub, rot = -10, size = 120, tone = 'red', className = '', style, label }) {
  const raw = useId()
  const id = `st${raw.replace(/[^a-zA-Z0-9]/g, '')}`
  return (
    <svg
      className={`mg-stamp mg-stamp--${tone} ${className}`}
      viewBox="0 0 120 120"
      width={size}
      height={size}
      style={{ '--sr': `${rot}deg`, ...style }}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : 'true'}
    >
      <defs>
        <filter id={id} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" />
        </filter>
        <path id={`${id}p`} d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" />
      </defs>
      <g filter={`url(#${id})`} fill="none" stroke="currentColor">
        <circle cx="60" cy="60" r="57" strokeWidth="3" />
        <circle cx="60" cy="60" r="50.5" strokeWidth="1" />
        <circle cx="60" cy="60" r="30" strokeWidth="1.4" />
        <text fill="currentColor" stroke="none" fontSize="10.4" letterSpacing="2.6" fontWeight="500" style={{ fontFamily: 'var(--mono)' }}>
          <textPath href={`#${id}p`} startOffset="50%" textAnchor="middle">
            {text}
          </textPath>
        </text>
        <text x="60" y={sub && sub.length > 4 ? 64 : 67} textAnchor="middle" fill="currentColor" stroke="none" fontSize={sub && sub.length > 4 ? 15 : 22} fontWeight="700" letterSpacing=".5" style={{ fontFamily: 'var(--disp)' }}>
          {sub}
        </text>
      </g>
    </svg>
  )
}

/* ───────────── handwriting ───────────── */
const PATHS = {
  arrow: 'M4 8 C 20 2, 44 10, 50 32 M41 25 L50 35 L56 21',
  underline: 'M2 7 C 40 2, 80 11, 120 5 S 180 4, 198 8',
  circle: 'M20 40 C 10 10, 120 2, 180 14 C 200 30, 170 74, 90 72 C 30 70, 6 56, 22 26',
}

/**
 * A handwritten note. The words are in the handwriting face; the optional arrow / underline /
 * circle is an SVG stroke that draws itself when the note scrolls into view.
 */
export function Hand({ children, as: Tag = 'span', rot = -3, arrow, underline, circle, className = '', style }) {
  const ref = useRef(null)
  const on = useInView(ref, { threshold: 0.5 })
  return (
    <Tag ref={ref} className={`mg-hand${on ? ' is-in' : ''} ${className}`} style={{ '--hr': `${rot}deg`, ...style }}>
      <span className="mg-hand__t">{children}</span>
      {arrow && (
        <svg className="mg-hand__arrow" viewBox="0 0 60 40" aria-hidden="true">
          <path pathLength="1" d={PATHS.arrow} />
        </svg>
      )}
      {underline && (
        <svg className="mg-hand__ul" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
          <path pathLength="1" d={PATHS.underline} />
        </svg>
      )}
      {circle && (
        <svg className="mg-hand__circle" viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden="true">
          <path pathLength="1" d={PATHS.circle} />
        </svg>
      )}
    </Tag>
  )
}

/** A red marker swipe behind a phrase that sweeps in on scroll. */
export function Mark({ children }) {
  const ref = useRef(null)
  const on = useInView(ref, { threshold: 0.6 })
  return (
    <mark ref={ref} className={`mg-mark${on ? ' is-in' : ''}`}>
      {children}
    </mark>
  )
}

/* ───────────── marquee ───────────── */
export function Marquee({ items, tone = 'red', speed = 38, className = '', label }) {
  const row = (hidden) => (
    <ul className="mg-marq__row" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <li key={`${t}-${i}`}>
          {t}
          <span className="mg-marq__sep" aria-hidden="true">
            ✦
          </span>
        </li>
      ))}
    </ul>
  )
  return (
    <div className={`mg-marq mg-marq--${tone} ${className}`} style={{ '--ms': `${speed}s` }} role="group" aria-label={label}>
      <div className="mg-marq__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
