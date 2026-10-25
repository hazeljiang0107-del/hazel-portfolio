import { Fragment, useId, useRef, useState } from 'react'
import { useTrack } from './scrollFx'
import { Arrow, Shot } from './ui'
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

function ProblemLead({ problem, solved, tags }) {
  return (
    <div className="ls-plead" data-rv>
      <p>
        <b>The problem</b>
        {problem}
      </p>
      <p>
        <b>How I solved it</b>
        {solved}
      </p>
      <p className="ls-plead__tags">{tags}</p>
    </div>
  )
}

function Frames({ items, label }) {
  return (
    <ul className="ls-shots" aria-label={label}>
      {items.map((it) => (
        <li key={it.src}>
          <Shot item={it} className="ls-frame" />
          <Cap item={it} />
        </li>
      ))}
    </ul>
  )
}

const GUIDE_COLORS = [
  ['Ink', '#101010', '#fff'],
  ['Warm white', '#FFF6E9', '#101010'],
  ['Camel', '#CFA776', '#101010'],
  ['Sunshine', '#FFD543', '#101010'],
  ['Paper', '#FFFFFF', '#101010'],
  ['Body', '#484242', '#fff'],
]

const GUIDE_PARTS = ['Foundations', 'Color', 'Typography', 'Components', 'Photography', 'Voice']

function StyleSystem() {
  return (
    <div className="ls-sys">
      <div className="ls-sys__copy">
        <p className="ls-sys__k">Brand system</p>
        <h3>Color, type, and voice in one set.</h3>
        <p>
          Warm white carries most of the page. Ink and sunshine are the small, deliberate accents. Display type is Playfair;
          the reading face is a plain grotesque.
        </p>
        <a className="rd-link" href={SOURCES.style.url} target="_blank" rel="noopener noreferrer">
          Open the brand style guide <Arrow />
        </a>
      </div>
      <ul className="ls-sys__swatches">
        {GUIDE_COLORS.map(([name, hex, ink]) => (
          <li key={name} style={{ background: hex, color: ink }}>
            <span>{name}</span>
            <span>{hex}</span>
          </li>
        ))}
      </ul>
      <p className="ls-sys__ratio">
        <span style={{ flex: 60 }}>60% Warm white</span>
        <span style={{ flex: 25 }}>25% Paper</span>
        <span style={{ flex: 10 }}>10% Ink</span>
        <span style={{ flex: 5 }}>5%</span>
      </p>
      <div className="ls-sys__type">
        <div>
          <p className="ls-sys__face">Display · Playfair Display</p>
          <p className="ls-sys__display">Every pet is a work of art.</p>
        </div>
        <div>
          <p className="ls-sys__face">Body · Archivo</p>
          <p className="ls-sys__read">We turn your favorite photo into a one-of-a-kind portrait, lovingly made by a real artist.</p>
        </div>
      </div>
      <ol className="ls-sys__parts">
        {GUIDE_PARTS.map((name, i) => (
          <li key={name}>
            <i>{pad(i + 1)}</i>
            {name}
          </li>
        ))}
      </ol>
    </div>
  )
}

function Solved() {
  const s = STORY.solved
  return (
    <div className="ls-solved">
      <p className="ls-solved__k">{s.k}</p>
      <h2 className="ls-solved__h" id="ls-solved-h">
        {s.h}
      </h2>
      <ol className="ls-solved__grid">
        {s.items.map((item) => (
          <li key={item.n}>
            <Shot item={SHOTS[item.media]} className="ls-frame" />
            <p className="ls-solved__n">{item.n}</p>
            <h3>{item.h}</h3>
            <p>{item.d}</p>
          </li>
        ))}
      </ol>
      <p className="ls-solved__note">{s.note}</p>
    </div>
  )
}

