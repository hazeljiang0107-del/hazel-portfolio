import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Tape } from './paper'

const NoteCtx = createContext({ open: () => {} })
export const useNote = () => useContext(NoteCtx)

const Clip = () => (
  <svg className="mg-note__clip" viewBox="0 0 40 110" aria-hidden="true">
    <path
      d="M12 70V26a10 10 0 0 1 20 0v62a15 15 0 0 1-30 0V30"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.4"
      strokeLinecap="round"
      transform="translate(3 3)"
    />
  </svg>
)

/**
 * "Clipped note" takeaway. A native <dialog>, so Esc closes it, focus is trapped and the page
 * behind is inert; the paper, paperclip and tape are pure CSS/SVG.
 */
export function NoteProvider({ children }) {
  const ref = useRef(null)
  const [item, setItem] = useState(null)
  const open = useCallback((it) => setItem(it), [])

  useEffect(() => {
    const d = ref.current
    if (d && item && !d.open) d.showModal()
    document.documentElement.style.overflow = item ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [item])

  const close = () => ref.current?.close()

  return (
    <NoteCtx.Provider value={{ open }}>
      {children}
      <dialog
        ref={ref}
        className="mg-note"
        aria-label={item ? `Takeaway: ${item.title}` : 'Takeaway'}
        onClose={() => setItem(null)}
        onClick={(e) => {
          if (e.target === ref.current) close()
        }}
      >
        {item && (
          <div className="mg-note__paper">
            <Clip />
            <Tape rot={7} tone="red" className="mg-note__tape" />
            <button type="button" className="mg-note__x" onClick={close} autoFocus>
              Close <span aria-hidden="true">· Esc</span>
            </button>
            <p className="mg-folio">{item.kicker}</p>
            <h3 className="mg-note__t">{item.title}</h3>
            <p className="mg-note__body">{item.body}</p>
            <p className="mg-note__meta">{item.meta}</p>
            {item.to && (
              <Link className="mg-note__go" to={item.to}>
                {item.cta} <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        )}
      </dialog>
    </NoteCtx.Provider>
  )
}

/** Build the note content for a chapter: only existing copy. */
export const noteFor = (c) => ({
  kicker: `My part · Feature ${c.n}`,
  title: c.title,
  body: c.mine,
  meta: `${c.role} · ${c.when}`,
  to: c.links?.[0]?.to,
  cta: c.links?.[0]?.label || 'Read case study',
})
