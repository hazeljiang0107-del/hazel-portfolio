import { Link } from 'react-router-dom'
import { Arrow } from '../redesign/ui'
import { HAND } from '../../data/magazine'
import { Hand } from './paper'

/**
 * Magazine chapter header. The action goes straight to the case study.
 */
export function MgHead({ c, total = 6 }) {
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
          {c.links.map((l) => (
            <Link key={l.to} className="mg-pill" to={l.to}>
              {l.label} <Arrow />
            </Link>
          ))}
        </p>
      </div>
    </header>
  )
}
