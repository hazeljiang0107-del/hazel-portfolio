import { useRef, useState } from 'react'
import Figure from './Figure'

/**
 * Hand-painted ⇄ hand-sculpted option panels, crossfaded (260 ms) in place.
 * Pins are always visible and numbered to match the notes; hover, focus or tap on a note
 * (or pin) highlights its region. Tabs follow the WAI-ARIA tab pattern (arrow keys, Home, End).
 *
 * `tabs` = [{ id, label, asset, notes: [string], regions: [{x,y,w,h}] }]  (regions[i] ↔ notes[i])
 */
export default function FormatSwap({ tabs, labelFor }) {
  const [tab, setTab] = useState(tabs[0].id)
  const [hot, setHot] = useState(0)
  const btns = useRef([])

  const onKey = (e, i) => {
    let n = null
    if (e.key === 'ArrowRight') n = (i + 1) % tabs.length
    else if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length
    else if (e.key === 'Home') n = 0
    else if (e.key === 'End') n = tabs.length - 1
    if (n === null) return
    e.preventDefault()
    setTab(tabs[n].id)
    setHot(0)
    btns.current[n]?.focus()
  }

  const current = tabs.find((t) => t.id === tab)

  return (
    <div className="pp-swap">
      <div className="pp-swap__tabs" role="tablist" aria-label="Product format">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => (btns.current[i] = el)}
            role="tab"
            id={`swap-tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`swap-panel-${t.id}`}
            tabIndex={tab === t.id ? 0 : -1}
            onClick={() => {
              setTab(t.id)
              setHot(0)
            }}
            onKeyDown={(e) => onKey(e, i)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="pp-swap__body">
        <div className="pp-swap__stage">
          {tabs.map((t) => (
            <div
              key={t.id}
              id={`swap-panel-${t.id}`}
              role="tabpanel"
              aria-labelledby={`swap-tab-${t.id}`}
              aria-hidden={tab !== t.id}
              className={`pp-swap__panel${tab === t.id ? ' is-on' : ''}`}
            >
              <Figure item={t.asset} label={labelFor(t.asset)} zoom={tab === t.id}>
                {t.regions.map((r, i) => (
                  <span
                    key={i}
                    className={`pp-pin${tab === t.id && hot === i ? ' is-hot' : ''}`}
                    aria-hidden="true"
                    style={{ left: `${r.x}%`, top: `${r.y}%`, width: `${r.w}%`, height: `${r.h}%` }}
                  >
                    <b>{i + 1}</b>
                  </span>
                ))}
              </Figure>
            </div>
          ))}
        </div>

        <ol className="pp-swap__notes" aria-label={`${current.label} options`}>
          {current.notes.map((n, i) => (
            <li key={n}>
              <button
                type="button"
                className={hot === i ? 'is-hot' : ''}
                aria-pressed={hot === i}
                onMouseEnter={() => setHot(i)}
                onFocus={() => setHot(i)}
                onClick={() => setHot(i)}
              >
                <b>{i + 1}</b>
                {n}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
