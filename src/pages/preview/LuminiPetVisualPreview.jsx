import { Link } from 'react-router-dom'
import PreviewShell from '../../components/portfolio-preview/PreviewShell'
import Figure from '../../components/portfolio-preview/Figure'
import VideoClip from '../../components/portfolio-preview/VideoClip'
import Reveal from '../../components/portfolio-preview/Reveal'
import FormatSwap from '../../components/portfolio-preview/FormatSwap'
import NotesPanel from '../../components/portfolio-preview/NotesPanel'
import ProblemList from '../../components/portfolio-preview/ProblemList'
import MenuMindMap from '../../components/portfolio-preview/MenuMindMap'
import { StructureMap, TemplateMap } from '../../components/portfolio-preview/Diagrams'
import { Arrow } from '../../components/portfolio-preview/Showcase'
import { VIS, FLAGS, visualWordCount } from '../../data/luminipetVisual'
import { PRIORITY_MAP, PROBLEM_COUNT } from '../../data/luminipetProblems'
import { MEDIA as M } from '../../data/luminipetVisualMedia'
import { assets as A, EVIDENCE, SOURCES } from '../../data/luminipetPreviewAssets'

const PAGE = { title: 'PREVIEW · LuminiPet, visual — Hazel Jiang' }

const label = (a) => (a.evidence && EVIDENCE[a.evidence] ? `${EVIDENCE[a.evidence].label} · ${SOURCES[a.source]?.short ?? ''}` : '')

/** Captions that sit beside the interface: a small tag (Changed / Why / Built) and one line. */
function Notes({ rows, className = '' }) {
  return (
    <ul className={`pv-notes ${className}`}>
      {rows.map(([k, v]) => (
        <li key={v}>
          <b>{k}</b>
          <span>{v}</span>
        </li>
      ))}
    </ul>
  )
}

function Head({ id, children, line }) {
  return (
    <div className="pv-head">
      <h2 id={id} className="pp-title pp-title--l">
        {children}
      </h2>
      {line && <p className="pv-line">{line}</p>}
    </div>
  )
}

function More({ summary, children }) {
  return (
    <details className="pv-more">
      <summary>
        <span>{summary}</span>
        <i aria-hidden="true">+</i>
      </summary>
      <div className="pv-more__body">{children}</div>
    </details>
  )
}

function Flag({ children }) {
  return (
    <p className="pv-flag" role="note">
      <b>Flag</b> {children}
    </p>
  )
}

const SWAP = [
  {
    id: 'painted',
    label: 'Hand-painted',
    asset: A.pdpPaintedConfig,
    notes: VIS.pages.painted,
    regions: [
      { x: 0, y: 27.5, w: 100, h: 47 },
      { x: 0, y: 76, w: 100, h: 24 },
    ],
  },
  {
    id: 'sculpted',
    label: 'Hand-sculpted',
    asset: A.pdpSculptedConfig,
    notes: VIS.pages.sculpted,
    regions: [
      { x: 0, y: 27.5, w: 100, h: 22 },
      { x: 0, y: 51.5, w: 100, h: 48.5 },
    ],
  },
]

function PreviewNotes() {
  return (
    <NotesPanel
      title="Visual case-study notes"
      sections={[
        {
          title: 'Copy budget',
          items: [
            `Main copy: ${visualWordCount()} words (target 150–250). Not counted: the expandable problem table, priority map and full menu, image alt text, and evidence flags.`,
          ],
        },
        {
          title: 'Where the media comes from',
          items: [
            'Recordings and large stills: captured 9 Oct 2026 from the dev theme “Backend Lumini Dev Export 20260813” (#155174404264) via its theme preview. Chat and cookie overlays were hidden, and a round cursor marker was added so clicks are visible. Nothing else was edited.',
            'Top image: luminipet.com screenshot you supplied.',
            'Option panels (format switcher) and the “earlier” frame: the 0720 draft theme, captured earlier.',
            'Structure and template diagrams: redrawn by me from the audit and the 08-21 theme export.',
          ],
        },
        {
          title: 'Needs your confirmation',
          items: [
            '“Built” captions rest on your project notes (navigation, four product templates, homepage sections, proof modules) and the dev theme. Confirm the homepage hero, relief and gift sections and the style quiz are yours.',
            FLAGS.earlier,
            FLAGS.before,
          ],
        },
        {
          title: 'Not claimed',
          items: [
            'No sales, conversion or usability results. The only before/after number is Search Console: 0 to 59 pages found.',
            'No testimonials, user research or stakeholder feedback.',
          ],
        },
      ]}
    />
  )
}

