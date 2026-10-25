import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTrack, useReduced } from '../redesign/scrollFx'
import { Arrow } from '../redesign/ui'
import { SITE, CHAPTERS, COVERS, TICKER, ABOUT, FEATURED } from '../../data/magazine'
import { COLLAGE } from '../../data/redesignPreview'
import { RESUME_URL } from '../../data/projects'
import { Hand, Marquee, Stamp, Tape, useInView, useTorn } from './paper'

const num = (id) => CHAPTERS.find((c) => c.id === id)
const TAPES = ['kraft', 'red', 'kraft', 'red', 'kraft']
const FEATURED_IDS = new Set(FEATURED.map((c) => c.id))

/* ───────────── cover: title + project collage + About on the same desk ───────────── */
export function Cover() {
  const stage = useRef(null)
  const root = useRef(null)
  const reduce = useReduced()
  useTrack(stage, { mode: 'view', ease: 1, rest: 0.5 })

  useEffect(() => {
    const el = root.current
    if (!el || reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined
    let raf = 0
    const on = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', ((e.clientX / window.innerWidth - 0.5) * 2).toFixed(3))
        el.style.setProperty('--my', ((e.clientY / window.innerHeight - 0.5) * 2).toFixed(3))
      })
    }
    window.addEventListener('pointermove', on, { passive: true })
    return () => {
      window.removeEventListener('pointermove', on)
      cancelAnimationFrame(raf)
    }
  }, [reduce])

  return (
    <section className="rd-hero mg-hero" ref={root} aria-labelledby="rd-h1">
      <div className="mg-mast" aria-hidden="true">
        <span>{SITE.name}</span>
        <span>Portfolio · Issue 01</span>
        <span>Ann Arbor</span>
      </div>

      <div className="rd-hero__text mg-hero__text">
        <h1 id="rd-h1" className="mg-h1">
          <span>UX / Product</span>
          <span className="mg-h1__w">
            Designer
            <svg className="mg-h1__ul" viewBox="0 0 400 18" preserveAspectRatio="none" aria-hidden="true">
              <path pathLength="1" d="M2 11 C 70 7, 140 14, 210 10 S 320 13, 398 8" />
            </svg>
          </span>
        </h1>
        <p className="rd-hero__tag mg-hero__tag">{SITE.tagline}</p>
        <p className="rd-hero__status">
          <span className="rd-dot" aria-hidden="true" />
          {SITE.status} · Ann Arbor
        </p>
        <p className="rd-hero__links">
          <a className="rd-link" href="#about">
            About me <span aria-hidden="true">↓</span>
          </a>
          <a className="rd-link" href="#work">
            Selected work <span aria-hidden="true">↓</span>
          </a>
          <Link className="rd-link" to="/work">
            All work <Arrow />
          </Link>
          <a className="rd-link" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
            Resume <Arrow />
          </a>
        </p>
        <Hand className="mg-hero__hand" rot={-6} arrow>
          about me is on the desk
        </Hand>
      </div>

      {/* One desk: About first, then the project collage underneath. */}
      <div className="mg-desk">
        <div className="mg-desk__about" id="about">
          <figure className="mg-desk__polaroid">
            <img src={ABOUT.portrait} alt={ABOUT.portraitAlt} width="1024" height="768" loading="eager" decoding="async" />
            <Tape rot={-6} tone="red" className="mg-desk__ptape" />
            <figcaption>
              <Hand rot={-4}>{SITE.name}</Hand>
            </figcaption>
          </figure>

          <article className="mg-desk__letter" aria-labelledby="rd-about-t">
            <p className="mg-folio">
              <b>About</b>
            </p>
            <h2 id="rd-about-t" className="mg-desk__lt">
              About me
            </h2>
            <p className="mg-desk__from">
              {SITE.name}
              <span>UX / Product Designer</span>
            </p>
            {ABOUT.paras.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <dl className="mg-desk__facts">
              {ABOUT.facts.map(([k, v]) => (
                <div key={v}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mg-desk__links">
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </p>
            <Stamp text={`${SITE.status.toUpperCase()} · `} sub="NOW" size={96} rot={-14} className="mg-desk__stamp" label={SITE.status} />
          </article>
        </div>

        <div className="rd-stage mg-stage" ref={stage} aria-label="Selected project screens">
          {COLLAGE.map((c, i) => {
            const ch = num(c.to)
            const { d, m } = c
            const to = FEATURED_IDS.has(c.to) ? `#${c.to}` : `/work#${c.to}`
            const label = `${ch.title}: ${FEATURED_IDS.has(c.to) ? 'jump to project' : 'open project'} ${ch.n}`
            const picture = (
              <>
                <img src={c.src} width={c.w} height={c.h} alt={c.alt} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" fetchPriority={i === 0 ? 'high' : undefined} />
                <span className="rd-hc__lab">
                  <b>{ch.n}</b> {ch.title.replace(/ Redesign$| Shopify Theme System$/, '')}
                </span>
              </>
            )
            return (
              <div
                key={c.to}
                className="rd-hc"
                style={{ '--l': d.l, '--t': d.t, '--w': d.w, '--r': `${d.r}deg`, '--z': d.z, '--s': `${d.s}px`, '--ml': m.l, '--mt': m.t, '--mw': m.w, '--mr': `${m.r}deg`, '--k': i, '--k2': (0.55 + (i % 3) * 0.45).toFixed(2) }}
              >
                {to.startsWith('#') ? (
                  <a className="rd-hc__in" href={to} aria-label={label} data-cursor="go">
                    {picture}
                  </a>
                ) : (
                  <Link className="rd-hc__in" to={to} aria-label={label} data-cursor="go">
                    {picture}
                  </Link>
                )}
                <Tape rot={(i % 2 ? 1 : -1) * (4 + i)} tone={TAPES[i % TAPES.length]} className="mg-hc__tape" />
              </div>
            )
          })}
          <Stamp text="SELECTED WORK · PORTFOLIO · " sub="01" size={132} rot={-12} className="mg-stage__stamp mg-stage__stamp--a" />
          <Stamp text="UX · RESEARCH · BUILD · " sub="UX" size={96} rot={14} tone="paper" className="mg-stage__stamp mg-stage__stamp--b" />
        </div>
      </div>

      <Marquee items={TICKER} label="Projects in this issue" className="mg-hero__ticker" />
    </section>
  )
}

/* ───────────── contents (a ripped notebook page) ───────────── */
export function Contents({ chapters = CHAPTERS, id }) {
  const page = useRef(null)
  const peek = useRef(null)
  const reduce = useReduced()
  const [on, setOn] = useState(null)
  const seen = useInView(page, { threshold: 0.15 })
  const clip = useTorn(7, { top: true, bottom: true, amp: 12 })
  const fine = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

  useEffect(() => {
    if (on === null || reduce || !fine) return undefined
    let x = 0
    let y = 0
    let tx = 0
    let ty = 0
    let raf = 0
    const el = peek.current
    const loop = () => {
      x += (tx - x) * 0.18
      y += (ty - y) * 0.18
      if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(-4deg)`
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.4 ? requestAnimationFrame(loop) : 0
    }
    const move = (e) => {
      tx = e.clientX + 28
      ty = e.clientY - 70
      if (!x && !y) {
        x = tx
        y = ty
      }
      if (!raf) raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', move)
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [on, reduce, fine])

  return (
    <section id={id} className="mg-toc" aria-labelledby="mg-toc-t">
      <div className={`mg-toc__sheet${seen ? ' is-in' : ''}`} ref={page}>
        <div className="mg-toc__page" style={{ clipPath: clip }}>
          <header className="mg-toc__head">
            <p className="mg-folio">
              <b>In this issue</b>
            </p>
            <h2 id="mg-toc-t" className="mg-toc__t">
              Contents
            </h2>
            <Hand className="mg-toc__hand" rot={-5} underline>
              start anywhere
            </Hand>
          </header>
          <ol className="mg-toc__list" onPointerLeave={() => setOn(null)}>
            {chapters.map((c, i) => (
              <li key={c.id} style={{ '--i': i }}>
                <a href={`#${c.id}`} onPointerEnter={() => setOn(c.id)} onFocus={() => setOn(c.id)} onBlur={() => setOn(null)} data-cursor="go">
                  <b>{c.n}</b>
                  <span className="mg-toc__name">{c.title.replace(/ Redesign$| Shopify Theme System$/, '')}</span>
                  <em>
                    {c.role} · {c.when}
                  </em>
                  <i aria-hidden="true">→</i>
                </a>
              </li>
            ))}
            {chapters.length < CHAPTERS.length && (
              <li style={{ '--i': chapters.length }}>
                <Link to="/work" data-cursor="go">
                  <b>→</b>
                  <span className="mg-toc__name">All work</span>
                  <em>{CHAPTERS.length - chapters.length} more projects</em>
                  <i aria-hidden="true">→</i>
                </Link>
              </li>
            )}
          </ol>
        </div>
      </div>
      {on && fine && !reduce && (
        <img key={on} ref={peek} className="mg-toc__peek" src={COVERS[on].src} width={COVERS[on].w} height={COVERS[on].h} alt="" aria-hidden="true" />
      )}
    </section>
  )
}

/* ───────────── footer ticker ───────────── */
export function FooterTicker() {
  return <Marquee items={[SITE.status, SITE.email, 'Ann Arbor']} tone="paper" speed={46} className="mg-foot-ticker" label="Contact" />
}
