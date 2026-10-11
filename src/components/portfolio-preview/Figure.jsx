import { useState } from 'react'
import { useLightbox } from './Lightbox'
import { useNotes } from './notes'
import { EVIDENCE_LABEL } from '../../data/portfolioPreview'

/** Clearly labeled stand-in for a missing file. Never an unrelated image. */
export function Missing({ item }) {
  return (
    <div className="pp-missing" style={{ aspectRatio: `${item.width} / ${item.height}` }} role="img" aria-label={item.alt}>
      <span>Media needed</span>
      <code>{item.src}</code>
    </div>
  )
}

/**
 * One image. Click (or Enter / Space) opens the lightbox, which is the touch and keyboard
 * equivalent of any hover affordance. Width/height are always set, so layout never shifts.
 */
export default function Figure({
  item,
  className = '',
  zoom = true,
  priority = false,
  sizes,
  caption = false,
  label,
  children,
}) {
  const [failed, setFailed] = useState(false)
  const { open } = useLightbox()
  const { show } = useNotes()

  const body = failed ? (
    <Missing item={item} />
  ) : (
    <img
      src={item.src}
      width={item.width}
      height={item.height}
      sizes={sizes}
      alt={item.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
      onError={() => setFailed(true)}
    />
  )

  return (
    <figure className={`pp-fig ${className}`}>
      <div className="pp-fig__frame">
        {zoom && !failed ? (
          <button
            type="button"
            className="pp-fig__btn"
            onClick={() => open(item)}
            aria-haspopup="dialog"
            aria-label={`Enlarge: ${item.caption || item.alt}`}
          >
            {body}
          </button>
        ) : (
          body
        )}
        {children}
        {show && item.evidence && (
          <span className="pp-evidence">
            {label || EVIDENCE_LABEL[item.evidence] || item.evidence}
          </span>
        )}
      </div>
      {caption && item.caption && <figcaption className="pp-cap-text">{item.caption}</figcaption>}
    </figure>
  )
}
