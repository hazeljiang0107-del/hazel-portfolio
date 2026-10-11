import { useEffect, useState } from 'react'

/**
 * One shared rAF loop that writes a 0–1 progress value to a CSS custom property (`--p`) on each
 * tracked element. All motion is then plain CSS `calc()` on that variable, so there are no React
 * re-renders while scrolling and nothing here touches layout.
 *
 *   mode 'pin'  – element is a tall section with a sticky child: 0 at its top edge, 1 when the
 *                 sticky child has run out of room.
 *   mode 'view' – 0 as the element enters the bottom of the viewport, 1 as it leaves the top.
 *   ease        – 1 follows the scroll exactly; < 1 lerps toward it (a soft "scrub").
 *   rest        – value used when the visitor prefers reduced motion (no tracking at all).
 */
const items = new Set()
let raf = 0
let bound = false
const mq = typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)') : null
const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v)

function targetOf(it, vh) {
  const r = it.el.getBoundingClientRect()
  if (it.mode === 'pin') {
    const span = r.height - vh
    return span > 0 ? clamp(-r.top / span) : 0
  }
  return clamp((vh - r.top) / (vh + r.height))
}

function write(it, v) {
  if (it.last !== undefined && Math.abs(v - it.last) < 0.0004) return
  it.last = v
  it.el.style.setProperty('--p', v.toFixed(4))
}

function tick() {
  raf = 0
  const vh = window.innerHeight
  let busy = false
  items.forEach((it) => {
    if (mq && mq.matches) {
      write(it, it.rest)
      return
    }
    const t = targetOf(it, vh)
    if (it.cur === undefined) it.cur = t
    it.cur += (t - it.cur) * it.ease
    if (Math.abs(t - it.cur) > 0.0006) busy = true
    else it.cur = t
    write(it, it.cur)
  })
  if (busy) raf = requestAnimationFrame(tick)
}

function kick() {
  if (!raf) raf = requestAnimationFrame(tick)
}

function bind() {
  if (bound) return
  bound = true
  window.addEventListener('scroll', kick, { passive: true })
  window.addEventListener('resize', kick)
  mq?.addEventListener?.('change', kick)
}

function unbindIfIdle() {
  if (items.size || !bound) return
  bound = false
  window.removeEventListener('scroll', kick)
  window.removeEventListener('resize', kick)
  mq?.removeEventListener?.('change', kick)
}

export function track(el, { mode = 'view', ease = 1, rest = 0.5 } = {}) {
  const it = { el, mode, ease, rest }
  items.add(it)
  bind()
  kick()
  return () => {
    items.delete(it)
    unbindIfIdle()
  }
}

export function useTrack(ref, opts) {
  const { mode, ease, rest } = opts || {}
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    return track(el, { mode, ease, rest })
  }, [ref, mode, ease, rest])
}

export function useReduced() {
  const [r, set] = useState(() => !!mq?.matches)
  useEffect(() => {
    if (!mq) return undefined
    const on = () => set(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return r
}

/**
 * Entrance reveals. Content is visible by default; only elements that start BELOW the fold get
 * `data-pre` (hidden) and lose it once they scroll into view. Skipped for reduced motion.
 */
export function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current
    if (!root || mq?.matches || typeof IntersectionObserver === 'undefined') return undefined
    const vh = window.innerHeight
    const els = [...root.querySelectorAll('[data-rv]')].filter((e) => e.getBoundingClientRect().top > vh * 0.92)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.removeAttribute('data-pre')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    els.forEach((e) => {
      e.setAttribute('data-pre', '')
      io.observe(e)
    })
    return () => {
      io.disconnect()
      els.forEach((e) => e.removeAttribute('data-pre'))
    }
  }, [rootRef])
}
