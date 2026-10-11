import { Link } from 'react-router-dom'
import Figure from './Figure'
import VideoClip from './VideoClip'
import Reveal from './Reveal'

export function Arrow() {
  return (
    <svg className="pp-arrow" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

function Media({ m, priority, className }) {
  return m.kind === 'video' ? (
    <VideoClip item={m} priority={priority} className={className} />
  ) : (
    <Figure item={m} priority={priority} className={className} />
  )
}

/** Role · year, one line. */
function Meta({ s }) {
  return (
    <p className="pp-meta">
      <span>{s.role}</span>
      <span>{s.year}</span>
    </p>
  )
}

function Links({ s }) {
  return (
    <p className="pp-links">
      <Link className="pp-link" to={s.caseStudy} aria-label={`View case study: ${s.title}`}>
        View case study <Arrow />
      </Link>
      {s.publishedStudy && (
        <Link className="pp-link pp-link--quiet" to={s.publishedStudy}>
          Published version
        </Link>
      )}
    </p>
  )
}

const num = (i) => String(i + 1).padStart(2, '0')

/** 1 · media first, full width, caption row beneath. */
function Wide({ s, i }) {
  return (
    <div className="pp-wrap">
      <Reveal className="pp-show__media">
        <Media m={s.media[0]} priority={i === 0} />
      </Reveal>
      <div className="pp-row">
        <h2 className="pp-title pp-title--m" id={`${s.slug}-h`}>
          <span className="pp-num">{num(i)}</span> {s.title}
        </h2>
        <p className="pp-sentence">{s.sentence}</p>
        <div className="pp-row__end">
          <Meta s={s} />
          <Links s={s} />
        </div>
      </div>
    </div>
  )
}

/** 2 · a wide screen beside a tall detail; the caption sits under the wide screen. */
function Paired({ s, i }) {
  return (
    <div className="pp-wrap pp-paired">
      <div className="pp-paired__main">
        <Reveal>
          <Media m={s.media[0]} />
        </Reveal>
        <div className="pp-stack">
          <h2 className="pp-title pp-title--m" id={`${s.slug}-h`}>
            <span className="pp-num">{num(i)}</span> {s.title}
          </h2>
          <p className="pp-sentence">{s.sentence}</p>
          <div className="pp-stack__end">
            <Meta s={s} />
            <Links s={s} />
          </div>
        </div>
      </div>
      <Reveal className="pp-paired__side">
        <Media m={s.media[1]} />
      </Reveal>
    </div>
  )
}

/** 3 · an oversized title, then the product with a short text column. */
function Title({ s, i }) {
  return (
    <div className="pp-wrap">
      <Reveal>
        <h2 className="pp-title pp-title--xl" id={`${s.slug}-h`}>
          {s.title}
        </h2>
      </Reveal>
      <div className="pp-titlerow">
        <div className="pp-titlerow__text">
          <span className="pp-num">{num(i)}</span>
          <p className="pp-sentence">{s.sentence}</p>
          <Meta s={s} />
          <Links s={s} />
        </div>
        <Reveal className="pp-titlerow__media">
          <Media m={s.media[0]} />
        </Reveal>
      </div>
    </div>
  )
}

/** 4 · a smaller static artifact in a hairline frame; low-key caption. */
function Quiet({ s, i }) {
  return (
    <div className="pp-wrap pp-quiet">
      <Reveal className="pp-quiet__media">
        <Media m={s.media[0]} className="pp-fig--framed" />
      </Reveal>
      <div className="pp-quiet__cap">
        <h2 className="pp-title pp-title--s" id={`${s.slug}-h`}>
          <span className="pp-num">{num(i)}</span> {s.title}
        </h2>
        <p className="pp-sentence">{s.sentence}</p>
        <div className="pp-quiet__end">
          <Meta s={s} />
          <Links s={s} />
        </div>
      </div>
    </div>
  )
}

/** 5 · a full-bleed dark band for media that carries its own dark ground. */
function Dark({ s, i }) {
  return (
    <div className="pp-wrap pp-dark__grid">
      <div className="pp-dark__text">
        <span className="pp-num">{num(i)}</span>
        <h2 className="pp-title pp-title--l" id={`${s.slug}-h`}>
          {s.title}
        </h2>
        <p className="pp-sentence">{s.sentence}</p>
        <Meta s={s} />
        <Links s={s} />
      </div>
      <Reveal className="pp-dark__media">
        <Media m={s.media[0]} />
      </Reveal>
    </div>
  )
}

/** 6 · text column beside a wide recording. */
function Split({ s, i }) {
  return (
    <div className="pp-wrap pp-split">
      <div className="pp-split__text">
        <span className="pp-num">{num(i)}</span>
        <h2 className="pp-title pp-title--l" id={`${s.slug}-h`}>
          {s.title}
        </h2>
        <p className="pp-sentence">{s.sentence}</p>
        <Meta s={s} />
        <Links s={s} />
      </div>
      <Reveal className="pp-split__media">
        <Media m={s.media[0]} />
      </Reveal>
    </div>
  )
}

const LAYOUTS = { wide: Wide, paired: Paired, title: Title, quiet: Quiet, dark: Dark, split: Split }

export default function Showcase({ s, i }) {
  const L = LAYOUTS[s.layout] || Wide
  return (
    <article className={`pp-show pp-show--${s.layout}`} aria-labelledby={`${s.slug}-h`}>
      <L s={s} i={i} />
    </article>
  )
}
