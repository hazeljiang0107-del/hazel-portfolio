import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CHAPTERS, COVERS, HAND, SITE } from '../../data/magazine'
import { useReduced } from '../redesign/scrollFx'
import { Hand, Stamp, Tape, useInView } from './paper'
import { useNote, noteFor } from './Note'

const ROT = [-2.4, 1.8, -1.2, 2.2, -1.8, 1.4]
const TAPE = ['kraft', 'red', 'kraft', 'kraft', 'red', 'kraft']

/**
 * One postcard. Front = the project picture in a paper border. Back = a handwritten line,
 * an address block (role, timeline), a postage stamp made from the same picture and a
 * postmark. Click / Enter flips it; the hidden face is `inert`, so keyboard and screen-reader
 * users only ever reach the face they can see.
 */
function Postcard({ c, i }) {
  const cover = COVERS[c.id]
  const reduce = useReduced()
  const { open } = useNote()
  const root = useRef(null)
  const tilt = useRef(null)
  const front = useRef(null)
  const back = useRef(null)
  const first = useRef(true)
  const raf = useRef(0)
  const [flipped, setFlipped] = useState(false)
  const seen = useInView(root, { threshold: 0.18 })

  // Move focus with the flip so the keyboard follows the visible face.
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    ;(flipped ? back : front).current?.focus({ preventScroll: true })
  }, [flipped])

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  // Pointer tilt (mouse only, never for reduced motion).
  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return
    const el = tilt.current
    if (!el) return
    const b = el.getBoundingClientRect()
    const x = (e.clientX - b.left) / b.width - 0.5
    const y = (e.clientY - b.top) / b.height - 0.5
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty('--rx', `${(-y * 9).toFixed(2)}deg`)
      el.style.setProperty('--ry', `${(x * 11).toFixed(2)}deg`)
    })
  }
  const onLeave = () => {
    cancelAnimationFrame(raf.current)
    tilt.current?.style.setProperty('--rx', '0deg')
    tilt.current?.style.setProperty('--ry', '0deg')
  }

  const short = c.title.replace(/ Redesign$| Shopify Theme System$/, '')

  return (
    <li
      ref={root}
      className={`mg-pc${seen ? ' is-in' : ''}${flipped ? ' is-flipped' : ''}`}
      style={{ '--r': `${ROT[i % ROT.length]}deg`, '--k': i % 2 }}
    >
      <div className="mg-pc__tilt" ref={tilt} onPointerMove={onMove} onPointerLeave={onLeave}>
        <div className="mg-pc__flip">
          {/* front */}
          <div className="mg-pc__face mg-pc__front" inert={flipped}>
            <button type="button" ref={front} className="mg-pc__hit" data-cursor="flip" aria-pressed={flipped} aria-label={`Flip postcard: ${c.title}`} onClick={() => setFlipped(true)}>
              <span className="mg-pc__pic">
                <img src={cover.src} width={cover.w} height={cover.h} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="mg-pc__cap">
                <b>{c.n}</b>
                <span>{short}</span>
                <em>flip ↻</em>
              </span>
            </button>
            <Tape rot={ROT[i % ROT.length] * -2} tone={TAPE[i % TAPE.length]} className="mg-pc__tape" />
          </div>

          {/* back */}
          <div className="mg-pc__face mg-pc__back" inert={!flipped}>
            <div className="mg-pc__msg">
              <p className="mg-pc__hand">{HAND[c.id]}</p>
              <p className="mg-pc__line">{c.line}</p>
              <p className="mg-pc__sign">— Hazel</p>
            </div>
            <div className="mg-pc__addr">
              <span className="mg-pc__post" aria-hidden="true">
                <img src={cover.src} alt="" width={cover.w} height={cover.h} loading="lazy" decoding="async" />
              </span>
              <Stamp text={`${SITE.name.toUpperCase()} · UX DESIGN · `} sub={c.n} size={78} rot={-14} className="mg-pc__mark" />
              <dl>
                <div>
                  <dt>Role</dt>
                  <dd>{c.role}</dd>
                </div>
                <div>
                  <dt>When</dt>
                  <dd>{c.when}</dd>
                </div>
              </dl>
              <p className="mg-pc__acts">
                <button type="button" className="mg-pc__btn" onClick={() => open(noteFor(c))} aria-haspopup="dialog">
                  My part
                </button>
                <Link className="mg-pc__btn mg-pc__btn--go" to={c.links[0].to}>
                  Read <span aria-hidden="true">→</span>
                </Link>
              </p>
            </div>
            <button type="button" ref={back} className="mg-pc__back-btn" onClick={() => setFlipped(false)} aria-label={`Flip postcard back: ${c.title}`}>
              ↺
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}

export function PostcardWall() {
  return (
    <section id="work" className="mg-wall" aria-labelledby="mg-wall-t">
      <header className="mg-wall__head">
        <p className="mg-folio">
          <b>The postbox</b>
        </p>
        <h2 id="mg-wall-t" className="mg-wall__t">
          Selected work, <span>as postcards</span>
        </h2>
        <Hand className="mg-wall__hand" rot={-5} arrow>
          flip one over
        </Hand>
      </header>
      <ul className="mg-wall__list">
        {CHAPTERS.map((c, i) => (
          <Postcard key={c.id} c={c} i={i} />
        ))}
      </ul>
    </section>
  )
}