/* ───────────── 1 · featured outcome ───────────── */
export function StoryHero() {
  const stage = useRef(null)
  useTrack(stage, { mode: 'view', ease: 1, rest: 0.5 })
  const h = STORY.hero

  return (
    <section id="outcome" className="rc-hero ls-hero" aria-labelledby="ls-h1">
      <div className="ls-hero__top">
        <div className="rc-hero__text" ref={stage}>
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
        <div className="ls-hero__shot">
          <Shot item={SHOTS.liveHero} className="ls-frame" eager />
          <Cap item={SHOTS.liveHero} />
        </div>
      </div>

      <Solved />

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

function CompetitorNotes({ step, open, panelId }) {
  return (
    <div className="ls-comp" id={panelId} hidden={!open}>
      <table className="ls-comp__table">
        <caption className="ls-comp__cap">Competitor observations</caption>
        <thead>
          <tr>
            <th scope="col">Brand</th>
            <th scope="col">Offers</th>
            <th scope="col">Concern</th>
          </tr>
        </thead>
        <tbody>
          {step.compare.map((b) => (
            <tr key={b.name}>
              <th scope="row">{b.name}</th>
              <td data-label="Offers">
                <i className="ls-comp__mark" aria-hidden="true" />
                {b.does}
              </td>
              <td data-label="Concern">{b.worry}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ol className="ls-comp__ops">
        {step.opportunities.map((o, i) => (
          <li key={o.h}>
            <p className="ls-comp__to">
              <i>{pad(i + 1)}</i>
              {o.to}
            </p>
            <strong>{o.h}</strong>
            <p>{o.d}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ───────────── 2 · priorities ───────────── */
export function ChPriorities() {
  const p = STORY.process
  const comp = p.steps.find((s) => s.compare)
  const [open, setOpen] = useState(false)
  const panelId = useId()
  return (
    <S id={p.id} n={1} title={p.h}>
      <ol className="ls-process">
        {p.steps.map((s, i) =>
          s.compare ? (
            <li key={s.k} className="is-toggle" data-open={open || undefined} data-rv style={{ '--d': `${i * 80}ms` }}>
              <button type="button" className="ls-process__btn" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((v) => !v)}>
                <b>
                  <i>{pad(i + 1)}</i>
                  {s.k}
                  <span className="ls-process__hint">{s.compare.length} brands</span>
                </b>
                <p>{s.v}</p>
              </button>
            </li>
          ) : (
            <li key={s.k} data-rv style={{ '--d': `${i * 80}ms` }}>
              <b>
                <i>{pad(i + 1)}</i>
                {s.k}
              </b>
              <p>{s.v}</p>
              <small>{s.src}</small>
            </li>
          ),
        )}
      </ol>
      {comp && <CompetitorNotes step={comp} open={open} panelId={panelId} />}
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
    <S id={c.id} n={2} title={c.h} lead={c.lead} className="ls-ch--problem">
      <ProblemLead problem={c.problem} solved={c.solved} tags={c.tags} />
      <Frames items={[SHOTS.oldMenu, SHOTS.liveMenu]} label="Navigation on the earlier theme and the current store" />
      <div className="ls-flow">
        <h3 className="ls-flow__h">{flow.h}</h3>
        <p className="ls-flow__lead">{flow.lead}</p>
        <ol className="ls-flow__grid">
          {flow.steps.map((step) => (
            <li key={step.k}>
              <Shot item={SHOTS[step.media]} className="ls-frame" />
              <p className="ls-flow__k">{step.k}</p>
              <p className="ls-flow__v">{step.v}</p>
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
    <S id={c.id} n={3} title={c.h} lead={c.lead} className="ls-ch--problem">
      <ProblemLead problem={c.problem} solved={c.solved} tags={c.tags} />
      <Frames items={[SHOTS.oldHome, SHOTS.liveHero]} label="Homepage, earlier theme and current store" />
      <Frames items={[SHOTS.oldFormats, SHOTS.liveFormats]} label="Format sections, earlier theme and current store" />
      <Frames items={[SHOTS.liveProof, SHOTS.liveParents]} label="Product proof and pet-parent reactions" />
      <Frames items={[SHOTS.liveReviews, SHOTS.liveStudio]} label="Reviews and the studio story" />
    </S>
  )
}

/* ───────────── 3c · brand system ───────────── */
export function ChIdentity() {
  const c = STORY.chapters.identity
  return (
    <S id={c.id} n={4} title={c.h} lead={c.lead} className="ls-ch--problem">
      <ProblemLead problem={c.problem} solved={c.solved} tags={c.tags} />
      <Frames
        items={[SHOTS.oldPdp, SHOTS.liveFlow]}
        label="Product pages on the earlier theme and the current store"
      />
      <StyleSystem />
    </S>
  )
}

/* ───────────── 4 · delivered ───────────── */
export function ChDelivered() {
  const d = STORY.delivered
  const mine = [
    { ...SHOTS.liveMenu, short: 'Navigation' },
    { ...SHOTS.liveFormats, short: 'Homepage' },
    { ...SHOTS.liveQuiz1, short: 'Chooser' },
    { ...SHOTS.oldPdp, short: 'Product page' },
    { ...SHOTS.liveParents, short: 'Reactions' },
    { ...SHOTS.liveFlow, short: 'Purchase flow' },
  ]
  return (
    <S id={d.id} n={5} title={d.h} lead={d.body} className="rc-sec--last">
      <ul className="ls-deliver">
        {mine.map((it) => (
          <li key={it.short}>
            <Shot item={it} className="ls-frame" />
            <p className="ls-deliver__label">{it.short}</p>
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
