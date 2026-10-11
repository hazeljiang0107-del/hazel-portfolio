import { useEffect, useRef, useState } from 'react'
import Figure from './Figure'
import { useMediaQuery } from '../luminipet-preview/useMediaQuery'

/**
 * The one scroll-linked demo.
 * A menu crop sticks while three short notes scroll past; a single highlight box slides
 * (260 ms) to the matching region. Scroll only *selects*: it never moves the page.
 * Every note is also a button, so tap, click and keyboard focus do the same thing.
 * Below 1024 px (or with reduced motion) the figure is not sticky and nothing is scroll-driven.
 */
export default function RegionWalk({ asset, steps, label }) {
  const [active, setActive] = useState(steps[0].id)
  const refs = useRef({})
  const wide = useMediaQuery('(min-width: 1024px)')
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    if (!wide || reduce || typeof IntersectionObserver === 'undefined') return undefined
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.dataset.step)
        })
      },
      { rootMargin: '-42% 0px -42% 0px' },
    )
    Object.values(refs.current).forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [wide, reduce])

  const region = asset.regions.find((r) => r.id === active)

  return (
    <div className="pp-walk">
      <div className="pp-walk__fig">
        <Figure item={asset} label={label} sizes="(min-width: 1024px) 56vw, 100vw">
          <span
            className="pp-hl"
            aria-hidden="true"
            style={{ left: `${region.x}%`, top: `${region.y}%`, width: `${region.w}%`, height: `${region.h}%` }}
          />
        </Figure>
      </div>
      <ol className="pp-walk__steps">
        {steps.map((s, i) => (
          <li
            key={s.id}
            ref={(el) => (refs.current[s.id] = el)}
            data-step={s.id}
            className={`pp-walk__step${active === s.id ? ' is-active' : ''}`}
          >
            <button
              type="button"
              aria-pressed={active === s.id}
              onClick={() => setActive(s.id)}
              onFocus={() => setActive(s.id)}
            >
              <span className="pp-walk__n">{i + 1}</span>
              <span className="pp-walk__t">
                <strong>{s.label}</strong>
                {s.text}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
