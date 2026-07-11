import { useState } from 'react'

export default function ProjectThumbnail({
  src,
  alt,
  accent,
  title,
  compact = false,
  contain = false,
  className = '',
  hoverScale = true,
}) {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (!src || error) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-surface px-4 text-center ${className}`}
        style={accent ? { borderLeft: `2px solid ${accent}44` } : undefined}
      >
        <span className="text-label">Image pending</span>
        <span className="max-w-[200px] text-sm text-ink-secondary">{title}</span>
        <span className="text-[10px] text-ink-muted">TODO: Export thumbnail</span>
      </div>
    )
  }

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {!loaded && <div className="absolute inset-0 bg-surface" aria-hidden="true" />}
      <img
        src={src}
        alt={alt || `${title} preview`}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full ${
          contain ? 'object-contain object-center' : 'object-cover object-top'
        } ${
          hoverScale ? 'transition duration-500 ease-out group-hover:scale-[1.02]' : ''
        } ${compact && !contain ? 'object-center' : ''} ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
      />
    </div>
  )
}
