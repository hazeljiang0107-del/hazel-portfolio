import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTrack } from './scrollFx'
import { Arrow, Media, Shot } from './ui'
import { SocReportCompare } from '../case-study/CaseStudyModules'
import { P, SITE, RESUME_URL, FLOW, HERO_SHOTS, MEDIA, COMPETITORS, RESPONSES, sec, mod, mods } from '../../data/redesignSoc'

const NOTE_R = [-1.2, 0.9, -0.6, 1.3, -0.9, 0.7]
export const pad = (n) => String(n).padStart(2, '0')

/* ───────────── building blocks ───────────── */

/** Chapter header: number + big condensed title on the left, the section's one-sentence lead on the right. */
export function Sec({ id, n, total = 13, title, lead, children, className = '' }) {
  return (
    <section id={id} className={`rc-sec ${className}`} aria-labelledby={`${id}-t`}>
      <header className="rc-head">
        <div data-rv>
          <p className="rd-head__n">
            {pad(n)} / {pad(total)}
          </p>
          <h2 className="rc-head__t" id={`${id}-t`}>
            {title}
          </h2>
        </div>
        {lead && (
          <p className="rc-head__lead" data-rv style={{ '--d': '90ms' }}>
            {lead}
          </p>
        )}
      </header>
      {children}
    </section>
  )
}

export const Mono = ({ children }) => <p className="rc-mono">{children}</p>

/** Paper notes (brief-cards, method-cards): short heading + a line or two */
export function Notes({ items, cols = 4 }) {
  return (
    <ul className="rc-notes" style={{ '--cols': cols }}>
      {items.map((it, i) => (
        <li key={it.title} className="rc-note" data-rv style={{ '--r': `${NOTE_R[i % NOTE_R.length]}deg`, '--d': `${i * 70}ms` }}>
          <h3>{it.title}</h3>
          <p>{it.description}</p>
          {it.note && <small>{it.note}</small>}
        </li>
      ))}
    </ul>
  )
}

/** Big-number list (stat-cards) */
export function Stats({ items, note, wide }) {
  return (
    <div className="rc-statwrap" data-rv>
      <ul className={`rc-stats${wide ? ' rc-stats--wide' : ''}`}>
        {items.map((s) => (
          <li key={s.label}>
            <b className={String(s.value).length > 6 ? 'is-text' : undefined}>{s.value}</b>
            <span>{s.label}</span>
            <small>{s.detail}</small>
          </li>
        ))}
      </ul>
      {note && <Mono>{note}</Mono>}
    </div>
  )
}

export function Insights({ items }) {
  return (
    <ul className="rc-ins">
      {items.map((it) => (
        <li key={it.insight} data-rv>
          <p className="rc-ins__q">{it.insight}</p>
          <p className="rc-ins__e">{it.evidence}</p>
          <p className="rc-ins__r">
            <b>Response</b>
            {it.implication}
          </p>
        </li>
      ))}
    </ul>
  )
}

