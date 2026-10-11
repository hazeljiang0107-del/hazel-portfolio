import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReduced } from './scrollFx'

/* ───────────── Lightbox (native <dialog>: Esc closes, focus trapped, returns to opener) ───────────── */
const LbCtx = createContext({ open: () => {} })
export const useLightbox = () => useContext(LbCtx)

export function LightboxProvider({ children }) {
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
    <LbCtx.Provider value={{ open }}>
      {children}
      <dialog
        ref={ref}
        className="rd-lb"
        aria-label={item ? `Enlarged: ${item.cap || item.alt}` : 'Enlarged media'}
        onClose={() => setItem(null)}
        onClick={(e) => {
          if (!e.target.closest('img, video, button')) close()
        }}
      >
        {item && (
          <div className={`rd-lb__body${item.tall ? ' is-tall' : ''}`}>
            <button type="button" className="rd-lb__x" onClick={close} autoFocus>
              Close <span aria-hidden="true">· Esc</span>
            </button>
            {item.kind === 'video' ? (
              <video src={item.src} poster={item.poster} width={item.width} height={item.height} aria-label={item.alt} autoPlay loop muted playsInline controls />
            ) : (
              <img src={item.full || item.src} width={item.width} height={item.height} alt={item.alt} />
            )}
            {item.cap && (
              <p className="rd-lb__cap">
                {item.cap}
                {item.tag && <em>{item.tag}</em>}
              </p>
            )}
          </div>
        )}
      </dialog>
    </LbCtx.Provider>
  )
}

/* ───────────── Media ───────────── */
const ZoomIcon = () => (
  <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
    <path d="M1.5 4.5v-3h3M10.5 7.5v3h-3M1.5 1.5l3.5 3.5M10.5 10.5 7 7" fill="none" stroke="currentColor" strokeWidth="1.4" />
  </svg>
)

