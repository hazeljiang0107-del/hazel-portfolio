import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Button from '../../components/Button'
import BackToTop from '../../components/BackToTop'
import { getAdjacentProjects } from '../../data/projects'
import { COPY } from '../../data/luminipetPreviewCopy'
import { assets, MENU_STEPS, SPEC_TRACE } from '../../data/luminipetPreviewAssets'
import { ReviewProvider, useReview } from '../../components/luminipet-preview/ReviewContext'
import { LightboxProvider } from '../../components/luminipet-preview/Lightbox'
import Shot from '../../components/luminipet-preview/Shot'
import StickyWalkthrough from '../../components/luminipet-preview/StickyWalkthrough'
import FormatExplorer from '../../components/luminipet-preview/FormatExplorer'
import IterationToggle from '../../components/luminipet-preview/IterationToggle'
import TemplateMap from '../../components/luminipet-preview/TemplateMap'
import ReviewPanel from '../../components/luminipet-preview/ReviewPanel'
import { useMediaQuery } from '../../components/luminipet-preview/useMediaQuery'
import '../../styles/luminipet-preview.css'

/** Restrained entrance: 12px rise + fade, once. Off entirely for reduced motion. */
function Reveal({ children, className = '', as = 'div' }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  if (reduce) return <Tag className={className}>{children}</Tag>
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}

/**
 * A screenshot with a one-word provenance tag, so every image says what it is:
 *   audit → a page of my audit document · built → a draft/dev theme capture ·
 *   live  → the published store today.
 */
function Fig({ id, tag, tone, className = '', ...rest }) {
  return (
    <div className={`lpv-fig ${className}`}>
      <p className={`lpv-tag lpv-tag--${tone}`}>{tag}</p>
      <Shot id={id} {...rest} />
    </div>
  )
}

/** Finding → fix, the spine of every chapter. */
function Chapter({ id, kicker, heading, finding, fix, children }) {
  return (
    <section className="lpv-chapter" aria-labelledby={`${id}-h`}>
      <div className="lpv-wrap">
        <Reveal className="lpv-chapter__head">
          <p className="lpv-kicker">{kicker}</p>
          <h2 id={`${id}-h`} className="lpv-h2">
            {heading}
          </h2>
          <dl className="lpv-pd">
            <div>
              <dt>Finding</dt>
              <dd>{finding}</dd>
            </div>
            <div>
              <dt>What I did</dt>
              <dd>{fix}</dd>
            </div>
          </dl>
        </Reveal>
        {children}
      </div>
    </section>
  )
}

function LiveNote() {
  return <p className="lpv-livenote">{COPY.liveTag}</p>
}

function PreviewBar() {
  const { show, setShow } = useReview()
  return (
    <div className="lpv-bar" role="region" aria-label="Preview controls">
      <p>
        <strong>Preview</strong> · not published
        <span className="lpv-bar__more">
          {' '}
          · the live case study at <code>/projects/luminipet-shopify</code> is unchanged
        </span>
      </p>
      <label className="lpv-bar__toggle">
        <input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} />
        <span>Evidence labels</span>
      </label>
    </div>
  )
}

/** Percent-positioned outline + number on a screenshot (static annotation). */
function Pins({ regions }) {
  return regions.map((r, i) => (
    <span
      key={i}
      aria-hidden="true"
      className="lpv-region is-on"
      style={{ left: `${r.x}%`, top: `${r.y}%`, width: `${r.w}%`, height: `${r.h}%` }}
    >
      <span className="lpv-region__n">{r.n}</span>
    </span>
  ))
}

/** Method: four steps, each with the page of my audit that shows it. */
const METHOD_FIGS = ['auditGsc', 'auditHome', 'auditPriority', 'auditPdp3d']

