import { Fragment, useEffect, useId, useRef, useState } from 'react'
import { useTrack, useReduced } from './scrollFx'
import { Arrow, Media, Shot } from './ui'
import { Sec, pad } from './SocCase'
import { CaseEnd } from './CaseKit'
import { STORY, SHOTS, FACTS, LABELS, NAV } from '../../data/socStory'

export { NAV }

const TOTAL = 5
const S = (props) => <Sec total={TOTAL} {...props} className={`ls-ch ss-ch ${props.className || ''}`} />

function Cap({ item }) {
  return (
    <p className="rd-cap">
      <span>{item.cap}</span>
      {item.tag && <em>{item.tag}</em>}
    </p>
  )
}

function Anno({ children, className = '' }) {
  return (
    <span className={`ls-anno ${className}`} aria-hidden="true">
      {children}
    </span>
  )
}

function DecisionLead({ finding, decision, mine }) {
  return (
    <div className="ls-plead ss-plead" data-rv>
      <p>
        <b>Finding</b>
        {finding}
      </p>
      <p>
        <b>Decision</b>
        {decision}
      </p>
      <p className="ss-mine">
        <b>My part</b>
        {mine}
      </p>
    </div>
  )
}

function Compare({
  existing,
  proposed,
  annos = [],
  label = 'Comparison',
  defaultSide = 'proposed',
  labels = [LABELS.existing, LABELS.proposed],
}) {
  const [side, setSide] = useState(defaultSide)
  const btns = useRef([])
  const uid = useId()
  const cur = side === 'existing' ? existing : proposed

  const onKey = (e, i) => {
    const order = ['existing', 'proposed']
    let n = null
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') n = i ^ 1
    else if (e.key === 'Home') n = 0
    else if (e.key === 'End') n = 1
    if (n === null) return
    e.preventDefault()
    setSide(order[n])
    btns.current[n]?.focus()
  }

  return (
    <div className="ls-cmp" data-rv>
      <div className="ls-cmp__tabs" role="tablist" aria-label={label}>
        {[
          ['existing', labels[0]],
          ['proposed', labels[1]],
        ].map(([id, text], i) => (
          <button
            key={id}
            ref={(el) => (btns.current[i] = el)}
            type="button"
            role="tab"
            id={`${uid}-t-${id}`}
            aria-selected={side === id}
            aria-controls={`${uid}-p`}
            tabIndex={side === id ? 0 : -1}
            onClick={() => setSide(id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {text}
          </button>
        ))}
      </div>
      <div className="ls-cmp__stage ls-crop" role="tabpanel" id={`${uid}-p`} aria-labelledby={`${uid}-t-${side}`}>
        <Media item={cur} eager />
        {annos[0] && side === 'proposed' && <Anno className="ls-anno--tl">{annos[0]}</Anno>}
        {annos[1] && side === 'proposed' && <Anno className="ls-anno--br">{annos[1]}</Anno>}
      </div>
      <Cap item={cur} />
    </div>
  )
}

function More({ summary, children }) {
  return (
    <details className="ss-more" data-rv>
      <summary>
        <span>{summary}</span>
        <i aria-hidden="true" />
      </summary>
      <div className="ss-more__body">{children}</div>
    </details>
  )
}

/* ───────────── 1 · the experience ───────────── */
export function StoryHero() {
  const stage = useRef(null)
  useTrack(stage, { mode: 'view', ease: 1, rest: 0.5 })
  const h = STORY.hero

  return (
    <section id="experience" className="rc-hero ls-hero ss-hero" aria-labelledby="ss-h1">
      <div className="rc-hero__text">
        <p className="rd-head__n">Preview · UX story · not published</p>
        <h1 id="ss-h1" className="rc-hero__h1 ls-h1">
          {h.title}
        </h1>
        <p className="ls-storyline">{h.line}</p>
        <p className="rc-hero__sub">{h.intro}</p>
        <p className="ss-contrib" data-rv>
          <b>My contribution</b>
          {h.contribution}
        </p>
        <p className="ss-proto-note">{h.note}</p>
        <p className="rc-hero__links">
          <a className="rd-link" href={h.proto} target="_blank" rel="noopener noreferrer">
            Open prototype <Arrow />
          </a>
          <a className="rd-link" href={h.figma} target="_blank" rel="noopener noreferrer">
            View Figma <Arrow />
          </a>
        </p>
        <p className="ls-meta">{h.meta}</p>
      </div>

      <div className="ss-stage" ref={stage} data-rv>
        <Media item={SHOTS.walkthrough} eager />
        <Cap item={SHOTS.walkthrough} />
        <Anno className="ls-anno--hero">Prototype path</Anno>
      </div>

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

/* ───────────── 2 · three priorities ───────────── */
export function ChPriorities() {
  const p = STORY.priorities
  return (
    <S id={p.id} n={1} title={p.h}>
      <ol className="ls-process ss-prio">
        {p.items.map((it, i) => (
          <li key={it.k} data-rv style={{ '--d': `${i * 80}ms` }}>
            <b>
              <i>{pad(i + 1)}</i>
              {it.k}
            </b>
            <p>{it.v}</p>
          </li>
        ))}
      </ol>
      <figure className="ss-exist" data-rv>
        <Media item={SHOTS.existing} />
        <Cap item={SHOTS.existing} />
      </figure>
    </S>
  )
}

/* ───────────── 3a · search ───────────── */
function ScreenPick({ items, label }) {
  const [i, setI] = useState(0)
  const btns = useRef([])
  const uid = useId()
  const reduce = useReduced()

  useEffect(() => {
    if (reduce || items.length < 2) return undefined
    const t = setInterval(() => setI((n) => (n + 1) % items.length), 4500)
    return () => clearInterval(t)
  }, [reduce, items.length])

  const onKey = (e, idx) => {
    let n = null
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (idx + 1) % items.length
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (idx - 1 + items.length) % items.length
    else if (e.key === 'Home') n = 0
    else if (e.key === 'End') n = items.length - 1
    if (n === null) return
    e.preventDefault()
    setI(n)
    btns.current[n]?.focus()
  }

  const cur = items[i]
  return (
    <div className="ls-feat ss-pick">
      <div className="ls-feat__stage" data-rv>
        {items.map((it, idx) => (
          <div
            key={it.short}
            id={`${uid}-p-${idx}`}
            role="tabpanel"
            aria-labelledby={`${uid}-t-${idx}`}
            aria-hidden={i !== idx}
            className={`ls-feat__panel${i === idx ? ' is-on' : ''}`}
          >
            <Media item={it} eager={idx === 0} />
            {it.anno && <Anno className="ls-anno--tl">{it.anno}</Anno>}
          </div>
        ))}
        <Cap item={cur} />
      </div>
      <div className="ls-feat__tabs" role="tablist" aria-label={label}>
        {items.map((it, idx) => (
          <button
            key={it.short}
            ref={(el) => (btns.current[idx] = el)}
            type="button"
            role="tab"
            id={`${uid}-t-${idx}`}
            aria-selected={i === idx}
            aria-controls={`${uid}-p-${idx}`}
            tabIndex={i === idx ? 0 : -1}
            onClick={() => setI(idx)}
            onKeyDown={(e) => onKey(e, idx)}
          >
            {it.short}
          </button>
        ))}
      </div>
    </div>
  )
}

export function ChSearch() {
  const c = STORY.chapters.search
  const demos = [
    { ...SHOTS.postSearch, short: 'Search results', anno: c.annos[0] },
    { ...SHOTS.reportFound, short: 'Report match', anno: c.annos[1] },
    { ...SHOTS.allReports, short: 'Reports browse', anno: c.annos[2] },
  ]
  return (
    <S id={c.id} n={2} title={c.h} className="ls-ch--problem">
      <DecisionLead finding={c.finding} decision={c.decision} mine={c.mine} />
      <div className="ss-split">
        <Compare
          existing={SHOTS.existing}
          proposed={SHOTS.postSearch}
          annos={[c.annos[0], c.annos[1]]}
          label="Search comparison"
        />
        <ScreenPick items={demos} label="Proposed search and reports" />
      </div>
      <More summary="View evidence · survey navigation counts">
        <p className="ss-ev">
          Live-site survey export, n = 127 (Feb 19, 2026 CSV). Navigation experience includes 21 trial-and-error and 15
          unable-to-find responses. Counts are respondent mentions, not a measured click-path study.
        </p>
      </More>
    </S>
  )
}

/* ───────────── 3b · orientation ───────────── */
export function ChOrient() {
  const c = STORY.chapters.orient
  return (
    <S id={c.id} n={3} title={c.h} className="ls-ch--problem">
      <DecisionLead finding={c.finding} decision={c.decision} mine={c.mine} />
      <div className="ss-split">
        <Compare
          existing={SHOTS.mapExisting}
          proposed={SHOTS.mapProposed}
          annos={[c.annos[2]]}
          label="Sitemap comparison"
          defaultSide="proposed"
        />
        <figure className="ls-crop" data-rv>
          <Shot item={SHOTS.home} />
          <Cap item={SHOTS.home} />
          <Anno className="ls-anno--tl">{c.annos[0]}</Anno>
          <Anno className="ls-anno--br">{c.annos[1]}</Anno>
        </figure>
      </div>
      <More summary="View evidence · affinity themes">
        <figure>
          <Shot item={SHOTS.affinity} />
          <Cap item={SHOTS.affinity} />
        </figure>
      </More>
    </S>
  )
}

/* ───────────── 3c · entry ───────────── */
export function ChEntry() {
  const c = STORY.chapters.entry
  return (
    <S id={c.id} n={4} title={c.h} className="ls-ch--problem">
      <DecisionLead finding={c.finding} decision={c.decision} mine={c.mine} />
      <div className="ss-split">
        <Compare
          existing={SHOTS.existing}
          proposed={SHOTS.home}
          annos={[c.annos[0], c.annos[1]]}
          label="Homepage hierarchy comparison"
        />
        <figure className="ls-crop" data-rv>
          <Shot item={SHOTS.home} />
          <Cap item={{ ...SHOTS.home, cap: 'Proposed · headline metrics and release cues' }} />
          <Anno className="ls-anno--sm">{c.annos[2]}</Anno>
        </figure>
      </div>
      <More summary="View evidence · visit-purpose counts">
        <p className="ss-ev">
          Same verified survey export (n = 127). Leading purposes: checking the latest release (43) and finding a
          specific headline number (38). Select-all style question — counts are mentions, not exclusive segments.
        </p>
      </More>
    </S>
  )
}

/* ───────────── 4 · delivery ───────────── */
export function ChDelivery() {
  const d = STORY.delivery
  return (
    <S id={d.id} n={5} title={d.h} lead={d.lead} className="rc-sec--last">
      <p className="ss-mine ss-mine--block" data-rv>
        <b>My part</b>
        {d.mine}
      </p>
      <div className="ss-split">
        <Compare
          existing={SHOTS.reportV1}
          proposed={SHOTS.reportV2}
          label="V1 file-linked vs V2 interactive concept"
          defaultSide="existing"
          labels={['V1 · files', 'V2 · interactive']}
        />
        <div className="ss-status" data-rv>
          <p>{d.status}</p>
          <p className="ss-ev">
            Distinguishes the file-linked V1 approach from the proposed interactive-data experience. Global
            search/filtering is designed in the prototype; full interactivity still needs tagged structured data.
          </p>
        </div>
      </div>
      <CaseEnd />
    </S>
  )
}

export function SocStory() {
  return (
    <Fragment>
      <StoryHero />
      <ChPriorities />
      <ChSearch />
      <ChOrient />
      <ChEntry />
      <ChDelivery />
    </Fragment>
  )
}
