import { useId, useRef, useState } from 'react'
import { MENU, MENU_PAGE_COUNT } from '../../data/luminipetMenu'

/**
 * The audit's three-level menu as a mind map. Level 1 is a tab row; the chosen menu branches
 * into level 2, then level 3, each leaf with the job its page does. Arrow keys move between tabs.
 */
export default function MenuMindMap({ caption }) {
  const [active, setActive] = useState(0)
  const tabs = useRef([])
  const uid = useId()
  const l1 = MENU[active]

  const onKey = (e) => {
    const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]
    let next = d === undefined ? null : (active + d + MENU.length) % MENU.length
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = MENU.length - 1
    if (next === null) return
    e.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <figure className="pp-mm">
      <div className="pp-mm__bar">
        <p className="pp-mm__root">Main menu</p>
        <div className="pp-mm__tabs" role="tablist" aria-label="Top-level menu" onKeyDown={onKey}>
          {MENU.map((m, i) => (
            <button
              key={m.label}
              ref={(el) => (tabs.current[i] = el)}
              type="button"
              role="tab"
              id={`${uid}-t${i}`}
              aria-selected={i === active}
              aria-controls={`${uid}-p`}
              tabIndex={i === active ? 0 : -1}
              className="pp-mm__tab"
              onClick={() => setActive(i)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pp-mm__panel" role="tabpanel" id={`${uid}-p`} aria-labelledby={`${uid}-t${active}`} key={active}>
        <div className="pp-mm__tree">
          <p className="pp-mm__node pp-mm__node--l1">
            {l1.label}
            {l1.flat && <small>One page</small>}
          </p>
          <ul className="pp-mm__kids">
            {l1.kids.map((l2) => (
              <li key={l2.label} className="pp-mm__branch">
                <p className="pp-mm__node pp-mm__node--l2">
                  {l2.label}
                  {l2.flat && <small>One page</small>}
                  {l2.job && <span>{l2.job}</span>}
                </p>
                {l2.kids && (
                  <ul className="pp-mm__kids">
                    {l2.kids.map(([name, job]) => (
                      <li key={name} className="pp-mm__branch">
                        <p className="pp-mm__node pp-mm__node--l3">
                          {name}
                          <span>{job}</span>
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {caption && (
        <figcaption className="pp-cap-text">
          {caption} {MENU.length} menus, {MENU_PAGE_COUNT} pages.
        </figcaption>
      )}
    </figure>
  )
}
