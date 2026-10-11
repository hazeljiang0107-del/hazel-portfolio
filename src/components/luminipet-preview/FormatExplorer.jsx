import { useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { EXPLORER, assets } from '../../data/luminipetPreviewAssets'
import Shot, { EvidenceBadge } from './Shot'

/**
 * Product-format screen explorer. A tablist of four formats; each panel shows
 * one real screen (with optional sub-views) and a one-line note. Not a storefront:
 * nothing here selects, prices, or adds to cart.
 */
export default function FormatExplorer() {
  const baseId = useId()
  const reduce = useReducedMotion()
  const [tab, setTab] = useState(0)
  const [view, setView] = useState(0)
  const tabRefs = useRef([])

  const current = EXPLORER[tab]
  const shot = current.shots[Math.min(view, current.shots.length - 1)]

  const select = (i, focus = false) => {
    setTab(i)
    setView(0)
    if (focus) tabRefs.current[i]?.focus()
  }

  const onKeyDown = (e) => {
    const n = EXPLORER.length
    const keys = {
      ArrowRight: (tab + 1) % n,
      ArrowLeft: (tab - 1 + n) % n,
      Home: 0,
      End: n - 1,
    }
    if (e.key in keys) {
      e.preventDefault()
      select(keys[e.key], true)
    }
  }

  const fade = reduce
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 1 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
      }

  return (
    <div className="lpv-explorer">
      <div role="tablist" aria-label="Product format" className="lpv-tabs" onKeyDown={onKeyDown}>
        {EXPLORER.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => (tabRefs.current[i] = el)}
            role="tab"
            type="button"
            id={`${baseId}-tab-${t.id}`}
            aria-selected={tab === i}
            aria-controls={`${baseId}-panel`}
            tabIndex={tab === i ? 0 : -1}
            className="lpv-tab"
            onClick={() => select(i)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${current.id}`}
        className="lpv-explorer__panel"
      >
        <div className="lpv-explorer__stage">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={`${current.id}-${shot.id}`} className="lpv-explorer__shot" {...fade}>
              <Shot id={shot.id} className="lpv-explorer__fig" imgClassName="lpv-explorer__img" caption={false} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="lpv-explorer__side">
          {current.shots.length > 1 && (
            <div className="lpv-views" role="group" aria-label="Screen view">
              {current.shots.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  className="lpv-view"
                  aria-pressed={view === i}
                  onClick={() => setView(i)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
          <p className="lpv-explorer__cap" aria-live="polite">
            {assets[shot.id].caption}
          </p>
          <dl className="lpv-explorer__facts">
            <div>
              <dt>Unique to this format</dt>
              <dd>{current.unique}</dd>
            </div>
            <div>
              <dt>Shared across formats</dt>
              <dd>{current.shared}</dd>
            </div>
          </dl>
          <EvidenceBadge asset={assets[shot.id]} />
        </div>
      </div>
    </div>
  )
}
