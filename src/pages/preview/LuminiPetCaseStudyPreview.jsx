import { Link } from 'react-router-dom'
import PreviewShell from '../../components/portfolio-preview/PreviewShell'
import Figure from '../../components/portfolio-preview/Figure'
import Reveal from '../../components/portfolio-preview/Reveal'
import RegionWalk from '../../components/portfolio-preview/RegionWalk'
import FormatSwap from '../../components/portfolio-preview/FormatSwap'
import NotesPanel from '../../components/portfolio-preview/NotesPanel'
import ProblemList from '../../components/portfolio-preview/ProblemList'
import MenuMindMap from '../../components/portfolio-preview/MenuMindMap'
import { StructureMap, TemplateMap } from '../../components/portfolio-preview/Diagrams'
import { Arrow } from '../../components/portfolio-preview/Showcase'
import { CASE, caseWordCount } from '../../data/luminipetCaseStudy'
import { PROBLEM_COUNT, PRIORITY_MAP } from '../../data/luminipetProblems'
import {
  assets as A,
  MENU_STEPS,
  SOURCES,
  EVIDENCE,
  CAPTURE_DATE,
  CHECKLIST,
} from '../../data/luminipetPreviewAssets'

const PAGE = { title: 'PREVIEW · LuminiPet — Hazel Jiang' }

/** Label shown on an image when “Evidence” is on. */
const ev = (a) => `${EVIDENCE[a.evidence].label} · ${SOURCES[a.source].short}${a.source === 'auditPdf' ? '' : ` · ${CAPTURE_DATE}`}`

const V = CASE.views

/** Labeled blocks in Nadia’s pattern: PROBLEM / RESEARCH / INSIGHT / DECISION. */
function Blocks({ rows }) {
  return (
    <dl className="pp-brief">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  )
}

function ViewHead({ v, id }) {
  return (
    <h3 className="pp-title pp-title--l" id={id}>
      <span className="pp-num">{v.n}</span> {v.heading}
    </h3>
  )
}

const SWAP_TABS = [
  {
    id: 'painted',
    label: V.pages.tabs.painted.label,
    asset: A.pdpPaintedConfig,
    notes: V.pages.tabs.painted.notes,
    // pins, in the same order as the notes: sizes · frames · shared pet count
    regions: [
      { x: 0, y: 27.5, w: 100, h: 47 },
      { x: 0, y: 76, w: 100, h: 24 },
      { x: 0, y: 1, w: 100, h: 25 },
    ],
  },
  {
    id: 'sculpted',
    label: V.pages.tabs.sculpted.label,
    asset: A.pdpSculptedConfig,
    notes: V.pages.tabs.sculpted.notes,
    // style · sizes + frames · shared pet count
    regions: [
      { x: 0, y: 27.5, w: 100, h: 22 },
      { x: 0, y: 51.5, w: 100, h: 48.5 },
      { x: 0, y: 1, w: 100, h: 25 },
    ],
  },
]

function Notes() {
  const used = [
    A.tourHero, A.tourFormats, A.tourMenu, A.tourQuiz, A.menuDetail, A.pdpPaintedConfig, A.pdpSculptedConfig, A.iterationEarlier, A.iterationFinal,
    A.livePdpSculpted, A.livePdpProcess, A.liveReactions,
  ]
  return (
    <NotesPanel
      title="LuminiPet case-study notes"
      sections={[
        {
          title: 'Every image on this page',
          items: used.map((a) => ({
            head: `${EVIDENCE[a.evidence].label}.`,
            body: `${a.caption} ${SOURCES[a.source].label}${a.source === 'auditPdf' ? '' : `, captured ${CAPTURE_DATE}`}. ${a.page}.`,
          })),
        },
        {
          title: 'Needs your confirmation',
          items: [
            '“The bet” is my framing of the audit’s own order (core site rebuild P0; large ad spend held until pages, tracking and proof are ready). It is not a quote of something you pitched.',
            'The “Picture this” scene is a narrative device built from audit p. 10 and p. 17, not a recorded user session.',
            'The “earlier approach” frame is a candidate: it is the 0720 draft’s story section, which I could not prove predates the final module.',
            '“I built” statements rest on your project notes and the 08-21 theme export, not on a commit log.',
            'Live-today images match the spec, but no artifact shows who built them, so they are worded “Specified in my audit. Live today.”',
            'The role title comes from your notes.',
            'The problem table, priority map and three-level menu are my English translations of the audit’s Chinese tables (pp. 1–27, p. 2, pp. 8–9). Where the audit gives no fix, the Fix column uses the matching line of its priority table.',
            'The priority map is my English translation of the audit’s p. 2 table. The PDF cuts off its fourth column at the page edge, so that column is left out.',
            `The problem list has ${PROBLEM_COUNT} entries, each cited to an audit page. Only items the audit records as done are tagged “Handled”.`,
            `Main narrative is ${caseWordCount()} words, longer than the earlier 350–500 target because Nadia’s structure has more steps.`,
          ],
        },
        {
          title: 'Not claimed',
          items: [
            'No sales, conversion, traffic or usability results. The only number with a before/after is Search Console: 0 to 59 pages found (audit p. 4).',
            'No testimonials, stakeholder feedback, user interviews or collaboration details, so Nadia’s testimonial section has no equivalent here.',
            'No before screenshot of the legacy catalog. The structure diagram is a labeled retrospective.',
          ],
        },
        {
          title: 'Media still needed',
          items: CHECKLIST.map((c) => ({ head: `${c.file}.`, body: `${c.where}. ${c.note}` })),
        },
      ]}
    />
  )
}

