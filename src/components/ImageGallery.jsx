import { useEffect, useState } from 'react'

export default function ImageGallery({ images, accent }) {
  const [lightbox, setLightbox] = useState(null)
  const [index, setIndex] = useState(0)
  const accentColor = accent || 'var(--color-accent-warm)'

  const open = (img, i) => {
    setLightbox(img)
    setIndex(i)
  }

  const close = () => setLightbox(null)

  const go = (dir) => {
    const next = (index + dir + images.length) % images.length
    setIndex(next)
    setLightbox(images[next])
  }

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') {
        setIndex((i) => {
          const next = (i + 1) % images.length
          setLightbox(images[next])
          return next
        })
      }
      if (e.key === 'ArrowLeft') {
        setIndex((i) => {
          const next = (i - 1 + images.length) % images.length
          setLightbox(images[next])
          return next
        })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, images])

  return (
    <>
      <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => open(img, i)}
            className="group relative bg-base text-left transition hover:bg-surface/40"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="aspect-[4/3] w-full object-cover object-top transition duration-300 group-hover:opacity-90"
              loading="lazy"
            />
            <span
              className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
              style={{ backgroundColor: accentColor }}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-base/95 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          onClick={close}
        >
          <button
            type="button"
            className="absolute right-4 top-4 border border-line px-3 py-1.5 text-sm text-ink"
            onClick={close}
            aria-label="Close lightbox"
          >
            Close
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-4 top-1/2 -translate-y-1/2 border border-line px-3 py-2 text-ink"
                onClick={(e) => {
                  e.stopPropagation()
                  go(-1)
                }}
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 border border-line px-3 py-2 text-ink"
                onClick={(e) => {
                  e.stopPropagation()
                  go(1)
                }}
                aria-label="Next image"
              >
                →
              </button>
            </>
          )}
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-h-[85vh] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-4 left-4 right-4 text-center text-sm text-ink-muted">
            {lightbox.alt}
          </p>
        </div>
      )}
    </>
  )
}