/** A still. The whole picture is a button: click / Enter / Space enlarges it. */
export function Shot({ item, eager = false, className = '', fit }) {
  const { open } = useLightbox()
  return (
    <button
      type="button"
      className={`rd-media rd-media--btn${fit ? ' rd-media--fit' : ''} ${className}`}
      style={{ aspectRatio: fit ? undefined : `${item.width} / ${item.height}` }}
      aria-haspopup="dialog"
      aria-label={`Enlarge: ${item.cap}`}
      onClick={() => open(item)}
    >
      <img src={item.src} width={item.width} height={item.height} alt={item.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      <span className="rd-media__zoom" aria-hidden="true">
        <ZoomIcon />
      </span>
    </button>
  )
}

/** Only one clip plays at a time. */
const playing = new Set()

/**
 * Silent looping clip. Downloads when within ~400 px of the viewport, plays only while ≥ 40%
 * visible, pauses offscreen / in background tabs, and never autoplays under reduced motion
 * (the Play button still works). Clicking the picture enlarges it.
 */
export function Clip({ item, className = '', fit }) {
  const { open } = useLightbox()
  const wrap = useRef(null)
  const vid = useRef(null)
  const visible = useRef(false)
  const userPaused = useRef(false)
  const reduce = useReduced()
  const [src, setSrc] = useState(null)
  const [on, setOn] = useState(false)
  const [started, setStarted] = useState(false)

  const tryPlay = useCallback(() => {
    const v = vid.current
    if (!v || !visible.current || userPaused.current || document.hidden) return
    playing.forEach((o) => o !== v && o.pause())
    v.play().catch(() => {})
  }, [])

  useEffect(() => {
    userPaused.current = reduce
    if (reduce) vid.current?.pause()
    else tryPlay()
  }, [reduce, tryPlay])

  useEffect(() => {
    if (src) tryPlay()
  }, [src, tryPlay])

  useEffect(() => {
    const el = wrap.current
    if (!el || typeof IntersectionObserver === 'undefined') return undefined
    const near = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSrc((s) => s || item.src)
          near.disconnect()
        }
      },
      { rootMargin: '400px 0px' },
    )
    const see = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting
        if (e.isIntersecting) tryPlay()
        else vid.current?.pause()
      },
      { threshold: 0.4 },
    )
    near.observe(el)
    see.observe(el)
    const onVis = () => (document.hidden ? vid.current?.pause() : tryPlay())
    document.addEventListener('visibilitychange', onVis)
    const v = vid.current
    return () => {
      near.disconnect()
      see.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      if (v) playing.delete(v)
    }
  }, [item.src, tryPlay])

  const toggle = () => {
    const v = vid.current
    if (!v) return
    if (v.paused) {
      userPaused.current = false
      setSrc((s) => s || item.src)
      playing.forEach((o) => o !== v && o.pause())
      v.play().catch(() => {})
    } else {
      userPaused.current = true
      v.pause()
    }
  }

  return (
    <div className={`rd-media rd-media--clip${fit ? ' rd-media--fit' : ''} ${className}`} ref={wrap} style={{ aspectRatio: fit ? undefined : `${item.width} / ${item.height}` }}>
      <video
        ref={vid}
        src={src || undefined}
        poster={item.poster}
        width={item.width}
        height={item.height}
        muted
        loop
        playsInline
        preload="none"
        aria-label={item.alt}
        onPlay={(e) => {
          playing.add(e.currentTarget)
          setOn(true)
          setStarted(true)
        }}
        onPause={(e) => {
          playing.delete(e.currentTarget)
          setOn(false)
        }}
        onLoadedData={tryPlay}
      />
      {item.poster && <img className={`rd-media__poster${started ? ' is-gone' : ''}`} src={item.poster} width={item.width} height={item.height} alt="" aria-hidden="true" loading="lazy" decoding="async" />}
      <button
        type="button"
        className="rd-media__open"
        aria-haspopup="dialog"
        aria-label={`Enlarge video: ${item.cap}`}
        onClick={() => {
          vid.current?.pause()
          open(item)
        }}
      />
      <button type="button" className="rd-media__pp" onClick={toggle} aria-label={on ? 'Pause video' : 'Play video'}>
        {on ? (
          <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true">
            <path d="M2.5 1.5h2.6v9H2.5zM6.9 1.5h2.6v9H6.9z" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true">
            <path d="M2.5 1.2v9.6L10.5 6z" fill="currentColor" />
          </svg>
        )}
      </button>
      <span className="rd-media__zoom" aria-hidden="true">
        <ZoomIcon />
      </span>
    </div>
  )
}

export const Media = ({ item, ...p }) => (item.kind === 'video' ? <Clip item={item} {...p} /> : <Shot item={item} {...p} />)

/* ───────────── Small pieces ───────────── */
export const Arrow = () => (
  <svg className="rd-arrow" viewBox="0 0 12 12" width="11" height="11" aria-hidden="true">
    <path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" strokeWidth="1.3" />
  </svg>
)

export function Caption({ item, className = '' }) {
  return (
    <p className={`rd-cap ${className}`}>
      <span>{item.cap}</span>
      {item.tag && <em>{item.tag}</em>}
    </p>
  )
}

/** Shared chapter header: number, big condensed title, one line, meta, my part, links. */
export function ChapterHead({ c, total = 6 }) {
  return (
    <header className="rd-head">
      <div className="rd-head__l" data-rv>
        <p className="rd-head__n">
          {c.n} / {String(total).padStart(2, '0')}
        </p>
        <h2 className="rd-head__t" id={`${c.id}-t`}>
          {c.title}
        </h2>
        <p className="rd-head__s">{c.line}</p>
      </div>
      <div className="rd-head__r" data-rv style={{ '--d': '90ms' }}>
        <p className="rd-head__meta">
          {c.role} · {c.when}
        </p>
        <p className="rd-head__mine">
          <b>My part</b>
          {c.mine}
        </p>
        <p className="rd-head__links">
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
