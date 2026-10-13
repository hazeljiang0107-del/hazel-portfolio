import { useEffect, useRef } from 'react'
import { useReduced } from '../redesign/scrollFx'

/**
 * A red cursor that trails the pointer and names what a click will do ("flip", "view",
 * "open"). Mouse-only and off for reduced motion; the real cursor is never hidden.
 */
export function MgCursor() {
  const el = useRef(null)
  const txt = useRef(null)
  const reduce = useReduced()

  useEffect(() => {
    const node = el.current
    if (!node || reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined
    let x = 0
    let y = 0
    let tx = 0
    let ty = 0
    let raf = 0
    const loop = () => {
      x += (tx - x) * 0.24
      y += (ty - y) * 0.24
      node.style.transform = `translate3d(${x}px, ${y}px, 0)`
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(loop) : 0
    }
    const move = (e) => {
      if (e.pointerType !== 'mouse') return
      tx = e.clientX
      ty = e.clientY
      if (!node.classList.contains('is-on')) {
        x = tx
        y = ty
        node.classList.add('is-on')
      }
      if (!raf) raf = requestAnimationFrame(loop)
    }
    const over = (e) => {
      const t = e.target instanceof Element ? e.target.closest('[data-cursor], .rd-media--btn, .rd-media__open, a, button') : null
      let label = ''
      if (t) {
        if (t.dataset.cursor) label = t.dataset.cursor
        else if (t.matches('.rd-media--btn, .rd-media__open')) label = 'view'
      }
      if (txt.current) txt.current.textContent = label
      node.dataset.s = label ? 'label' : t ? 'link' : 'idle'
    }
    const leave = () => node.classList.remove('is-on')
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('pointerleave', leave)
      cancelAnimationFrame(raf)
    }
  }, [reduce])

  return (
    <div className="mg-cur" ref={el} data-s="idle" aria-hidden="true">
      <span ref={txt} />
    </div>
  )
}
