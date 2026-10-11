import { Fragment, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTrack } from './scrollFx'
import { Arrow, Media, Shot } from './ui'
import { Sec, Mono, Figure, pad } from './SocCase'
import {
  VIS,
  FLAGS,
  HERO,
  MED,
  SWAP,
  FORMATS,
  FACTS,
  TEMPLATE_MAP,
  PROBLEM_GROUPS,
  PROBLEM_COUNT,
  PRIORITY_MAP,
  STATUS_LABEL,
  MENU,
  MENU_PAGE_COUNT,
} from '../../data/redesignLumini'
import { SITE, RESUME_URL } from '../../data/projects'

const TOTAL = 8
const S = (props) => <Sec total={TOTAL} {...props} />
const HS_R = [-1.4, 2, -1]

/* ───────────── small pieces ───────────── */

/** Evidence flag: shown on the page, exactly as in the visual version */
const Flag = ({ children }) => (
  <p className="rl-flag" role="note">
    <b>Flag</b>
    {children}
  </p>
)

/** Expandable detail (the full problem table, priority map, full menu, original screenshots) */
function More({ summary, children }) {
  return (
    <details className="rl-more" data-rv>
      <summary>
        <span>{summary}</span>
        <i aria-hidden="true" />
      </summary>
      <div className="rl-more__body">{children}</div>
    </details>
  )
}

/** Changed / Why / Built: a tag and one big line each */
function Tags({ rows, className = '' }) {
  return (
    <ul className={`rl-tags ${className}`}>
      {rows.map(([k, v]) => (
        <li key={v} data-rv>
          <b>{k}</b>
          <span>{v}</span>
        </li>
      ))}
    </ul>
  )
}

