import { Link } from 'react-router-dom'
import { Arrow } from '../redesign/ui'
import { HAND } from '../../data/magazine'
import { Hand } from './paper'
import { useNote, noteFor } from './Note'

const Pencil = () => (
  <svg viewBox="0 0 14 14" width="13" height="13" aria-hidden="true">
    <path d="M1.5 12.5l.8-3.4 7.6-7.6a1.4 1.4 0 0 1 2 0l.6.6a1.4 1.4 0 0 1 0 2L4.9 11.7z" fill="none" stroke="currentColor" strokeWidth="1.2" />
  </svg>
)

/**
 * Magazine chapter header. Replaces the plain `ChapterHead` (through HeadCtx) so the six
 * existing chapter layouts keep working. The long "my part" paragraph moves into a clipped
 * note; the header keeps one scribble, the dek and two actions.
 */
export function MgHead({ c, total = 6 }) {
  const { open } = useNote()
  return (
    <header className="rd-head mg-head">
      <div className="rd-head__l" data-rv>
        <p className="mg-folio">
          <b>Feature {c.n}</b> / {String(total).padStart(2, '0')}
        </p>
        <h2 className="rd-head__t" id={`${c.id}-t`}>
          {c.title}
        </h2>
        <p className="rd-head__s">{c.line}</p>
        <Hand className="mg-head__hand" rot={-4} arrow>
          {HAND[c.id]}
        </Hand>
      </div>
      <div className="rd-head__r" data-rv style={{ '--d': '90ms' }}>
        <p className="rd-head__meta">
          {c.role} · {c.when}
        </p>
        <p className="rd-head__links">
          <button type="button" className="mg-pill" data-cursor="open" aria-haspopup="dialog" onClick={() => open(noteFor(c))}>
            My part <Pencil />
          </button>
          {c.links.map((l) => (
            <Link key={l.to} className="rd-link" to={l.to}>
              {l.label} <Arrow />
            </Link>
          ))}
        </p>
      </div>
    </header>
  )
}
