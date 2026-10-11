import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

const Ctx = createContext({ open: () => {} })
export const useLightbox = () => useContext(Ctx)

/**
 * Click-to-enlarge on the native <dialog>: Escape closes, focus is trapped while open and
 * returns to the opener. The backdrop is a blurred scrim so the page stays legible behind.
 */
export function LightboxProvider({ children, dark = false }) {
  const ref = useRef(null)
  const [item, setItem] = useState(null)

  const open = useCallback((it) => setItem(it), [])

  useEffect(() => {
    const d = ref.current
    if (!d) return undefined
    if (item && !d.open) d.showModal()
    document.documentElement.style.overflow = item ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [item])

  const close = () => ref.current?.close()

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <dialog
        ref={ref}
        className={`pp-lightbox${dark ? ' pp-lightbox--dark' : ''}`}
        aria-label={item ? `Enlarged: ${item.caption || item.alt}` : 'Enlarged image'}
        onClose={() => setItem(null)}
        onClick={(e) => {
          if (!e.target.closest('img, video, button')) close()
        }}
      >
        {item && (
          <div className="pp-lightbox__body">
            <button type="button" className="pp-lightbox__close" onClick={close} autoFocus>
              Close <span aria-hidden="true">· Esc</span>
            </button>
            {item.video ? (
              <video
                src={item.src}
                poster={item.poster}
                width={item.width}
                height={item.height}
                aria-label={item.alt}
                autoPlay
                loop
                muted
                playsInline
                controls
              />
            ) : (
              <img src={item.src} width={item.width} height={item.height} alt={item.alt} />
            )}
            {item.caption && <p className="pp-lightbox__cap">{item.caption}</p>}
          </div>
        )}
      </dialog>
    </Ctx.Provider>
  )
}
