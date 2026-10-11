import { useState } from 'react'
import { assets, EVIDENCE, SOURCES } from '../../data/luminipetPreviewAssets'
import { useLightbox } from './Lightbox'
import { useReview } from './ReviewContext'

export function EvidenceBadge({ asset }) {
  const { show } = useReview()
  if (!show || !asset?.evidence) return null
  const e = EVIDENCE[asset.evidence]
  return (
    <span className={`lpv-badge lpv-badge--${e.tone}`}>
      {e.label}
      {asset.source ? ` · ${SOURCES[asset.source].short}` : ''}
    </span>
  )
}

/** Clearly labeled stand-in. Never an image, never silently empty. */
export function Placeholder({ asset }) {
  const { show } = useReview()
  return (
    <div
      className="lpv-placeholder"
      style={{ aspectRatio: asset.aspect || '16 / 9' }}
      role="img"
      aria-label={asset.alt}
    >
      <p className="lpv-placeholder__tag">Placeholder · screenshot needed</p>
      {show && asset.needed && <p className="lpv-placeholder__need">{asset.needed}</p>}
    </div>
  )
}

/**
 * One screenshot, click-to-enlarge. If the file is missing or fails to load,
 * it degrades to a labeled placeholder instead of a broken-image icon.
 */
export default function Shot({
  id,
  caption = true,
  priority = false,
  className = '',
  imgClassName = '',
  sizes,
  children,
}) {
  const asset = assets[id]
  const [failed, setFailed] = useState(false)
  const { open } = useLightbox()
  const { show } = useReview()

  if (!asset) return null
  if (asset.placeholder || failed) {
    const ph = asset.placeholder
      ? asset
      : { ...asset, needed: `File not found: ${asset.src}`, aspect: `${asset.width} / ${asset.height}` }
    return (
      <figure className={`lpv-shot ${className}`}>
        <Placeholder asset={ph} />
        {caption && <figcaption className="lpv-cap">{asset.caption}</figcaption>}
      </figure>
    )
  }

  return (
    <figure className={`lpv-shot ${className}`}>
      <div className="lpv-shot__frame">
        <button type="button" className="lpv-shot__btn" onClick={() => open(id)} aria-haspopup="dialog">
          <img
            className={imgClassName}
            src={asset.src}
            width={asset.width}
            height={asset.height}
            sizes={sizes}
            alt={asset.alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => setFailed(true)}
          />
          <span className="lpv-sr">Enlarge image</span>
          <span className="lpv-shot__hint" aria-hidden="true">
            Enlarge
          </span>
        </button>
        {children}
      </div>
      {caption && (
        <figcaption className="lpv-cap">
          {asset.caption}
          {show && (
            <span className="lpv-cap__meta">
              {' '}
              · {SOURCES[asset.source].short} · {asset.viewport}
              {asset.evidence === 'candidate' && ' · needs your confirmation'}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  )
}