export default function LuminiPetVisualPreview() {
  const v = VIS
  return (
    <PreviewShell page={PAGE} notes={<PreviewNotes />} variant="site">
      {/* ── hero: the live site, large ── */}
      <header className="pp-wrap pv-hero">
        <p className="pp-crumb">
          <Link className="pp-link pp-link--quiet" to="/preview/portfolio#work">
            <span aria-hidden="true">←</span> Work
          </Link>
        </p>
        <div className="pv-hero__text">
          <h1 className="pp-title pp-title--hero">{v.hero.title}</h1>
          <p className="pv-line pv-line--lg">{v.hero.line}</p>
          <p className="pv-meta">{v.hero.meta}</p>
        </div>
        <div className="pv-hero__media">
          <Figure item={A.tourHero} label={label(A.tourHero)} priority sizes="(min-width: 1024px) 860px, 100vw" />
          <div className="pv-hero__side">
            {[A.tourMenu, A.tourQuiz].map((a) => (
              <Figure key={a.src} item={a} label={label(a)} sizes="(min-width: 1024px) 380px, 50vw" />
            ))}
          </div>
        </div>
        <p className="pv-cap">
          {v.hero.cap}{' '}
          <a className="pp-link" href="https://luminipet.com/" target="_blank" rel="noopener noreferrer">
            Visit <Arrow />
          </a>
        </p>
      </header>

      {/* ── the problem: a diagram, the full list on click ── */}
      <section className="pp-wrap pv-sec pv-problem" aria-labelledby="pv-p">
        <Reveal>
          <Head id="pv-p" line={v.problem.line}>
            {v.problem.h}
          </Head>
        </Reveal>
        <Reveal className="pv-problem__map">
          <StructureMap caption={v.problem.mapCap} />
        </Reveal>
        <Flag>{FLAGS.before}</Flag>
        <div className="pv-mores">
          <More summary={`All ${PROBLEM_COUNT} problems from my audit`}>
            <ProblemList />
          </More>
          <More summary="Priority map, P0 to P3">
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
          </More>
        </div>
      </section>

      {/* ── menu: recording beside its captions ── */}
      <section className="pp-wrap pv-sec pv-menu" aria-labelledby="pv-m">
        <Reveal>
          <Head id="pv-m">{v.menu.h}</Head>
        </Reveal>
        <Reveal className="pv-menu__grid">
          <VideoClip item={M.recMenu} enlarge />
          <Notes rows={v.menu.notes} className="pv-notes--side" />
          <div className="pv-menu__quiz">
            <VideoClip item={M.recQuiz} enlarge />
            <Notes rows={[v.menu.quiz]} />
          </div>
        </Reveal>
        <More summary="The full three-level menu from my audit">
          <MenuMindMap caption="Translated from my audit, pp. 8–9." />
        </More>
      </section>

      {/* ── product pages: switch formats, numbered pins ── */}
      <section className="pv-band" aria-labelledby="pv-f">
        <div className="pp-wrap pv-sec pv-pages">
          <Reveal className="pv-pages__text">
            <Head id="pv-f">{v.pages.h}</Head>
            <Notes rows={v.pages.notes} />
          </Reveal>
          <Reveal className="pv-pages__swap">
            <FormatSwap tabs={SWAP} labelFor={label} />
          </Reveal>
        </div>
      </section>

      {/* ── homepage: audit problem → built section ── */}
      <section className="pp-wrap pv-sec" aria-labelledby="pv-h">
        <Reveal>
          <Head id="pv-h">{v.home.h}</Head>
        </Reveal>
        <div className="pv-trio">
          {[M.homeHero, M.homeRelief, M.homeGift].map((m, i) => (
            <Reveal key={m.src} className="pv-trio__item">
              <Figure item={m} label={label(m)} sizes="(min-width: 1024px) 420px, 100vw" />
              <dl className="pv-pair">
                <div>
                  <dt>Audit</dt>
                  <dd>{v.home.items[i][0]}</dd>
                </div>
                <div>
                  <dt>Built</dt>
                  <dd>{v.home.items[i][1]}</dd>
                </div>
              </dl>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── proof modules: a bento of short recordings ── */}
      <section className="pv-band pv-band--ink" aria-labelledby="pv-t">
        <div className="pp-wrap pv-sec">
          <Reveal>
            <Head id="pv-t" line={v.proof.line}>
              {v.proof.h}
            </Head>
          </Reveal>
          <p className="pv-tag">Built in my dev theme</p>
          <div className="pv-bento">
            {[
              ['hpDetail', M.recHpDetail, 'pv-bento__a'],
              ['hsDepth', M.recHsDepth, 'pv-bento__b'],
              ['hpCanvas', M.recHpCanvas, 'pv-bento__c'],
              ['hsLight', M.recHsLight, 'pv-bento__d'],
            ].map(([k, m, cls]) => (
              <Reveal key={k} className={`pv-bento__item ${cls}`}>
                <VideoClip item={m} enlarge />
                <p className="pv-cap">{v.proof.clips[k]}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── iteration: earlier vs final, flagged ── */}
      <section className="pp-wrap pv-sec" aria-labelledby="pv-i">
        <Reveal>
          <Head id="pv-i">{v.iteration.h}</Head>
        </Reveal>
        <Reveal className="pv-iter">
          <div className="pv-iter__col">
            <Figure item={A.iterationEarlier} label={label(A.iterationEarlier)} sizes="(min-width: 1024px) 560px, 100vw" />
            <p className="pv-cap">{v.iteration.earlier}</p>
            <Flag>{FLAGS.earlier}</Flag>
          </div>
          <span className="pv-iter__arrow" aria-hidden="true">
            →
          </span>
          <div className="pv-iter__col">
            <Figure item={M.hpDetail} label={label(M.hpDetail)} sizes="(min-width: 1024px) 560px, 100vw" />
            <p className="pv-cap">{v.iteration.final}</p>
          </div>
        </Reveal>
      </section>

      {/* ── system: shared sections ── */}
      <section className="pp-wrap pv-sec" aria-labelledby="pv-s">
        <Reveal>
          <Head id="pv-s">{v.system.h}</Head>
        </Reveal>
        <Reveal>
          <TemplateMap caption={v.system.cap} />
        </Reveal>
      </section>

      {/* ── search: one number ── */}
      <section className="pp-wrap pv-sec pv-search" aria-labelledby="pv-g">
        <Reveal>
          <Head id="pv-g">{v.search.h}</Head>
        </Reveal>
        <Reveal className="pv-stat">
          <div>
            <strong>0</strong>
            <span>Before</span>
          </div>
          <i aria-hidden="true">→</i>
          <div>
            <strong>59</strong>
            <span>After</span>
          </div>
          <p>pages found in Search Console</p>
        </Reveal>
        <p className="pv-cap">{v.search.cap}</p>
        <More summary="Original Search Console screenshots">
          <Figure item={A.auditGsc} caption label={label(A.auditGsc)} sizes="(min-width: 1024px) 900px, 100vw" />
        </More>
      </section>

      {/* ── lesson ── */}
      <section className="pp-wrap pv-lesson" aria-labelledby="pv-l">
        <h2 id="pv-l" className="pp-eyebrow">
          {v.lesson.h}
        </h2>
        <blockquote>{v.lesson.quote}</blockquote>
      </section>

      <footer className="pp-cs-foot pp-wrap">
        <Link className="pp-link" to="/preview/portfolio#work">
          <span aria-hidden="true">←</span> All work
        </Link>
        <Link className="pp-link pp-link--quiet" to="/preview/projects/luminipet">
          Text-heavy preview
        </Link>
        <Link className="pp-link" to="/projects/stellantis-ivi">
          Next: 2030 Alfa Romeo IVI <Arrow />
        </Link>
      </footer>
    </PreviewShell>
  )
}