export function Table({ columns, rows }) {
  return (
    <div className="rc-tablewrap" data-rv>
      <table className="rc-table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((cell, i) => (
                <td key={i} data-label={columns[i]}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Bars({ chart }) {
  const max = Math.max(...chart.items.map((i) => i.value))
  return (
    <figure className="rc-bars" data-rv>
      <figcaption>{chart.note}</figcaption>
      <ul>
        {chart.items.map((it, i) => (
          <li key={it.label} style={{ '--w': `${(it.value / max) * 100}%` }} data-top={i === 0 || undefined}>
            <span className="rc-bars__l" title={it.label}>
              {it.shortLabel || it.label}
            </span>
            <i aria-hidden="true" />
            <span className="rc-bars__v">{it.value}</span>
          </li>
        ))}
      </ul>
    </figure>
  )
}

export function Figure({ item, className = '' }) {
  return (
    <figure className={`rc-fig ${className}`} data-rv>
      <Media item={item} />
      <p className="rd-cap">
        <span>{item.cap}</span>
        <em>{item.tag}</em>
      </p>
    </figure>
  )
}

/* ───────────── 00 · hero ───────────── */
export function CaseHero() {
  const stage = useRef(null)
  useTrack(stage, { mode: 'view', ease: 1, rest: 0.5 })
  const facts = [
    ['Role', P.role],
    ['Timeline', P.timeline],
    ['Team', P.snapshot.team],
    ['Tools', P.tools.join(' · ')],
  ]
  return (
    <section className="rc-hero" aria-labelledby="rc-h1">
      <div className="rc-hero__text">
        <p className="rd-head__n">Case study · 01 / 06</p>
        <h1 id="rc-h1" className="rc-hero__h1">
          Surveys of
          <br />
          Consumers
          <br />
          Redesign
        </h1>
        <p className="rc-hero__sub">{P.subtitle}</p>
        <p className="rc-hero__links">
          <a className="rd-link" href={P.prototypeUrl} target="_blank" rel="noopener noreferrer">
            View prototype <Arrow />
          </a>
          <a className="rd-link" href={P.figmaUrl} target="_blank" rel="noopener noreferrer">
            Figma file <Arrow />
          </a>
        </p>
      </div>

      <div className="rc-stage" ref={stage} aria-label="Selected screens from the redesign">
        {HERO_SHOTS.map((it, i) => (
          <figure key={it.src} className={`rc-hs rc-hs--${i}`}>
            <Shot item={it} eager={i === 0} className="rc-top" />
          </figure>
        ))}
      </div>

      <dl className="rc-facts">
        {facts.map(([k, v]) => (
          <div key={k} data-rv>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

/* ───────────── 01 · overview: a typed paper letter, like About ───────────── */
export function Overview() {
  const letter = useRef(null)
  useTrack(letter, { mode: 'view', ease: 0.14, rest: 0.6 })
  const snap = P.snapshot
  return (
    <section id="overview" className="rc-sec rc-over" aria-label="Overview">
      <article className="rd-letter rc-letter" ref={letter}>
        <p className="rd-letter__from">
          Overview
          <span>{snap.type}</span>
        </p>
        <p>{P.overview}</p>
        <p>
          <b className="rc-letter__k">My contribution</b>
          {P.contribution}
        </p>
        <dl className="rd-letter__facts">
          {[
            ['Project', snap.project],
            ['Timeline', snap.timeline],
            ['Impact', snap.impact],
          ].map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </article>
    </section>
  )
}

/* ───────────── 02 · challenge ───────────── */
export function Challenge() {
  const s = sec('context')
  return (
    <Sec id="context" n={1} title={s.title} lead={s.content[0]}>
      <div className="rc-wide">
        <Figure item={MEDIA.current} />
        <Mono>{mod('context', 'video').caption}</Mono>
      </div>
      <Notes items={mod('context', 'brief-cards').items} />
    </Sec>
  )
}

/* ───────────── 03 · what we built: pinned reel of the six screens ───────────── */
function FlowReel() {
  const secRef = useRef(null)
  const view = useRef(null)
  const track = useRef(null)
  useTrack(secRef, { mode: 'pin', ease: 0.12, rest: 0 })

  useEffect(() => {
    const s = secRef.current
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

  const onFocus = (e) => {
    const li = e.target.closest('li')
    const s = secRef.current
    const v = view.current
    if (!li || !s || !v || window.matchMedia('(max-width: 800px), (prefers-reduced-motion: reduce)').matches) return
    v.scrollLeft = 0
    const dx = parseFloat(getComputedStyle(s).getPropertyValue('--dx')) || 0
    const want = Math.min(dx, Math.max(0, li.offsetLeft - v.clientWidth * 0.18))
    window.scrollTo({ top: s.getBoundingClientRect().top + window.scrollY + want, behavior: 'auto' })
  }

  const R = [-1.6, 1.2, -0.8, 1.6, -1.2, 0.9]
  const Y = ['0px', '26px', '-12px', '20px', '-4px', '30px']
  return (
    <div ref={secRef} className="rd-reel rc-flow" aria-label="The six redesigned screens">
      <div className="rd-reel__pin">
        <div className="rd-reel__view" ref={view}>
          <ul className="rd-reel__track" ref={track} onFocus={onFocus}>
            {FLOW.map((f, i) => (
              <li key={f.label} className="rd-reel__card" style={{ '--r': `${R[i]}deg`, '--y': Y[i], '--ar': 1.6 }}>
                <Shot item={f.item} eager={i < 2} className="rc-top" />
                <p className="rc-flow__t">
                  <span>{pad(i + 1)}</span>
                  {f.label}
                </p>
                <p className="rc-flow__d">{f.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function Built() {
  const s = sec('solution')
  const paths = mod('solution', 'brief-cards')
  const insight = mod('solution', 'insight-cards')
  return (
    <Sec id="solution" n={2} title={s.title} lead={s.content[0]} className="rc-sec--reel">
      <Notes items={paths.items} cols={2} />
      <FlowReel />
      <div className="rc-paper" data-rv>
        <SocReportCompare />
      </div>
      <Mono>{mod('solution', 'soc-report-compare').caption}</Mono>
      <Insights items={insight.items} />
    </Sec>
  )
}

/* ───────────── 04 · the problem ───────────── */
export function Problem() {
  const s = sec('tension')
  const pc = mod('tension', 'pain-cards')
  return (
    <Sec id="tension" n={3} title={s.title} lead={s.content[0]}>
      <ol className="rc-pains">
        {pc.items.map((it, i) => (
          <li key={it.pain} data-rv>
            <span className="rc-pains__n">{pad(i + 1)}</span>
            <h3>{it.pain}</h3>
            <p>
              <b>{pc.responseLabel}</b>
              {it.opportunity}
            </p>
          </li>
        ))}
      </ol>
    </Sec>
  )
}

/* ───────────── 05 · research ───────────── */
export function Research() {
  const s = sec('research-evidence')
  const stats = mod('research-evidence', 'stat-cards')
  return (
    <Sec id="research-evidence" n={4} title={s.title} lead={s.content[0]}>
      <Notes items={mod('research-evidence', 'method-cards').items} cols={5} />
      <Stats items={stats.items} note={stats.note} wide />
    </Sec>
  )
}

/* ───────────── 06 · quantitative ───────────── */
export function Quant() {
  const s = sec('quantitative')
  const stat = mods('quantitative', 'stat-cards')
  const charts = mod('quantitative', 'bar-chart-grid').charts
  return (
    <Sec id="quantitative" n={5} title={s.title} lead={s.content[0]}>
      {stat.map((g) => (
        <Stats key={g.note} items={g.items} note={g.note} />
      ))}
      <Insights items={mod('quantitative', 'insight-cards').items} />
      <div className="rc-charts">
        {charts.map((c) => (
          <Bars key={c.note} chart={c} />
        ))}
      </div>
    </Sec>
  )
}

/* ───────────── 07 · qualitative ───────────── */
export function Qual() {
  const s = sec('qualitative')
  return (
    <Sec id="qualitative" n={6} title={s.title} lead={s.content[0]}>
      <div className="rc-wide">
        <Figure item={MEDIA.affinity} />
      </div>
      <Insights items={mod('qualitative', 'insight-cards').items} />
      <Notes items={mod('qualitative', 'brief-cards').items} />
      <div className="rc-narrow">
        <Figure item={MEDIA.persona} />
      </div>
    </Sec>
  )
}

/* ───────────── 08 · competitive ───────────── */
export function Competitive() {
  const s = sec('competitive')
  return (
    <Sec id="competitive" n={7} title={s.title} lead={s.content[0]}>
      <ul className="rc-comp">
        {COMPETITORS.map((c, i) => (
          <li key={c.name} className={i === 3 ? 'rc-comp--soc' : ''}>
            <Figure item={c.item} />
            <h3>{c.name}</h3>
            <ul>
              {c.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <Mono>{mod('competitive', 'competitor-cards').image.caption}</Mono>
    </Sec>
  )
}

/* ───────────── 09 · journey ───────────── */
export function Journey() {
  const s = sec('journey')
  const m = mod('journey', 'decision-matrix')
  return (
    <Sec id="journey" n={8} title={s.title} lead={s.content[0]}>
      <div className="rc-wide">
        <Figure item={MEDIA.journey} />
        <Mono>{mod('journey', 'media').caption}</Mono>
      </div>
      <Table columns={m.columns} rows={m.rows} />
    </Sec>
  )
}

/* ───────────── 10 · information architecture ───────────── */
export function IA() {
  const s = sec('ia')
  return (
    <Sec id="ia" n={9} title={s.title} lead={s.content[0]}>
      <div className="rc-wide">
        <Figure item={MEDIA.sitemap} />
        <Mono>{mod('ia', 'media').caption}</Mono>
      </div>
      <Notes items={mod('ia', 'brief-cards').items} cols={3} />
      <Insights items={mod('ia', 'insight-cards').items} />
    </Sec>
  )
}

/* ───────────── 11 · principles ───────────── */
export function Principles() {
  const s = sec('principles')
  return (
    <Sec id="principles" n={10} title={s.title} lead={s.content[0]}>
      <ol className="rc-princ">
        {mod('principles', 'brief-cards').items.map((it, i) => (
          <li key={it.title} data-rv>
            <span>{pad(i + 1)}</span>
            <h3>{it.title}</h3>
            <p>{it.description}</p>
          </li>
        ))}
      </ol>
    </Sec>
  )
}

/* ───────────── 12 · decisions ───────────── */
export function Decisions() {
  const s = sec('decisions')
  const m = mod('decisions', 'decision-matrix')
  return (
    <Sec id="decisions" n={11} title={s.title} lead={s.content[0]}>
      <Table columns={m.columns} rows={m.rows} />
      <ul className="rc-resp">
        {RESPONSES.map((r, i) => (
          <li key={r.finding} data-rv>
            <div className="rc-resp__t">
              <p className="rc-resp__f">
                <b>Finding</b>
                {r.finding}
              </p>
              <p className="rc-resp__r">
                <b>Response</b>
                {r.response}
              </p>
            </div>
            <Shot item={r.item} className={i === 1 ? 'rc-mid' : 'rc-top'} eager={i === 0} />
          </li>
        ))}
      </ul>
    </Sec>
  )
}

/* ───────────── 13 · results + impact ───────────── */
export function Results() {
  const s = sec('validation')
  const stats = mod('validation', 'stat-cards')
  const o = sec('outcome')
  return (
    <>
      <Sec id="validation" n={12} title={s.title} lead={s.content[0]}>
        <Stats items={stats.items} note={stats.note.replace(/\s*TODO:.*$/, '')} />
        <div className="rc-wide">
          <Figure item={MEDIA.walkthrough} />
          <Mono>{mod('validation', 'video').caption}</Mono>
        </div>
      </Sec>
      <Sec id="outcome" n={13} title={o.title} lead={o.content[0]} className="rc-sec--last">
        <Notes items={mod('outcome', 'brief-cards').items} />
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
      </Sec>
    </>
  )
}