function Method() {
  const m = COPY.method
  return (
    <section className="lpv-chapter" aria-labelledby="method-h">
      <div className="lpv-wrap">
        <Reveal className="lpv-chapter__head">
          <p className="lpv-kicker">{m.kicker}</p>
          <h2 id="method-h" className="lpv-h2">
            {m.heading}
          </h2>
        </Reveal>

        <dl className="lpv-facts">
          {m.facts.map((f) => (
            <div key={f.l}>
              <dt>{f.l}</dt>
              <dd>{f.n}</dd>
            </div>
          ))}
        </dl>

        <ol className="lpv-steps">
          {m.steps.map((s, i) => (
            <li key={s.t}>
              <Reveal>
                <div className="lpv-steps__head">
                  <span className="lpv-steps__n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="lpv-steps__t">{s.t}</h3>
                    <p className="lpv-steps__d">{s.d}</p>
                  </div>
                </div>
                <Shot id={METHOD_FIGS[i]} className="lpv-steps__fig" />
              </Reveal>
            </li>
          ))}
        </ol>
        <p className="lpv-outcome">{m.setup}</p>
      </div>
    </section>
  )
}

function PreviewBody() {
  const { prev, next } = getAdjacentProjects('luminipet-shopify')
  const c = COPY
  const painted = assets.pdpPaintedConfig
  const sculpted = assets.pdpSculptedConfig
  const pets = { x: 0, y: 2.3, w: 100, h: 23, n: 3 }
  const paintedPins = [{ ...painted.regions[0], n: 1 }, { ...painted.regions[1], n: 1 }, pets]
  const sculptedPins = [{ ...sculpted.regions[0], n: 2 }, pets]
  const phoneHero = useMediaQuery('(max-width: 639px)')

  useEffect(() => {
    const prevTitle = document.title
    document.title = 'PREVIEW · LuminiPet case study · Hazel Jiang'
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => {
      document.title = prevTitle
      meta.remove()
    }
  }, [])

  return (
    <div className="lpv">
      <PreviewBar />

      {/* ───────── hero ───────── */}
      <header className="lpv-hero">
        <div className="lpv-wrap">
          <Link to="/projects" className="lpv-back">
            ← All projects
          </Link>
          <Reveal className="lpv-hero__text">
            <p className="text-meta">Shopify storefront · Senaura</p>
            <h1 className="lpv-h1">{c.hero.headline}</h1>
            <p className="lpv-lede">{c.hero.sentence}</p>
          </Reveal>

          <dl className="lpv-meta">
            {c.metaRow.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
            <div className="lpv-meta__cta">
              <Button href={c.liveUrl} variant="primary">
                View live store
              </Button>
            </div>
          </dl>
        </div>
        <div className="lpv-hero__shot">
          {phoneHero ? (
            <Shot id="mHome" priority className="lpv-hero__phone" />
          ) : (
            <Shot id="heroHome" priority />
          )}
        </div>
      </header>

      {/* ───────── 01 · method ───────── */}
      <Method />

      {/* ───────── 02 · homepage ───────── */}
      <Chapter id="home" {...c.chapters.home}>
        <div className="lpv-two lpv-two--first">
          <Fig id="auditHomeOrder" tag="My spec" tone="audit" />
          <Fig id="liveTrust" tag="Live today" tone="live" />
        </div>
        <div className="lpv-two lpv-two--quiet">
          <Fig id="liveFormats" tag="Live today" tone="live" />
          <Fig id="liveReactions" tag="Live today" tone="live" />
        </div>
        <LiveNote />
      </Chapter>

      {/* ───────── 03 · routes ───────── */}
      <Chapter id="a" {...c.chapters.a}>
        <div className="lpv-two lpv-two--first">
          <Fig id="auditNav" tag="My spec" tone="audit" />
          <Fig id="menu" tag="I built" tone="built" />
        </div>
        <StickyWalkthrough assetId="menuDetail" steps={MENU_STEPS} />
        <div className="lpv-two lpv-two--quiet">
          <Fig id="liveMenu" tag="Live today" tone="live" />
          <Fig id="liveQuiz" tag="Live today" tone="live" />
        </div>
        <LiveNote />
      </Chapter>

      {/* ───────── 04 · product pages ───────── */}
      <Chapter id="b" {...c.chapters.b}>
        <div className="lpv-two lpv-two--first">
          <Fig id="auditRoles" tag="My spec" tone="audit" />
          <Fig id="auditFlow" tag="My spec" tone="audit" />
        </div>
        <div className="lpv-compare">
          <div>
            <p className="lpv-compare__label">Hand-painted · I built</p>
            <Shot id="pdpPaintedConfig" className="lpv-compare__fig">
              <Pins regions={paintedPins} />
            </Shot>
          </div>
          <div>
            <p className="lpv-compare__label">Hand-sculpted · I built</p>
            <Shot id="pdpSculptedConfig" className="lpv-compare__fig">
              <Pins regions={sculptedPins} />
            </Shot>
          </div>
          <ol className="lpv-notes">
            {c.chapters.b.annotations.map((a, i) => (
              <li key={a}>
                <span className="lpv-notes__n" aria-hidden="true">
                  {i + 1}
                </span>
                <span>{a}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="lpv-one">
          <Fig id="livePdpSculpted" tag="Live today" tone="live" />
          <LiveNote />
        </div>
      </Chapter>

      {/* ───────── 05 · system ───────── */}
      <Chapter id="c" {...c.chapters.c}>
        <div className="lpv-specrow">
          <Fig id="auditPdp3d" tag="My spec" tone="audit" />
          <div className="lpv-trace" role="table" aria-label="Spec to theme section">
            <div className="lpv-trace__row lpv-trace__row--head" role="row">
              <span role="columnheader">In my spec</span>
              <span role="columnheader">In the theme</span>
            </div>
            {SPEC_TRACE.map((r) => (
              <div className="lpv-trace__row" role="row" key={r.section}>
                <span role="cell">{r.spec}</span>
                <code role="cell">{r.section}</code>
              </div>
            ))}
          </div>
        </div>
        <p className="lpv-lead-in">{c.chapters.c.lead}</p>
        <FormatExplorer />
        <Reveal>
          <TemplateMap />
        </Reveal>
        <div className="lpv-one">
          <Fig id="livePdpProcess" tag="Live today" tone="live" />
          <LiveNote />
        </div>
      </Chapter>

      {/* ───────── 06 · iteration ───────── */}
      <section className="lpv-chapter" aria-labelledby="iter-h">
        <div className="lpv-wrap">
          <Reveal className="lpv-narrow">
            <p className="lpv-kicker">{c.iteration.kicker}</p>
            <h2 id="iter-h" className="lpv-h2">
              {c.iteration.heading}
            </h2>
          </Reveal>
          <IterationToggle />
        </div>
      </section>

      {/* ───────── mobile ───────── */}
      <section className="lpv-chapter lpv-chapter--quiet" aria-labelledby="mob-h">
        <div className="lpv-wrap">
          <p className="lpv-kicker">On a phone</p>
          <h2 id="mob-h" className="lpv-h3 lpv-h3--lg">
            The same structure at 390 px.
          </h2>
          <div className="lpv-phones">
            <Shot id="mHome" />
            <Shot id="mMenu" />
            <Shot id="mSculptedOptions" />
          </div>
        </div>
      </section>

      {/* ───────── 07 · what I did ───────── */}
      <section className="lpv-chapter lpv-ship" aria-labelledby="ship-h">
        <div className="lpv-wrap">
          <Reveal>
            <p className="lpv-kicker">{c.shipped.kicker}</p>
            <h2 id="ship-h" className="lpv-h2">
              {c.shipped.heading}
            </h2>
          </Reveal>
          <Reveal>
            <div className="lpv-cols">
              {c.shipped.columns.map((col) => (
                <div key={col.t}>
                  <h3 className="lpv-cols__t">{col.t}</h3>
                  <ul>
                    {col.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="lpv-also">{c.shipped.also}</p>
          </Reveal>
          <Reveal>
            <p className="lpv-takeaway">{c.shipped.takeaway}</p>
            <div className="lpv-ship__cta">
              <Button href={c.liveUrl} variant="primary">
                View live store
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <nav className="lpv-nav" aria-label="Project navigation">
        <div className="lpv-wrap lpv-nav__grid">
          {prev ? (
            <Link to={`/projects/${prev.slug}`} className="lpv-nav__link">
              <span className="text-label">Previous</span>
              <span className="lpv-nav__title">← {prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={`/projects/${next.slug}`} className="lpv-nav__link lpv-nav__link--next">
              <span className="text-label">Next</span>
              <span className="lpv-nav__title">{next.title} →</span>
            </Link>
          )}
        </div>
      </nav>

      <ReviewPanel />
      <BackToTop />
    </div>
  )
}

export default function LuminiPetPreview() {
  return (
    <ReviewProvider>
      <LightboxProvider>
        <PreviewBody />
      </LightboxProvider>
    </ReviewProvider>
  )
}
