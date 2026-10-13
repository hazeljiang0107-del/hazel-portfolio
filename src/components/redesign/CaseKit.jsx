import { Fragment, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTrack } from './scrollFx'
import { Arrow, Shot } from './ui'
import { Sec, Notes, Figure, Stats, Insights, Table, pad } from './SocCase'
import { still, ECHOES_CLIP, SITE, RESUME_URL } from '../../data/redesignCases'

/**
 * Data-driven case study: renders a project's sections and modules from src/data/projects.js
 * in the redesign's visual language (same blocks as the Surveys of Consumers and LuminiPet pages).
 * Used for Alfa Romeo IVI, Zingerman's, Still Here and Echoes.
 */

const colsFor = (n) => (n <= 2 ? 2 : n === 3 ? 3 : n === 5 ? 5 : 4)
const ratio = (it) => it.width / it.height

/* ───────────── hero + overview + end ───────────── */
export function CaseHero({ c }) {
  const stage = useRef(null)
  useTrack(stage, { mode: 'view', ease: 1, rest: 0.5 })
  return (
    <section className="rc-hero" aria-labelledby="rc-h1">
      <div className="rc-hero__text">
        <p className="rd-head__n">Case study · {c.n} / 06</p>
        <h1 id="rc-h1" className="rc-hero__h1">
          {c.lines.map((l, i) => (
            <Fragment key={l}>
              {i > 0 && <br />}
              {l}
            </Fragment>
          ))}
        </h1>
        <p className="rc-hero__sub rg-sub">{c.p.subtitle}</p>
        {c.links.length > 0 && (
          <p className="rc-hero__links">
            {c.links.map((l) => (
              <a key={l.label} className="rd-link" href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label} <Arrow />
              </a>
            ))}
          </p>
        )}
      </div>

      <div className={`rc-stage rg-stage rg-stage--${c.stage}`} ref={stage} aria-label={`Selected screens from ${c.title}`}>
        {c.hero.map((it, i) => (
          <figure key={it.src} className={`rc-hs rc-hs--${i}`}>
            <Shot item={it} eager={i < 2} />
          </figure>
        ))}
      </div>

      <dl className="rc-facts">
        {c.facts.map(([k, v]) => (
          <div key={k} data-rv>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function CaseOverview({ c }) {
  const letter = useRef(null)
  useTrack(letter, { mode: 'view', ease: 0.14, rest: 0.6 })
  const { p } = c
  const snap = p.snapshot
  return (
    <section id="overview" className="rc-sec rc-over" aria-label="Overview">
      <article className="rd-letter rc-letter" ref={letter}>
        <p className="rd-letter__from">
          Overview
          <span>{snap.type}</span>
        </p>
        <p>{p.overview}</p>
        <p>
          <b className="rc-letter__k">My contribution</b>
          {p.contribution}
        </p>
        <dl className="rd-letter__facts">
          {[
            ['Project', snap.project],
            ['Timeline', snap.timeline],
            ['Impact', snap.impact],
          ].map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        {snap.note && <p className="rg-letter-note">{snap.note}</p>}
      </article>
    </section>
  )
}

export function CaseEnd() {
  return (
    <nav className="rc-end" aria-label="Case study navigation" data-rv>
      <Link className="rc-end__a" to="/">
        <span>Back</span>
        <strong>All work</strong>
      </Link>
      <a className="rc-end__a" href={`mailto:${SITE.email}`}>
        <span>Say hello</span>
        <strong>{SITE.email}</strong>
      </a>
      <a className="rc-end__a" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
        <span>Resume</span>
        <strong>
          PDF <Arrow />
        </strong>
      </a>
    </nav>
  )
}

/* ───────────── small blocks ───────────── */
const Pains = ({ m }) => (
  <ol className="rc-pains">
    {m.items.map((it, i) => (
      <li key={it.pain} data-rv>
        <span className="rc-pains__n">{pad(i + 1)}</span>
        <h3>{it.pain}</h3>
        <p>
          <b>{m.responseLabel}</b>
          {it.opportunity}
        </p>
      </li>
    ))}
  </ol>
)

const Princ = ({ items }) => (
  <ol className="rc-princ">
    {items.map((it, i) => (
      <li key={it.title} data-rv>
        <span>{pad(i + 1)}</span>
        <h3>{it.title}</h3>
        <p>{it.description}</p>
      </li>
    ))}
  </ol>
)

/** Alternating text / picture rows (feature-cards with images, design-response) */
function Rows({ rows }) {
  return (
    <ul className="rc-resp">
      {rows.map((r, i) => (
        <li key={r.title || r.finding} data-rv>
          <div className="rc-resp__t">
            <p className="rc-resp__f">
              {r.label && <b>{r.label}</b>}
              {r.title}
            </p>
            <p className="rc-resp__r">
              {r.rlabel && <b>{r.rlabel}</b>}
              {r.text}
            </p>
          </div>
          <Shot item={r.item} eager={i === 0} />
        </li>
      ))}
    </ul>
  )
}

function Competitors({ m }) {
  return (
    <>
      {m.image && (
        <div className="rc-wide">
          <Figure item={still(m.image.src, { alt: m.image.alt, cap: m.image.caption })} />
        </div>
      )}
      <ul className="rg-comp" style={{ '--cols': Math.min(m.items.length, 3) }}>
        {m.items.map((it) => (
          <li key={it.name} data-rv>
            <h3>{it.name}</h3>
            <ul>
              {it.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  )
}

const Observations = ({ items }) => (
  <ul className="rg-obs">
    {items.map((it, i) => (
      <li key={it.id} data-rv style={{ '--d': `${(i % 3) * 70}ms` }}>
        <span>{it.id}</span>
        <h3>{it.title}</h3>
        <blockquote>{it.quote}</blockquote>
      </li>
    ))}
  </ul>
)

const Interviews = ({ items }) => (
  <ul className="rg-int">
    {items.map((it) => (
      <li key={it.name} data-rv>
        <header>
          <h3>{it.name}</h3>
          <p>{it.role}</p>
          {it.tags?.length > 0 && (
            <ul>
              {it.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
        </header>
        <div>
          {it.prompt && <p className="rg-int__p">{it.prompt}</p>}
          <blockquote>{it.quote}</blockquote>
          {it.gap && (
            <p className="rg-int__g">
              <b>System gap</b>
              {it.gap}
            </p>
          )}
        </div>
      </li>
    ))}
  </ul>
)

function Ecosystem({ m }) {
  return (
    <div className="rg-eco">
      {[m.wearable, m.app].map((col, ci) => (
        <section key={col.title} className="rg-eco__col" data-rv style={{ '--d': `${ci * 90}ms`, '--r': `${ci ? 0.8 : -0.8}deg` }}>
          <p className="rg-eco__k">{col.label}</p>
          <h3>{col.title}</h3>
          <p className="rg-eco__s">{col.summary}</p>
          <ol>
            {col.layers.map((l) => (
              <li key={l.title}>
                <b>{l.title}</b>
                <p>{l.description}</p>
                {l.details?.length > 0 && (
                  <ul>
                    {l.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  )
}

/** Phone screens, grouped as in the published case study */
function PhoneGroups({ m }) {
  return (
    <div className="rg-phones">
      {m.groups.map((g) => (
        <section key={g.id} className="rg-phones__g" aria-label={g.title}>
          <h3 data-rv>{g.title}</h3>
          <ul style={{ '--n': Math.min(g.screens.length, 4) }}>
            {g.screens.map((s, i) => (
              <li key={s.id} data-rv style={{ '--d': `${i * 70}ms` }}>
                <Shot item={still(s.src, { alt: s.alt, cap: s.title })} className="rg-phone" />
                <p className="rg-phones__t">
                  <span>{pad(i + 1)}</span>
                  {s.title}
                </p>
                <p className="rg-phones__d">{s.description}</p>
                {s.features?.length > 0 && (
                  <ul className="rg-phones__f">
                    {s.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

/** Final UI with numbered pins; the list under the picture names each pin */
function Annotated({ m }) {
  return (
    <div className="rg-ann">
      {m.groups.map((g) => {
        const item = still(g.src, { alt: g.alt, cap: g.title })
        const notes = g.annotations || []
        return (
          <figure key={g.title} className="rg-ann__g" data-rv>
            <div className="rg-ann__img">
              <Shot item={item} />
              {notes.map((a, i) => (
                <span key={a.label} className="rg-dot" aria-hidden="true" style={{ left: a.x, top: a.y }}>
                  {i + 1}
                </span>
              ))}
            </div>
            <figcaption>
              <h3>{g.title}</h3>
              <p>{g.caption}</p>
              {notes.length > 0 && (
                <ol>
                  {notes.map((a, i) => (
                    <li key={a.label}>
                      <b>{i + 1}</b>
                      {a.label}
                    </li>
                  ))}
                </ol>
              )}
            </figcaption>
          </figure>
        )
      })}
    </div>
  )
}

/* ───────────── pinned reel (same mechanism as the homepage and the SoC page) ───────────── */
function Reel({ cards, label }) {
  const secRef = useRef(null)
  const view = useRef(null)
  const track = useRef(null)
  useTrack(secRef, { mode: 'pin', ease: 0.12, rest: 0 })

  useEffect(() => {
    const s = secRef.current
    const t = track.current
    const v = view.current
    if (!s || !t || !v) return undefined
    const measure = () => s.style.setProperty('--dx', `${Math.max(0, t.scrollWidth - v.clientWidth)}px`)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(t)
    ro.observe(v)
    return () => ro.disconnect()
  }, [])

  const onFocus = (e) => {
    const li = e.target.closest('li')
    const s = secRef.current
    const v = view.current
    if (!li || !s || !v || window.matchMedia('(max-width: 800px), (prefers-reduced-motion: reduce)').matches) return
    v.scrollLeft = 0
    const dx = parseFloat(getComputedStyle(s).getPropertyValue('--dx')) || 0
    const want = Math.min(dx, Math.max(0, li.offsetLeft - v.clientWidth * 0.18))
    window.scrollTo({ top: s.getBoundingClientRect().top + window.scrollY + want, behavior: 'auto' })
  }

  const R = [-1.6, 1.2, -0.8, 1.6, -1.2, 0.9, -1, 1.4]
  const Y = ['0px', '26px', '-12px', '20px', '-4px', '30px', '-8px', '22px']
  return (
    <div ref={secRef} className="rd-reel rc-flow" aria-label={label}>
      <div className="rd-reel__pin">
        <div className="rd-reel__view" ref={view}>
          <ul className="rd-reel__track" ref={track} onFocus={onFocus}>
            {cards.map((f, i) => (
              <li key={f.key} className="rd-reel__card" style={{ '--r': `${R[i % R.length]}deg`, '--y': Y[i % Y.length], '--ar': ratio(f.item) }}>
                <div className={f.phone ? 'rg-pair' : f.strip ? 'rg-pair rg-pair--strip' : undefined}>
                  <Shot item={f.item} eager={i < 2} />
                  {f.phone && <Shot item={f.phone} className="rg-pair__ph" />}
                  {f.strip && <Shot item={f.strip} className="rg-pair__ph rg-pair__strip" />}
                </div>
                <p className="rc-flow__t">
                  <span>{pad(i + 1)}</span>
                  {f.title}
                </p>
                <p className="rc-flow__d">
                  {f.desc}
                  {f.extra && <em className="rg-extra">{f.extra}</em>}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

const iviCards = (m) =>
  m.screens.map((s) =>
    s.src
      ? { key: s.id, item: still(s.src, { alt: s.alt, cap: s.title }), title: s.title, desc: s.description, extra: s.alertLabel }
      : {
          // driver display + center display shown together
          key: s.id,
          item: still(s.center, { alt: s.centerAlt, cap: `${s.title} · center display` }),
          strip: still(s.driver, { alt: s.driverAlt, cap: `${s.title} · driver display` }),
          title: s.title,
          desc: s.description,
        },
  )

const commerceCards = (m) =>
  m.screens.map((s) => ({
    key: s.id,
    item: still(s.desktop.src, { alt: s.desktop.alt, cap: `${s.title} · desktop` }),
    phone: s.mobile ? still(s.mobile.src, { alt: s.mobile.alt, cap: `${s.title} · mobile` }) : undefined,
    title: s.title,
    desc: s.description,
  }))

/* ───────────── module switch ───────────── */
function Module({ m, sec, c }) {
  switch (m.type) {
    case 'brief-cards':
    case 'method-cards':
      return c.list?.[sec.id] === 'numbered' ? <Princ items={m.items} /> : <Notes items={m.items} cols={colsFor(m.items.length)} />
    case 'feature-cards':
      return m.items.some((i) => i.image) ? (
        <Rows rows={m.items.map((i) => ({ title: i.title, text: i.description, item: still(i.image.src, { alt: i.image.alt, cap: i.title }) }))} />
      ) : (
        <Notes items={m.items} cols={colsFor(m.items.length)} />
      )
    case 'design-response':
      return (
        <Rows
          rows={m.items.map((i) => ({
            title: i.finding,
            label: 'Finding',
            text: i.response,
            rlabel: 'Design response',
            item: still(i.image.src, { alt: i.image.alt, cap: i.finding }),
          }))}
        />
      )
    case 'media':
      return (
        <div className="rc-wide">
          <Figure item={still(m.src, { alt: m.alt, cap: m.caption })} />
        </div>
      )
    case 'video':
      return (
        <div className="rc-wide">
          <Figure item={{ ...ECHOES_CLIP, alt: m.alt, cap: m.caption }} />
        </div>
      )
    case 'stat-cards':
      return <Stats items={m.items} note={m.note} wide={m.items.length >= 4} />
    case 'insight-cards':
      return <Insights items={m.items} />
    case 'pain-cards':
      return <Pains m={m} />
    case 'decision-matrix':
      return <Table columns={m.columns} rows={m.rows} />
    case 'competitor-cards':
      return <Competitors m={m} />
    case 'observation-cards':
      return <Observations items={m.items} />
    case 'interview-cards':
      return <Interviews items={m.items} />
    case 'ecosystem-split':
      return <Ecosystem m={m} />
    case 'iphone-showcase':
      return <PhoneGroups m={m} />
    case 'ivi-showcase':
      return <Reel cards={iviCards(m)} label={`${m.screens.length} screens from the prototype`} />
    case 'commerce-showcase':
      return <Reel cards={commerceCards(m)} label={`${m.screens.length} screens, desktop and mobile`} />
    case 'annotated-gallery':
      return <Annotated m={m} />
    default:
      return null // 'todo' and anything not shown on the published page
  }
}

const hasReel = (s) => s.modules?.some((m) => m.type === 'ivi-showcase' || m.type === 'commerce-showcase')

export function CaseSections({ c }) {
  const secs = c.p.sections
  const last = secs.length - 1
  return secs.map((s, i) => {
    const multi = s.content.length > 1
    return (
      <Sec
        key={s.id}
        id={s.id}
        n={i + 1}
        total={secs.length}
        title={c.retitle?.[s.id] || s.title}
        lead={multi ? undefined : s.content[0]}
        className={[hasReel(s) ? 'rc-sec--reel' : '', i === last ? 'rc-sec--last' : ''].join(' ')}
      >
        {multi && (
          <ol className="rg-reflect">
            {s.content.map((t, k) => (
              <li key={t} data-rv style={{ '--d': `${k * 80}ms` }}>
                <span>{pad(k + 1)}</span>
                {t}
              </li>
            ))}
          </ol>
        )}
        {(s.modules || []).map((m, k) => (
          <Module key={k} m={m} sec={s} c={c} />
        ))}
        {i === last && <CaseEnd />}
      </Sec>
    )
  })
}

