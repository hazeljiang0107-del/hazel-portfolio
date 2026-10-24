import { Fragment, useEffect, useId, useRef, useState } from 'react'
import { useTrack, useReduced } from './scrollFx'
import { Arrow, Media, Shot } from './ui'
import { Sec, pad } from './SocCase'
import { CaseEnd } from './CaseKit'
import { STORY, SHOTS, FACTS, SOURCES } from '../../data/luminipetStory'

const TOTAL = 5
const S = (props) => <Sec total={TOTAL} {...props} className={`ls-ch ${props.className || ''}`} />

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

function ProblemLead({ unclear, designed, shows }) {
  return (
    <div className="ls-plead" data-rv>
      <p>
        <b>Unclear</b>
        {unclear}
      </p>
      <p>
        <b>Decision</b>
        {designed}
      </p>
      {shows && (
        <p>
          <b>Shows</b>
          {shows}
        </p>
      )}
    </div>
  )
}

/** Accessible Earlier / Current toggle — short labels only. */
function Compare({ before, now, annos = [], label = 'Feature comparison' }) {
  const [side, setSide] = useState('now')
  const btns = useRef([])
  const uid = useId()
  const cur = side === 'before' ? before : now

  const onKey = (e, i) => {
    const order = ['before', 'now']
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
          ['before', SOURCES.before.short],
          ['now', SOURCES.now.short],
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
        {annos[0] && <Anno className="ls-anno--tl">{annos[0]}</Anno>}
        {annos[1] && side === 'before' && <Anno className="ls-anno--br">{annos[1]}</Anno>}
        {annos[2] && side === 'now' && <Anno className="ls-anno--sm">{annos[2]}</Anno>}
      </div>
      <Cap item={cur} />
    </div>
  )
}

