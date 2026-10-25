import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { CHAPTERS, COVERS } from '../../data/magazine'
import { Arrow } from '../redesign/ui'
import { Hand, Tape, useInView } from './paper'

const ROT = [-2.4, 1.8, -1.2, 2.2, -1.8, 1.4]
const TAPE = ['kraft', 'red', 'kraft', 'kraft', 'red', 'kraft']

/** One project card. The picture and title are the link; nothing has to flip before it opens. */
function Postcard({ c, i }) {
  const cover = COVERS[c.id]
  const root = useRef(null)
  const seen = useInView(root, { threshold: 0.18 })
  const short = c.title.replace(/ Redesign$| Shopify Theme System$/, '')

  return (
    <li ref={root} className={`mg-pc${seen ? ' is-in' : ''}`} style={{ '--r': `${ROT[i % ROT.length]}deg`, '--k': i % 2 }}>
      <Link className="mg-pc__card" to={c.links[0].to} data-cursor="go">
        <span className="mg-pc__pic">
          <img src={cover.src} width={cover.w} height={cover.h} alt="" loading="lazy" decoding="async" />
        </span>
        <span className="mg-pc__cap">
          <b>{c.n}</b>
          <span>{short}</span>
          <em>{c.role}</em>
        </span>
        <Tape rot={ROT[i % ROT.length] * -2} tone={TAPE[i % TAPE.length]} className="mg-pc__tape" />
      </Link>
    </li>
  )
}

export function PostcardWall({ chapters = CHAPTERS }) {
  const rest = CHAPTERS.length - chapters.length
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
          open one
        </Hand>
        {rest > 0 && (
          <p className="mg-wall__more">
            <Link className="rd-link" to="/work">
              All work <Arrow />
            </Link>
          </p>
        )}
      </header>
      <ul className="mg-wall__list">
        {chapters.map((c, i) => (
          <Postcard key={c.id} c={c} i={i} />
        ))}
      </ul>
    </section>
  )
}
