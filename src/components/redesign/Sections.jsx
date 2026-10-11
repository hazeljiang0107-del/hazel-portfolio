import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTrack } from './scrollFx'
import { Arrow } from './ui'
import { SITE, RESUME_URL, COLLAGE, CHAPTERS, ABOUT, FOOTER } from '../../data/redesignPreview'

/* ───────────── Hero: headline + tilted collage of real project screens ───────────── */
export function Hero() {
  const stage = useRef(null)
  useTrack(stage, { mode: 'view', ease: 1, rest: 0.5 })
  const num = (id) => CHAPTERS.find((c) => c.id === id)
  return (
    <section className="rd-hero" aria-labelledby="rd-h1">
      <div className="rd-hero__text">
        <p className="rd-hero__name">{SITE.name}</p>
        <h1 id="rd-h1" className="rd-hero__h1">
          UX / Product
          <br />
          Designer
        </h1>
        <p className="rd-hero__tag">{SITE.tagline}</p>
        <p className="rd-hero__status">
          <span className="rd-dot" aria-hidden="true" />
          {SITE.status} · Ann Arbor
        </p>
        <p className="rd-hero__links">
          <a className="rd-link" href="#work">
            Selected work <span aria-hidden="true">↓</span>
          </a>
          <a className="rd-link" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
            Resume <Arrow />
          </a>
        </p>
      </div>

      <div className="rd-stage" ref={stage} aria-label="Selected project screens">
        {COLLAGE.map((c, i) => {
          const ch = num(c.to)
          const { d, m } = c
          return (
            <div
              key={c.to}
              className="rd-hc"
              style={{
                '--l': d.l,
                '--t': d.t,
                '--w': d.w,
                '--r': `${d.r}deg`,
                '--z': d.z,
                '--s': `${d.s}px`,
                '--ml': m.l,
                '--mt': m.t,
                '--mw': m.w,
                '--mr': `${m.r}deg`,
                '--k': i,
              }}
            >
              <a className="rd-hc__in" href={`#${c.to}`} aria-label={`${ch.title}: jump to project ${ch.n}`}>
                <img src={c.src} width={c.w} height={c.h} alt={c.alt} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" fetchPriority={i === 0 ? 'high' : undefined} />
                <span className="rd-hc__lab">
                  <b>{ch.n}</b> {ch.title.replace(/ Redesign$| Shopify Theme System$/, '')}
                </span>
              </a>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ───────────── About: a typed note on paper ───────────── */
export function About() {
  const sec = useRef(null)
  useTrack(sec, { mode: 'view', ease: 1, rest: 0.6 })
  return (
    <section id="about" ref={sec} className="rd-about" aria-labelledby="rd-about-t">
      <header className="rd-sec">
        <h2 id="rd-about-t" className="rd-sec__t" data-rv>
          About
        </h2>
        <p className="rd-sec__s" data-rv style={{ '--d': '80ms' }}>
          {SITE.subline}
        </p>
      </header>

      <div className="rd-about__stage">
        <figure className="rd-polaroid" data-rv>
          <img src={ABOUT.portrait} alt={ABOUT.portraitAlt} width="1024" height="768" loading="lazy" decoding="async" />
          <i className="rd-tape" aria-hidden="true" />
        </figure>

        <article className="rd-letter">
          <p className="rd-letter__from">
            {SITE.name}
            <span>UX / Product Designer</span>
          </p>
          {ABOUT.paras.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <dl className="rd-letter__facts">
            {ABOUT.facts.map(([k, v]) => (
              <div key={v}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="rd-letter__links">
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </p>
        </article>
      </div>
    </section>
  )
}

/* ───────────── Footer ───────────── */
function FLink({ l }) {
  if (l.to) return <Link to={l.to}>{l.label}</Link>
  if (l.external) {
    return (
      <a href={l.href} target="_blank" rel="noopener noreferrer">
        {l.label}
      </a>
    )
  }
  return <a href={l.href}>{l.label}</a>
}

export function Footer({ work = FOOTER.work }) {
  return (
    <footer id="contact" className="rd-foot">
      <div className="rd-foot__cols">
        <nav aria-label="Projects">
          <h2>Work</h2>
          <ul>
            {work.map((l) => (
              <li key={l.label}>
                <FLink l={l} />
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Elsewhere">
          <h2>Contact</h2>
          <ul>
            {FOOTER.elsewhere.map((l) => (
              <li key={l.label}>
                <FLink l={l} />
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="This site">
          <h2>Site</h2>
          <ul>
            {FOOTER.site.map((l) => (
              <li key={l.label}>
                <FLink l={l} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="rd-foot__rule">
        <span>© 2026 {SITE.name}</span>
        <span>Designed and built by Hazel Jiang</span>
      </div>
      <svg className="rd-foot__mark" viewBox="0 0 1000 230" role="img" aria-label={SITE.name}>
        <text x="0" y="214" textLength="1000" lengthAdjust="spacingAndGlyphs">
          {SITE.name.toUpperCase()}
        </text>
      </svg>
    </footer>
  )
}
