import { useEffect, useRef, useState } from 'react'
import { assets } from '../../data/luminipetPreviewAssets'
import Shot from './Shot'
import { useMediaQuery } from './useMediaQuery'

/**
 * The signature interaction.
 * Desktop (≥1024px): the screenshot sticks while three steps scroll past at normal
 * speed; the step nearest the middle of the viewport highlights its UI region.
 * Normal scrolling is never intercepted. Steps are also focusable and clickable.
 * Mobile / tablet: screenshot first, steps stacked below, every region outlined.
 */
export default function StickyWalkthrough({ assetId, steps }) {
  const asset = assets[assetId]
  const desktop = useMediaQuery('(min-width: 1024px)')
  const [active, setActive] = useState(0)
  const stepRefs = useRef([])

  useEffect(() => {
    if (!desktop) return undefined
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.index))
        })
      },
      { rootMargin: '-42% 0px -42% 0px', threshold: 0 },
    )
    stepRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [desktop])

  return (
    <div className="lpv-sticky">
      <div className="lpv-sticky__stage">
        <Shot id={assetId} caption>
          {asset.regions?.map((r) => {
            const idx = steps.findIndex((s) => s.id === r.id)
            const on = !desktop || idx === active
            return (
              <span
                key={r.id}
                aria-hidden="true"
                className={`lpv-region${on ? ' is-on' : ''}${desktop ? ' is-dim' : ''}`}
                style={{ left: `${r.x}%`, top: `${r.y}%`, width: `${r.w}%`, height: `${r.h}%` }}
              >
                <span className="lpv-region__n">{idx + 1}</span>
              </span>
            )
          })}
        </Shot>
      </div>

      <ol className="lpv-sticky__steps">
        {steps.map((s, i) => (
          <li
            key={s.id}
            ref={(el) => (stepRefs.current[i] = el)}
            data-index={i}
            tabIndex={0}
            className={`lpv-step${desktop && i === active ? ' is-active' : ''}`}
            aria-label={`Step ${i + 1}: ${s.label}. ${s.text}`}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            <span className="lpv-step__n" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h4 className="lpv-step__label">{s.label}</h4>
              <p className="lpv-step__text">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
