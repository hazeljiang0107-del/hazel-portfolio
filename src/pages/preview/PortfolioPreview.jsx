import { Link } from 'react-router-dom'
import PreviewShell from '../../components/portfolio-preview/PreviewShell'
import Showcase, { Arrow } from '../../components/portfolio-preview/Showcase'
import Reveal from '../../components/portfolio-preview/Reveal'
import NotesPanel from '../../components/portfolio-preview/NotesPanel'
import {
  IDENTITY,
  ABOUT,
  SHOWCASES,
  SITE,
  RESUME_URL,
  EVIDENCE_LABEL,
  MISSING_MEDIA,
  UNSUPPORTED,
} from '../../data/portfolioPreview'

const PAGE = {
  title: 'PREVIEW · Hazel Jiang — UX / Product Designer',
}

function Notes() {
  const media = SHOWCASES.flatMap((s) =>
    s.media.map((m) => ({
      head: `${s.title} · ${EVIDENCE_LABEL[m.evidence]}.`,
      body: `${m.caption} ${m.note}`,
    })),
  )
  return (
    <NotesPanel
      title="Homepage preview notes"
      sections={[
        { title: 'Where each image comes from', items: media },
        { title: 'Missing media', items: MISSING_MEDIA.map((m) => ({ head: `${m.project}.`, body: m.need })) },
        { title: 'Not claimed', items: UNSUPPORTED },
      ]}
    />
  )
}

export default function PortfolioPreview() {
  return (
    <PreviewShell page={PAGE} notes={<Notes />}>
      {/* compact identity: name, role, one sentence */}
      <section className="pp-intro pp-wrap" aria-labelledby="pp-name">
        <div className="pp-intro__id">
          <h1 id="pp-name" className="pp-name">
            {IDENTITY.name}
          </h1>
          <p className="pp-role">{IDENTITY.title}</p>
        </div>
        <div className="pp-intro__text">
          <p className="pp-lede">{IDENTITY.sentence}</p>
          <p className="pp-status">
            <span className="pp-dot" aria-hidden="true" />
            {IDENTITY.status}
          </p>
        </div>
      </section>

      {/* selected work: a vertical sequence of showcases, not a card grid */}
      <section id="work" className="pp-work" aria-label="Selected work">
        {SHOWCASES.map((s, i) => (
          <Showcase key={s.slug} s={s} i={i} />
        ))}
      </section>

      {/* about: short, below the work; the long version stays on /about */}
      <section id="about" className="pp-about pp-wrap" aria-labelledby="about-h">
        <Reveal className="pp-about__grid">
          <figure className="pp-about__portrait">
            <img src={ABOUT.portrait} alt={ABOUT.portraitAlt} width="460" height="345" loading="lazy" decoding="async" />
          </figure>
          <div>
            <h2 id="about-h" className="pp-eyebrow">
              About
            </h2>
            <p className="pp-about__line">{ABOUT.line}</p>
            <Link className="pp-link" to={ABOUT.more.to}>
              {ABOUT.more.label} <Arrow />
            </Link>
          </div>
        </Reveal>
      </section>

      <section id="contact" className="pp-contact pp-wrap" aria-labelledby="contact-h">
        <Reveal>
          <p className="pp-eyebrow">{SITE.status}</p>
          <h2 id="contact-h" className="pp-title pp-title--xl pp-title--contact">
            Let’s connect.
          </h2>
          <ul className="pp-contact__list">
            <li>
              <a className="pp-link" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </li>
            <li>
              <a className="pp-link" href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a className="pp-link" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </li>
          </ul>
        </Reveal>
      </section>
    </PreviewShell>
  )
}
