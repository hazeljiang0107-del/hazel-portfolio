import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { assets, SOURCES } from '../../data/luminipetPreviewAssets'
import { useReview } from './ReviewContext'

const LightboxCtx = createContext({ open: () => {} })
export const useLightbox = () => useContext(LightboxCtx)

/**
 * Click-to-enlarge using the native <dialog>: Escape closes, focus is trapped
 * while open and returns to the thumbnail that opened it.
 */
export function LightboxProvider({ children }) {
  const dialogRef = useRef(null)
  const [id, setId] = useState(null)
  const { show: showReview } = useReview()

  const open = useCallback((assetId) => {
    setId(assetId)
  }, [])

  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (id && !d.open) {
      d.showModal()
      document.documentElement.style.overflow = 'hidden'
    }
    if (!id) document.documentElement.style.overflow = ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [id])

  const close = () => dialogRef.current?.close()
  const asset = id ? assets[id] : null

  return (
    <LightboxCtx.Provider value={{ open }}>
      {children}
      <dialog
        ref={dialogRef}
        className="lpv-lightbox"
        aria-label={asset ? `Enlarged screenshot: ${asset.caption}` : 'Enlarged screenshot'}
        onClose={() => setId(null)}
        onClick={(e) => {
          if (!e.target.closest('img, button')) close()
        }}
      >
        {asset && (
          <div className="lpv-lightbox__body">
            <button type="button" className="lpv-lightbox__close" onClick={close} autoFocus>
              Close <span aria-hidden="true">· Esc</span>
            </button>
            <img src={asset.src} width={asset.width} height={asset.height} alt={asset.alt} />
            <p className="lpv-lightbox__cap">
              {asset.caption}
              {showReview && asset.source && (
                <span className="lpv-lightbox__src"> · {SOURCES[asset.source].short} · {asset.page}</span>
              )}
            </p>
          </div>
        )}
      </dialog>
    </LightboxCtx.Provider>
  )
}