export default function LuminiPetCaseStudyPreview() {
  const C = CASE
  return (
    <PreviewShell page={PAGE} notes={<Notes />} variant="site">
      {/* ── title, one-line brief, meta strip ── */}
      <header className="pp-cs-hero pp-wrap">
        <p className="pp-crumb">
          <Link className="pp-link pp-link--quiet" to="/preview/portfolio#work">
            <span aria-hidden="true">←</span> Work
          </Link>
        </p>
        <h1 className="pp-title pp-title--hero">{C.hero.title}</h1>
        <p className="pp-sentence pp-sentence--lg pp-cs-hero__sub">{C.hero.subtitle}</p>
        <dl className="pp-strip">
          {C.meta.map((m) => (
            <div key={m.label}>
              <dt>{m.label}</dt>
              <dd>{m.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* ── the website, first ── */}
      <section className="pp-wrap pp-tour" aria-labelledby="tour-h">
        <div className="pp-tour__head">
          <h2 id="tour-h" className="pp-eyebrow">
            The website
          </h2>
          <a className="pp-link" href={C.liveUrl} target="_blank" rel="noopener noreferrer">
            Visit luminipet.com <Arrow />
          </a>
        </div>
        <div className="pp-tour__grid">
          {[A.tourHero, A.tourFormats, A.tourMenu, A.tourQuiz].map((a, i) => (
            <Reveal key={a.src} className="pp-tour__item">
              <Figure item={a} caption label={ev(a)} priority={i < 2} sizes="(min-width: 768px) 600px, 100vw" />
            </Reveal>
          ))}
        </div>
        <p className="pp-cap-text pp-tour__note">luminipet.com today, captured 9 October 2026.</p>
      </section>

      {/* ── PROBLEM / THE BET / RESULT, then the facts ── */}
      <section className="pp-wrap pp-trio-sec" aria-label="Summary">
        <div className="pp-trio">
          {C.trio.map((t) => (
            <Reveal key={t.label} className="pp-trio__item">
              <p className="pp-eyebrow">{t.label}</p>
              <p className="pp-trio__text">{t.text}</p>
            </Reveal>
          ))}
        </div>
        <ul className="pp-facts">
          {C.facts.map((f) => (
            <li key={f.label}>
              <strong>{f.n}</strong> {f.label}
            </li>
          ))}
        </ul>
      </section>

      {/* ── the problem: a scene, then every problem from the audit ── */}
      <section className="pp-cs pp-wrap" aria-labelledby="pr-h">
        <Reveal className="pp-scene">
          <h2 id="pr-h" className="pp-title pp-title--l">
            {C.problem.heading}
          </h2>
          <p className="pp-scene__text">{C.problem.scene}</p>
        </Reveal>
        <p className="pp-eyebrow pp-problems-lead">{C.problem.lead}</p>
        <ProblemList />
      </section>

      {/* ── first workstream: the audit ── */}
      <section className="pp-cs pp-wrap pp-work1" aria-labelledby="au-h">
        <Reveal className="pp-work1__text">
          <h2 id="au-h" className="pp-title pp-title--l">
            {C.audit.heading}
          </h2>
          <Blocks
            rows={[
              ['Problem', C.audit.problem],
              ['Research', C.audit.research],
            ]}
          />
          <p className="pp-eyebrow pp-insight-label">Insight</p>
          <ul className="pp-insights">
            {C.audit.insights.map((i) => (
              <li key={i.k}>
                <strong>{i.k}</strong> {i.v}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="pp-pmap">
          <div className="pp-pmap__head">
            <h3 className="pp-eyebrow">Priority map</h3>
            <p className="pp-cap-text">From my audit, p. 2, translated from Chinese.</p>
          </div>
          <div className="pp-pmap__scroll">
            <table className="pp-pmap__table">
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
                    <th scope="row">{area}</th>
                    <td className="pp-pmap__p">{p}</td>
                    <td>{action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <p className="pp-turn">{C.audit.turn}</p>
      </section>

      {/* ── the bigger issue, as a headline ── */}
      <section className="pp-cs pp-wrap pp-pivot" aria-labelledby="pv-h">
        <Reveal>
          <h2 id="pv-h" className="pp-title pp-title--xl pp-pivot__h">
            {C.pivot.heading}
          </h2>
        </Reveal>
        <div className="pp-pivot__grid">
          <Reveal>
            <Blocks
              rows={[
                ['Problem', C.pivot.problem],
                ['Insight', C.pivot.insight],
                ['Decision', C.pivot.decision],
              ]}
            />
          </Reveal>
          <Reveal>
            <StructureMap caption={C.pivot.mapCaption} />
          </Reveal>
        </div>
      </section>

      {/* ── what I built: numbered list, then three views ── */}
      <section className="pp-cs pp-wrap pp-built" aria-labelledby="bu-h">
        <Reveal className="pp-built__head">
          <h2 id="bu-h" className="pp-title pp-title--l">
            {C.built.heading}
          </h2>
          <ol className="pp-built__list">
            {C.built.items.map((it, i) => (
              <li key={it}>
                <span>{i + 1}</span>
                {it}
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <section className="pp-cs pp-d1 pp-wrap" aria-labelledby="v1-h">
        <Reveal className="pp-d1__top">
          <div>
            <ViewHead v={V.routes} id="v1-h" />
            <Blocks rows={[['Decision', V.routes.decision]]} />
          </div>
        </Reveal>
        <Reveal>
          <MenuMindMap caption={V.routes.specCaption} />
        </Reveal>
        <RegionWalk asset={A.menuDetail} steps={MENU_STEPS} label={ev(A.menuDetail)} />
      </section>

      <section className="pp-band" aria-labelledby="v2-h">
        <div className="pp-wrap pp-d2">
          <Reveal className="pp-d2__text">
            <ViewHead v={V.pages} id="v2-h" />
            <Blocks rows={[['Decision', V.pages.decision]]} />
          </Reveal>
          <Reveal className="pp-d2__swap">
            <FormatSwap tabs={SWAP_TABS} labelFor={ev} />
          </Reveal>
        </div>
      </section>

      <section className="pp-cs pp-d3 pp-wrap" aria-labelledby="v3-h">
        <Reveal className="pp-d3__head">
          <ViewHead v={V.system} id="v3-h" />
          <Blocks rows={[['Decision', V.system.decision]]} />
        </Reveal>
        <Reveal>
          <TemplateMap caption="Sections per template, read from the theme export. A retrospective summary." />
        </Reveal>
      </section>

      {/* ── iteration: earlier vs final ── */}
      <section className="pp-band pp-band--ink" aria-labelledby="it-h">
        <div className="pp-wrap pp-iter">
          <Reveal className="pp-iter__head">
            <p className="pp-eyebrow">Iteration</p>
            <h2 id="it-h" className="pp-title pp-title--l">
              {C.iteration.heading}
            </h2>
          </Reveal>
          <Reveal className="pp-iter__grid">
            <div className="pp-iter__col">
              <p className="pp-iter__tag">Earlier</p>
              <Figure item={A.iterationEarlier} label={ev(A.iterationEarlier)} sizes="(min-width: 1024px) 520px, 100vw" />
              <p className="pp-iter__text">{C.iteration.earlier}</p>
            </div>
            <div className="pp-iter__mid">
              <p className="pp-iter__tag">What changed</p>
              <p className="pp-iter__why">{C.iteration.change}</p>
            </div>
            <div className="pp-iter__col pp-iter__col--final">
              <p className="pp-iter__tag">Final</p>
              <Figure item={A.iterationFinal} label={ev(A.iterationFinal)} sizes="(min-width: 1024px) 380px, 100vw" />
              <p className="pp-iter__text">{C.iteration.final}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── what shipped ── */}
      <section className="pp-cs pp-wrap pp-ship" aria-labelledby="sh-h">
        <Reveal className="pp-ship__text">
          <h2 id="sh-h" className="pp-title pp-title--l">
            {C.shipped.heading}
          </h2>
          <ul className="pp-ship__list">
            {C.shipped.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="pp-ship__live">
          <p className="pp-eyebrow">{C.shipped.live}</p>
          <div className="pp-ship__shots">
            {[A.livePdpSculpted, A.livePdpProcess, A.liveReactions].map((a) => (
              <Figure key={a.src} item={a} caption label={ev(a)} sizes="(min-width: 1024px) 380px, 100vw" />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── what this taught me ── */}
      <section className="pp-wrap pp-lesson" aria-labelledby="ls-h">
        <Reveal>
          <h2 id="ls-h" className="pp-eyebrow">
            {C.lesson.heading}
          </h2>
          <blockquote className="pp-lesson__q">{C.lesson.quote}</blockquote>
        </Reveal>
      </section>

      <footer className="pp-cs-foot pp-wrap">
        <Link className="pp-link" to="/preview/portfolio#work">
          <span aria-hidden="true">←</span> All work
        </Link>
        <Link className="pp-link pp-link--quiet" to="/projects/luminipet-shopify">
          Published version of this case study
        </Link>
        <Link className="pp-link" to="/projects/stellantis-ivi">
          Next: 2030 Alfa Romeo IVI <Arrow />
        </Link>
      </footer>
    </PreviewShell>
  )
}