/* ───────────── 1 · featured outcome ───────────── */
export function StoryHero() {
  const stage = useRef(null)
  useTrack(stage, { mode: 'view', ease: 1, rest: 0.5 })
  const h = STORY.hero
  const feat = STORY.features.map((f) => ({ ...SHOTS[f.media], short: f.label, blurb: f.note }))

  return (
    <section id="outcome" className="rc-hero ls-hero" aria-labelledby="ls-h1">
      <div className="rc-hero__text">
        <p className="rd-head__n">Case study · 02 / 06</p>
        <h1 id="ls-h1" className="rc-hero__h1 ls-h1">
          {h.title}
        </h1>
        <p className="ls-storyline">{h.line}</p>
        <p className="rc-hero__sub">{h.intro}</p>
        <p className="rc-hero__links">
          <a className="rd-link" href={h.live} target="_blank" rel="noopener noreferrer">
            Visit luminipet.com <Arrow />
          </a>
          <a className="rd-link" href={h.style} target="_blank" rel="noopener noreferrer">
            Open style guide <Arrow />
          </a>
        </p>
        <p className="ls-meta">{h.meta}</p>
      </div>

      <FeatureReel items={feat} stageRef={stage} />

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

function FeatureReel({ items, stageRef }) {
  const [i, setI] = useState(0)
  const btns = useRef([])
  const uid = useId()
  const reduce = useReduced()

  useEffect(() => {
    if (reduce || items.length < 2) return undefined
    const t = setInterval(() => setI((n) => (n + 1) % items.length), 4800)
    return () => clearInterval(t)
  }, [reduce, items.length])

  const onKey = (e, idx) => {
    let n = null
    if (e.key === 'ArrowRight') n = (idx + 1) % items.length
    else if (e.key === 'ArrowLeft') n = (idx - 1 + items.length) % items.length
    if (n === null) return
    e.preventDefault()
    setI(n)
    btns.current[n]?.focus()
  }

  const cur = items[i]
  return (
    <div className="ls-feat" ref={stageRef}>
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
            <Anno className="ls-anno--hero">{it.short}</Anno>
          </div>
        ))}
        <p className="ls-feat__blurb">{cur.blurb}</p>
        <Cap item={cur} />
      </div>
      <div className="ls-feat__tabs" role="tablist" aria-label="Standout features">
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
            {pad(idx + 1)} {it.short}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ───────────── 2 · priorities ───────────── */
export function ChPriorities() {
  const p = STORY.process
  return (
    <S id={p.id} n={1} title={p.h}>
      <ol className="ls-process">
        {p.steps.map((s, i) => (
          <li key={s.k} data-rv style={{ '--d': `${i * 80}ms` }}>
            <b>
              <i>{pad(i + 1)}</i>
              {s.k}
            </b>
            <p>{s.v}</p>
            <small>{s.src}</small>
          </li>
        ))}
      </ol>
      <ul className="ls-prio" aria-label="Three design priorities">
        {['Find by format', 'Prove the offer', 'One brand system'].map((t) => (
          <li key={t} data-rv>
            {t}
          </li>
        ))}
      </ul>
    </S>
  )
}

/* ───────────── 3a · shopping path ───────────── */
export function ChFind() {
  const c = STORY.chapters.find
  const flow = STORY.flow
  return (
    <S id={c.id} n={2} title={c.h} className="ls-ch--problem">
      <ProblemLead unclear={c.unclear} designed={c.designed} shows={c.shows} />
      <div className="ls-org">
        <div className="ls-org__media" data-rv>
          <Media item={SHOTS.menuRec} />
          <Cap item={SHOTS.menuRec} />
          <Anno className="ls-anno--tl">{c.annos[0]}</Anno>
        </div>
        <Compare before={SHOTS.menuDetail} now={SHOTS.liveMenu} annos={c.annos} label="Navigation comparison" />
      </div>

      <div className="ls-flow" data-rv>
        <h3 className="ls-flow__h">{flow.h}</h3>
        <p className="ls-flow__lead">{flow.lead}</p>
        <ol className="ls-flow__grid">
          {flow.steps.map((step) => (
            <li key={step.k}>
              <Media item={SHOTS[step.media]} />
              <p className="ls-flow__k">{step.k}</p>
              <p className="ls-flow__v">{step.v}</p>
              <Cap item={SHOTS[step.media]} />
            </li>
          ))}
        </ol>
      </div>
    </S>
  )
}

/* ───────────── 3b · homepage ───────────── */
export function ChTrust() {
  const c = STORY.chapters.trust
  return (
    <S id={c.id} n={3} title={c.h} className="ls-ch--problem">
      <ProblemLead unclear={c.unclear} designed={c.designed} shows={c.shows} />
      <div className="ls-pair ls-pair--wide">
        <Compare before={SHOTS.beforeHome} now={SHOTS.nowHome} annos={[c.annos[0], c.annos[2]]} label="Homepage hero comparison" />
        <Compare before={SHOTS.beforeFormats} now={SHOTS.nowFormats} annos={[c.annos[1]]} label="Format section comparison" />
      </div>
    </S>
  )
}

/* ───────────── 3c · brand system ───────────── */
export function ChIdentity() {
  const c = STORY.chapters.identity
  const guides = [SHOTS.guideHome, SHOTS.guideColor, SHOTS.guideType, SHOTS.guideComponents]
  return (
    <S id={c.id} n={4} title={c.h} className="ls-ch--problem">
      <ProblemLead unclear={c.unclear} designed={c.designed} shows={c.shows} />
      <p className="ls-guide-link" data-rv>
        <a className="rd-link" href={SOURCES.style.url} target="_blank" rel="noopener noreferrer">
          Open the brand style guide I designed <Arrow />
        </a>
      </p>
      <ul className="ls-guide">
        {guides.map((it, i) => (
          <li key={it.src} data-rv style={{ '--d': `${i * 70}ms` }}>
            <Shot item={it} />
            <Cap item={it} />
            {c.annos[i] && <Anno className="ls-anno--sm">{c.annos[i]}</Anno>}
          </li>
        ))}
      </ul>
      <div className="ls-pair ls-pair--wide">
        <Compare before={SHOTS.beforeCol} now={SHOTS.nowCol} annos={['Collection pattern']} label="Collection comparison" />
        <Compare before={SHOTS.beforeChooser} now={SHOTS.nowQuiz} annos={['Chooser pattern']} label="Chooser comparison" />
      </div>
    </S>
  )
}

/* ───────────── 4 · delivered ───────────── */
export function ChDelivered() {
  const d = STORY.delivered
  const mine = [
    { ...SHOTS.featHome, short: 'Homepage' },
    { ...SHOTS.featGuide, short: 'Style guide' },
    { ...SHOTS.liveMenu, short: 'Navigation' },
    { ...SHOTS.flowQuiz, short: 'Guided path' },
    { ...SHOTS.nowCol, short: 'Collection' },
    { ...SHOTS.pdpPainted, short: 'PDP options' },
  ]
  return (
    <S id={d.id} n={5} title={d.h} lead={d.body} className="rc-sec--last">
      <ul className="ls-deliver">
        {mine.map((it) => (
          <li key={it.short} data-rv>
            <Media item={it} />
            <p className="ls-deliver__label">{it.short}</p>
            <Cap item={it} />
          </li>
        ))}
      </ul>
      <CaseEnd />
    </S>
  )
}

export function LuminiStory() {
  return (
    <Fragment>
      <StoryHero />
      <ChPriorities />
      <ChFind />
      <ChTrust />
      <ChIdentity />
      <ChDelivered />
    </Fragment>
  )
}