/* ───────────── hero ───────────── */
export function LHero() {
  const stage = useRef(null)
  useTrack(stage, { mode: 'view', ease: 1, rest: 0.5 })
  const lines = VIS.hero.title.replace(/([:,]) /g, '$1\n').split('\n')
  return (
    <section className="rc-hero" aria-labelledby="rc-h1">
      <div className="rc-hero__text">
        <p className="rd-head__n">Case study · 02 / 06</p>
        <h1 id="rc-h1" className="rc-hero__h1 rl-h1">
          {lines.map((l, i) => (
            <Fragment key={l}>
              {i > 0 && <br />}
              {l}
            </Fragment>
          ))}
        </h1>
        <p className="rc-hero__sub">{VIS.hero.line}</p>
        <p className="rc-hero__links">
          <a className="rd-link" href="https://luminipet.com/" target="_blank" rel="noopener noreferrer">
            Visit luminipet.com <Arrow />
          </a>
        </p>
      </div>

      <div className="rc-stage rl-stage" ref={stage} aria-label="luminipet.com today">
        {HERO.map((it, i) => (
          <figure key={it.src} className={`rc-hs rc-hs--${i}`} style={{ '--r': `${HS_R[i]}deg` }}>
            <Shot item={it} eager={i === 0} />
          </figure>
        ))}
      </div>
      <p className="rc-mono rl-herocap">{VIS.hero.cap}</p>

      <dl className="rc-facts rc-facts--3">
        {FACTS.map(([k, v]) => (
          <div key={k} data-rv>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

/* ───────────── 01 · one catalog, four products ───────────── */
function StructureMap({ caption }) {
  return (
    <figure className="rl-map" data-rv aria-label="Before and after structure of the catalog">
      <div className="rl-map__row">
        <p>Legacy theme</p>
        <div className="rl-map__one">
          <span>All four formats, one catalog</span>
          <i>one template</i>
        </div>
      </div>
      <div className="rl-map__row">
        <p>Rebuilt</p>
        <ul className="rl-map__four">
          {FORMATS.map((f) => (
            <li key={f.t}>
              <span>{f.k}</span>
              <i>{f.t}</i>
            </li>
          ))}
        </ul>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

function ProblemTable() {
  let n = 0
  return (
    <div className="rc-tablewrap">
      <table className="rc-table rl-ptable">
        <thead>
          <tr>
            <th scope="col">
              <span className="rl-sr">Number</span>
            </th>
            <th scope="col">Problem</th>
            <th scope="col">Impact</th>
            <th scope="col">Fix</th>
          </tr>
        </thead>
        <tbody>
          {PROBLEM_GROUPS.map((g) => (
            <Fragment key={g.id}>
              <tr className="rl-ptable__group">
                <th scope="colgroup" colSpan={4}>
                  {g.label} <span>{g.where}</span>
                </th>
              </tr>
              {g.items.map((it) => {
                n += 1
                return (
                  <tr key={it.problem}>
                    <td className="rl-ptable__n">{pad(n)}</td>
                    <td data-label="Problem">
                      <b>{it.problem}</b>
                      <span className="rl-ptable__meta">
                        <span>Audit p. {it.page}</span>
                        <span className={`rl-status is-${it.status}`}>{STATUS_LABEL[it.status]}</span>
                      </span>
                    </td>
                    <td data-label="Impact">{it.impact}</td>
                    <td data-label="Fix">{it.fix}</td>
                  </tr>
                )
              })}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PriorityTable() {
  return (
    <div className="rc-tablewrap">
      <table className="rc-table rl-prio">
        <thead>
          <tr>
            <th scope="col">Area</th>
            <th scope="col">Priority</th>
            <th scope="col">Current action</th>
          </tr>
        </thead>
        <tbody>
          {PRIORITY_MAP.map(([area, p, action]) => (
            <tr key={area} className={p === 'P0' ? 'is-p0' : undefined}>
              <td data-label="Area">{area}</td>
              <td data-label="Priority" className="rl-prio__p">
                {p}
              </td>
              <td data-label="Current action">{action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Problem() {
  const v = VIS.problem
  return (
    <S id="problem" n={1} title={v.h} lead={v.line}>
      <StructureMap caption={v.mapCap} />
      <Flag>{FLAGS.before}</Flag>
      <div className="rl-mores">
        <More summary={`All ${PROBLEM_COUNT} problems from my audit`}>
          <ProblemTable />
        </More>
        <More summary="Priority map, P0 to P3">
          <PriorityTable />
        </More>
      </div>
    </S>
  )
}

/* ───────────── 02 · format first, then style ───────────── */
function MenuMap() {
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
    <div className="rl-mm">
      <div className="rl-mm__tabs" role="tablist" aria-label="Top-level menu" onKeyDown={onKey}>
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
            onClick={() => setActive(i)}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div className="rl-mm__panel" role="tabpanel" id={`${uid}-p`} aria-labelledby={`${uid}-t${active}`} key={active}>
        {l1.flat && <p className="rl-mm__flat">One page</p>}
        <ul className="rl-mm__cols">
          {l1.kids.map((l2) => (
            <li key={l2.label}>
              <h4>
                {l2.label}
                {l2.flat && <small>One page</small>}
              </h4>
              {l2.job && <p>{l2.job}</p>}
              {l2.kids && (
                <ul>
                  {l2.kids.map(([name, job]) => (
                    <li key={name}>
                      <b>{name}</b>
                      <span>{job}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <p className="rc-mono">
        Translated from my audit, pp. 8–9. {MENU.length} menus, {MENU_PAGE_COUNT} pages.
      </p>
    </div>
  )
}

export function Menu() {
  const v = VIS.menu
  return (
    <S id="menu" n={2} title={v.h}>
      <div className="rl-menu">
        <div className="rl-menu__rec" data-rv>
          <Media item={MED.menu} />
          <p className="rd-cap">
            <span>{MED.menu.cap}</span>
            <em>{MED.menu.tag}</em>
          </p>
        </div>
        <div className="rl-menu__txt">
          <Tags rows={v.notes} />
          <div className="rl-menu__quiz" data-rv>
            <Media item={MED.quiz} />
            <p className="rd-cap">
              <span>{MED.quiz.cap}</span>
              <em>{MED.quiz.tag}</em>
            </p>
            <Tags rows={[v.quiz]} />
          </div>
        </div>
      </div>
      <More summary="The full three-level menu from my audit">
        <MenuMap />
      </More>
    </S>
  )
}

/* ───────────── 03 · each format asks its own questions ───────────── */
function FormatSwitch() {
  const [tab, setTab] = useState(SWAP[0].id)
  const [hot, setHot] = useState(0)
  const btns = useRef([])
  const uid = useId()

  const pick = (id) => {
    setTab(id)
    setHot(0)
  }
  const onKey = (e, i) => {
    let n = null
    if (e.key === 'ArrowRight') n = (i + 1) % SWAP.length
    else if (e.key === 'ArrowLeft') n = (i - 1 + SWAP.length) % SWAP.length
    else if (e.key === 'Home') n = 0
    else if (e.key === 'End') n = SWAP.length - 1
    if (n === null) return
    e.preventDefault()
    pick(SWAP[n].id)
    btns.current[n]?.focus()
  }
  const cur = SWAP.find((t) => t.id === tab)

  return (
    <div className="rl-swap">
      <div className="rl-swap__stage" data-rv>
        {SWAP.map((t) => (
          <div
            key={t.id}
            id={`${uid}-p-${t.id}`}
            role="tabpanel"
            aria-labelledby={`${uid}-t-${t.id}`}
            aria-hidden={tab !== t.id}
            className={`rl-swap__panel${tab === t.id ? ' is-on' : ''}`}
          >
            <Shot item={t.item} />
            {t.regions.map((r, i) => (
              <span
                key={i}
                className={`rl-pin${tab === t.id && hot === i ? ' is-hot' : ''}`}
                aria-hidden="true"
                style={{ left: `${r.x}%`, top: `${r.y}%`, width: `${r.w}%`, height: `${r.h}%` }}
              >
                <b>{i + 1}</b>
              </span>
            ))}
          </div>
        ))}
        <p className="rd-cap">
          <span>{cur.item.cap}</span>
          <em>{cur.item.tag}</em>
        </p>
      </div>

      <div className="rl-swap__txt">
        <div className="rl-swap__tabs" role="tablist" aria-label="Product format">
          {SWAP.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => (btns.current[i] = el)}
              type="button"
              role="tab"
              id={`${uid}-t-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`${uid}-p-${t.id}`}
              tabIndex={tab === t.id ? 0 : -1}
              onClick={() => pick(t.id)}
              onKeyDown={(e) => onKey(e, i)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <ol className="rl-swap__notes" aria-label={`${cur.label} options`}>
          {cur.notes.map((n, i) => (
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
        <Tags rows={VIS.pages.notes} />
      </div>
    </div>
  )
}

export function Pages() {
  return (
    <S id="pages" n={3} title={VIS.pages.h}>
      <FormatSwitch />
    </S>
  )
}

/* ───────────── 04 · homepage answers the audit ───────────── */
export function Home() {
  const v = VIS.home
  return (
    <S id="home" n={4} title={v.h}>
      <ul className="rc-resp rl-home">
        {MED.home.map((it, i) => (
          <li key={it.src} data-rv>
            <div className="rc-resp__t">
              <p className="rc-resp__f">
                <b>Audit</b>
                {v.items[i][0]}
              </p>
              <p className="rc-resp__r">
                <b>Built</b>
                {v.items[i][1]}
              </p>
            </div>
            <figure className="rl-home__fig">
              <Shot item={it} eager={i === 0} />
              <p className="rd-cap">
                <span>{it.cap}</span>
                <em>{it.tag}</em>
              </p>
            </figure>
          </li>
        ))}
      </ul>
    </S>
  )
}

/* ───────────── 05 · proof you can tap ───────────── */
export function Proof() {
  const v = VIS.proof
  const order = ['hpDetail', 'hsDepth', 'hpCanvas', 'hsLight']
  const R = [-1.2, 1.4, 1, -1.5]
  return (
    <S id="proof" n={5} title={v.h} lead={v.line} className="rl-proofsec">
      <p className="rl-built" data-rv>
        <i aria-hidden="true" />
        Built in my dev theme
      </p>
      <ul className="rl-bento">
        {order.map((k, i) => (
          <li key={k} data-rv style={{ '--r': `${R[i]}deg`, '--d': `${i * 80}ms` }}>
            <Media item={MED.proof[k]} />
            <p className="rl-bento__cap">{v.clips[k]}</p>
          </li>
        ))}
      </ul>
    </S>
  )
}

/* ───────────── 06 · from text rows to visual proof ───────────── */
export function Iteration() {
  const v = VIS.iteration
  return (
    <S id="iteration" n={6} title={v.h}>
      <div className="rl-iter">
        <figure data-rv>
          <Shot item={MED.earlier} />
          <p className="rl-iter__cap">{v.earlier}</p>
          <Flag>{FLAGS.earlier}</Flag>
        </figure>
        <span className="rl-iter__arrow" aria-hidden="true">
          →
        </span>
        <figure data-rv style={{ '--d': '100ms' }}>
          <Shot item={MED.final} />
          <p className="rl-iter__cap">{v.final}</p>
        </figure>
      </div>
    </S>
  )
}

/* ───────────── 07 · one section library, four templates ───────────── */
export function System() {
  const v = VIS.system
  return (
    <S id="system" n={7} title={v.h}>
      <figure className="rl-tmap" data-rv aria-label="Sections shared by all four product templates and sections unique to each">
        <div className="rl-tmap__shared">
          <p>Shared by all four</p>
          <ul>
            {TEMPLATE_MAP.shared.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="rl-tmap__cols">
          {TEMPLATE_MAP.templates.map((t) => (
            <div key={t.id}>
              <p>{t.label}</p>
              <ul>
                {t.unique.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <figcaption>{v.cap}</figcaption>
      </figure>
    </S>
  )
}

/* ───────────── 08 · findable before ads: one number ───────────── */
export function Search() {
  const v = VIS.search
  return (
    <S id="search" n={8} title={v.h}>
      <div className="rl-stat" data-rv>
        <div>
          <b>0</b>
          <span>Before</span>
        </div>
        <i aria-hidden="true">→</i>
        <div>
          <b>59</b>
          <span>After</span>
        </div>
        <p>pages found in Search Console</p>
      </div>
      <Mono>{v.cap}</Mono>
      <More summary="Original Search Console screenshots">
        <Figure item={MED.gsc} />
      </More>
    </S>
  )
}

/* ───────────── lesson + end ───────────── */
export function Lesson() {
  const v = VIS.lesson
  return (
    <section id="lesson" className="rc-sec rc-sec--last rl-lesson" aria-labelledby="rl-l">
      <h2 id="rl-l" className="rd-head__n" data-rv>
        {v.h}
      </h2>
      <blockquote data-rv style={{ '--d': '80ms' }}>
        {v.quote}
      </blockquote>
      <nav className="rc-end" aria-label="Case study navigation" data-rv>
        <Link className="rc-end__a" to="/">
          <span>Back</span>
          <strong>All work</strong>
        </Link>
        <a className="rc-end__a" href={`mailto:${SITE.email}`}>
          <span>Say hello</span>
          <strong>{SITE.email}</strong>
        </a>
        <a className="rc-end__a" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
          <span>Resume</span>
          <strong>
            PDF <Arrow />
          </strong>
        </a>
      </nav>
    </section>
  )
}
