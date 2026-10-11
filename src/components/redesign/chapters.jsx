import { useEffect, useRef } from 'react'
import { useTrack } from './scrollFx'
import { ChapterHead, Media, Caption } from './ui'

const REEL_R = [-2.2, 1.6, -1, 2, -1.8, 1.2, -0.8]
const REEL_Y = ['0px', '34px', '-18px', '26px', '-6px', '40px', '-12px']
const SHEET_R = [-1.4, 1.1, -0.8, 1.3, -1]

/* ───────────── 01 · Pinned horizontal reel ─────────────
 * Vertical scroll drives a sideways track 1:1 (the section is `100vh + overflow` tall and its sticky
 * child translates the track). Phones and reduced motion get a native, swipeable scroller instead. */
export function Reel({ c }) {
  const sec = useRef(null)
  const view = useRef(null)
  const track = useRef(null)
  useTrack(sec, { mode: 'pin', ease: 0.12, rest: 0 })

  useEffect(() => {
    const s = sec.current
    const t = track.current
    const v = view.current
    if (!s || !t || !v) return undefined
    const measure = () => s.style.setProperty('--dx', `${Math.max(0, t.scrollWidth - v.clientWidth)}px`)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(t)
    ro.observe(v)
    return () => ro.disconnect()
  }, [])

  // Keyboard: focusing a card that is off to the side scrolls the page far enough to bring it in.
  const onFocus = (e) => {
    const li = e.target.closest('li')
    const s = sec.current
    const v = view.current
    if (!li || !s || !v || window.matchMedia('(max-width: 800px), (prefers-reduced-motion: reduce)').matches) return
    v.scrollLeft = 0
    const dx = parseFloat(getComputedStyle(s).getPropertyValue('--dx')) || 0
    const want = Math.min(dx, Math.max(0, li.offsetLeft - v.clientWidth * 0.18))
    window.scrollTo({ top: s.getBoundingClientRect().top + window.scrollY + want, behavior: 'auto' })
  }

  return (
    <section id={c.id} ref={sec} className="rd-ch rd-reel" aria-labelledby={`${c.id}-t`}>
      <div className="rd-reel__pin">
        <ChapterHead c={c} />
        <div className="rd-reel__view" ref={view}>
          <ul className="rd-reel__track" ref={track} onFocus={onFocus}>
            {c.items.map((it, i) => (
              <li key={it.src} className="rd-reel__card" style={{ '--r': `${REEL_R[i % REEL_R.length]}deg`, '--y': REEL_Y[i % REEL_Y.length], '--ar': (it.width / it.height).toFixed(4) }}>
                <Media item={it} eager={i < 2} />
                <Caption item={it} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ───────────── 02 · Sticky stack ─────────────
 * Pure CSS: every sheet is `position: sticky` with a slightly lower `top`, so each new sheet slides
 * over the previous one and the edges of earlier sheets stay visible. */
export function Stack({ c }) {
  return (
    <section id={c.id} className="rd-ch rd-stack" aria-labelledby={`${c.id}-t`}>
      <ChapterHead c={c} />
      <ol className="rd-stack__list">
        {c.items.map((it, i) => {
          const portrait = it.height > it.width
          return (
            <li key={it.src} className="rd-sheet" data-portrait={portrait || undefined} style={{ '--i': i, '--r': `${SHEET_R[i % SHEET_R.length]}deg` }}>
              <div className="rd-sheet__in">
                {portrait && (
                  <div className="rd-sheet__txt">
                    <p className="rd-sheet__big">{it.cap}</p>
                    {it.sub && <p className="rd-sheet__sub">{it.sub}</p>}
                    <em>{it.tag}</em>
                  </div>
                )}
                <div className="rd-sheet__m">
                  <Media item={it} fit eager={i === 0} />
                </div>
                {!portrait && <Caption item={it} />}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

/* ───────────── 03 · Spread ─────────────
 * Three screens start fanned out of one pile; scrolling through the pinned section deals them
 * apart, then a fourth strip rises in. Phones and reduced motion get a swipeable row. */
export function Spread({ c }) {
  const sec = useRef(null)
  useTrack(sec, { mode: 'pin', ease: 0.12, rest: 1 })
  const row = c.items.filter((x) => !x.wide)
  const wide = c.items.find((x) => x.wide)
  return (
    <section id={c.id} ref={sec} className="rd-ch rd-spread" aria-labelledby={`${c.id}-t`}>
      <div className="rd-spread__pin">
        <ChapterHead c={c} />
        <div className="rd-spread__stage">
          <div className="rd-spread__row">
            {row.map((it, i) => (
              <figure key={it.src} className="rd-scr" style={{ '--i': i - (row.length - 1) / 2 }}>
                <Media item={it} />
                <Caption item={it} />
              </figure>
            ))}
          </div>
          {wide && (
            <figure className="rd-spread__hud">
              <Media item={wide} />
              <Caption item={wide} />
            </figure>
          )}
        </div>
      </div>
    </section>
  )
}

/* ───────────── 04 · Float (parallax) ───────────── */
const PH_TY = ['-150px', '-60px', '-210px', '-100px']
const PH_R = ['2deg', '-2.5deg', '1.5deg', '-1.5deg']
export function Float({ c }) {
  const stage = useRef(null)
  useTrack(stage, { mode: 'view', ease: 1, rest: 0.5 })
  const [main, ...phones] = c.items
  return (
    <section id={c.id} className="rd-ch rd-float" aria-labelledby={`${c.id}-t`}>
      <ChapterHead c={c} />
      <div className="rd-float__stage" ref={stage}>
        <figure className="rd-fl rd-fl--main" style={{ '--ty': '-70px', '--r': '-1.4deg' }}>
          <Media item={main} />
          <Caption item={main} />
        </figure>
        <div className="rd-float__phones">
          {phones.map((it, i) => (
            <figure key={it.src} className="rd-fl rd-fl--ph" style={{ '--ty': PH_TY[i], '--r': PH_R[i] }}>
              <div className="rd-ph">
                <Media item={it} fit />
              </div>
              <Caption item={it} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────── 05 · Drift (dark band) ───────────── */
const DR_TY = ['-90px', '60px', '-140px', '30px', '-110px', '70px']
export function Drift({ c }) {
  const stage = useRef(null)
  useTrack(stage, { mode: 'view', ease: 1, rest: 0.5 })
  const lead = c.items.find((x) => x.lead)
  const phones = c.items.filter((x) => x.phone)
  return (
    <section id={c.id} className="rd-ch rd-drift" aria-labelledby={`${c.id}-t`}>
      <ChapterHead c={c} />
      <div className="rd-drift__stage" ref={stage}>
        {lead && (
          <figure className="rd-drift__lead">
            <Media item={lead} />
            <Caption item={lead} />
          </figure>
        )}
        <ul className="rd-drift__row">
          {phones.map((it, i) => (
            <li key={it.src} className="rd-dr" style={{ '--ty': DR_TY[i % DR_TY.length] }}>
              <div className="rd-ph rd-ph--dark">
                <Media item={it} fit />
              </div>
              <Caption item={it} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ───────────── 06 · Frames ───────────── */
const FR_R = ['-2.4deg', '1.8deg', '-1.2deg', '2.2deg']
export function Frames({ c }) {
  const [main, ...frames] = c.items
  return (
    <section id={c.id} className="rd-ch rd-frames" aria-labelledby={`${c.id}-t`}>
      <ChapterHead c={c} />
      <figure className="rd-frames__main" data-rv>
        <Media item={main} eager />
        <Caption item={main} />
      </figure>
      <ul className="rd-frames__grid">
        {frames.map((it, i) => (
          <li key={it.src} className="rd-fr" style={{ '--r': FR_R[i % FR_R.length], '--d': `${i * 80}ms` }} data-rv>
            <Media item={it} />
            <Caption item={it} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export const MECH = { reel: Reel, stack: Stack, spread: Spread, float: Float, drift: Drift, frames: Frames }
