import { useEffect, useRef } from 'react'

/** Self-contained Perlin — adapted from motion-anything waves recipe */
class Grad {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  dot2(x, y) {
    return this.x * x + this.y * y
  }
}

class Noise {
  constructor(seed = 0) {
    this.grad3 = [
      new Grad(1, 1),
      new Grad(-1, 1),
      new Grad(1, -1),
      new Grad(-1, -1),
      new Grad(1, 0),
      new Grad(-1, 0),
      new Grad(1, 0),
      new Grad(-1, 0),
      new Grad(0, 1),
      new Grad(0, -1),
      new Grad(0, 1),
      new Grad(0, -1),
    ]
    this.p = [
      151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240,
      21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88,
      237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83,
      111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216,
      80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186,
      3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58,
      17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
      129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193,
      238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157,
      184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128,
      195, 78, 66, 215, 61, 156, 180,
    ]
    this.perm = new Array(512)
    this.gradP = new Array(512)
    this.seed(seed)
  }

  seed(seed) {
    if (seed > 0 && seed < 1) seed *= 65536
    seed = Math.floor(seed)
    if (seed < 256) seed |= seed << 8
    for (let i = 0; i < 256; i++) {
      const v = i & 1 ? this.p[i] ^ (seed & 255) : this.p[i] ^ ((seed >> 8) & 255)
      this.perm[i] = this.perm[i + 256] = v
      this.gradP[i] = this.gradP[i + 256] = this.grad3[v % 12]
    }
  }

  fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10)
  }

  lerp(a, b, t) {
    return (1 - t) * a + t * b
  }

  perlin2(x, y) {
    let X = Math.floor(x)
    let Y = Math.floor(y)
    x -= X
    y -= Y
    X &= 255
    Y &= 255
    const n00 = this.gradP[X + this.perm[Y]].dot2(x, y)
    const n01 = this.gradP[X + this.perm[Y + 1]].dot2(x, y - 1)
    const n10 = this.gradP[X + 1 + this.perm[Y]].dot2(x - 1, y)
    const n11 = this.gradP[X + 1 + this.perm[Y + 1]].dot2(x - 1, y - 1)
    const u = this.fade(x)
    return this.lerp(this.lerp(n00, n10, u), this.lerp(n01, n11, u), this.fade(y))
  }
}

const DESKTOP = {
  lineColor: 'rgba(178, 196, 202, 0.28)',
  waveSpeedX: 0.007,
  waveSpeedY: 0.0035,
  waveAmpX: 18,
  waveAmpY: 10,
  xGap: 14,
  yGap: 40,
  friction: 0.94,
  tension: 0.004,
  maxCursorMove: 40,
  cursorForce: 0.00032,
}

const MOBILE = {
  ...DESKTOP,
  lineColor: 'rgba(178, 196, 202, 0.1)',
  waveAmpX: 8,
  waveAmpY: 4,
  xGap: 18,
  yGap: 48,
  maxCursorMove: 0,
  cursorForce: 0,
}

function lerp(a, b, t) {
  return a + (b - a) * t
}

function clamp01(value) {
  return Math.max(0, Math.min(1, value))
}

function scaleRgbaAlpha(color, factor) {
  const match = color.match(/rgba?\(\s*([^)]+)\)/)
  if (!match) return color
  const parts = match[1].split(',').map((part) => part.trim())
  if (parts.length !== 4) return color
  const alpha = Math.max(0, parseFloat(parts[3]) * factor)
  return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${alpha})`
}

/** Scroll zones: hero 100% → about ~55% → positioning ~22% → work 0% */
function atmosphereFromProgress(progress) {
  if (progress <= 0.38) {
    return { opacity: 1, intensity: 1 }
  }
  if (progress <= 0.62) {
    const t = (progress - 0.38) / 0.24
    return { opacity: lerp(1, 0.55, t), intensity: lerp(1, 0.68, t) }
  }
  if (progress <= 0.88) {
    const t = (progress - 0.62) / 0.26
    return { opacity: lerp(0.55, 0.22, t), intensity: lerp(0.68, 0.38, t) }
  }
  const t = (progress - 0.88) / 0.12
  return {
    opacity: lerp(0.22, 0, t),
    intensity: lerp(0.38, 0, t),
  }
}

export default function HeroWaves({ className = '' }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobileQuery = window.matchMedia('(max-width: 767px)')
    const noise = new Noise(Math.random())

    let config = mobileQuery.matches ? MOBILE : DESKTOP
    let lines = []
    let width = 0
    let height = 0
    let frameId = 0
    let visible = true
    let scrollOpacity = 1
    let motionIntensity = 1
    let animate = !reducedMotion.matches && !mobileQuery.matches

    const mouse = {
      x: -10,
      y: 0,
      lx: 0,
      ly: 0,
      sx: 0,
      sy: 0,
      vs: 0,
      a: 0,
      set: false,
    }

    function setSize() {
      const rect = container.getBoundingClientRect()
      width = Math.max(1, Math.floor(rect.width))
      height = Math.max(1, Math.floor(rect.height))
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function setLines() {
      lines = []
      const { xGap, yGap } = config
      const oW = width + 200
      const oH = height + 30
      const totalLines = Math.ceil(oW / xGap)
      const totalPoints = Math.ceil(oH / yGap)
      const xStart = (width - xGap * totalLines) / 2
      const yStart = (height - yGap * totalPoints) / 2

      for (let i = 0; i <= totalLines; i++) {
        const pts = []
        for (let j = 0; j <= totalPoints; j++) {
          pts.push({
            x: xStart + xGap * i,
            y: yStart + yGap * j,
            wx: 0,
            wy: 0,
            cx: 0,
            cy: 0,
            cvx: 0,
            cvy: 0,
          })
        }
        lines.push(pts)
      }
    }

    function movePoints(time) {
      const { waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, friction, tension, maxCursorMove, cursorForce } =
        config
      const ampScale = motionIntensity
      const speedScale = lerp(0.55, 1, motionIntensity)
      const noiseScale = lerp(6, 12, motionIntensity)

      for (let i = 0; i < lines.length; i++) {
        const pts = lines[i]
        for (let j = 0; j < pts.length; j++) {
          const p = pts[j]
          const move =
            noise.perlin2(
              (p.x + time * waveSpeedX * speedScale) * 0.002,
              (p.y + time * waveSpeedY * speedScale) * 0.0015
            ) * noiseScale
          p.wx = Math.cos(move) * waveAmpX * ampScale
          p.wy = Math.sin(move) * waveAmpY * ampScale

          if (cursorForce > 0 && motionIntensity > 0.2) {
            const dx = p.x - mouse.sx
            const dy = p.y - mouse.sy
            const dist = Math.hypot(dx, dy)
            const l = Math.max(140, mouse.vs)
            if (dist < l) {
              const s = 1 - dist / l
              const f = Math.cos(dist * 0.001) * s
              const force = cursorForce * motionIntensity
              p.cvx += Math.cos(mouse.a) * f * l * mouse.vs * force
              p.cvy += Math.sin(mouse.a) * f * l * mouse.vs * force
            }
          }

          p.cvx += (0 - p.cx) * tension
          p.cvy += (0 - p.cy) * tension
          p.cvx *= friction
          p.cvy *= friction
          p.cx += p.cvx * 2 * ampScale
          p.cy += p.cvy * 2 * ampScale
          p.cx = Math.min(maxCursorMove * ampScale, Math.max(-maxCursorMove * ampScale, p.cx))
          p.cy = Math.min(maxCursorMove * ampScale, Math.max(-maxCursorMove * ampScale, p.cy))
        }
      }
    }

    function moved(p, withCursor) {
      const x = p.x + p.wx + (withCursor ? p.cx : 0)
      const y = p.y + p.wy + (withCursor ? p.cy : 0)
      return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 }
    }

    function drawLines() {
      ctx.clearRect(0, 0, width, height)
      const contrast = Math.max(0.12, motionIntensity)
      ctx.globalAlpha = scrollOpacity
      ctx.beginPath()
      ctx.strokeStyle = scaleRgbaAlpha(config.lineColor, contrast)
      ctx.lineWidth = 1

      for (let i = 0; i < lines.length; i++) {
        const pts = lines[i]
        let p1 = moved(pts[0], false)
        ctx.moveTo(p1.x, p1.y)
        for (let j = 0; j < pts.length; j++) {
          const isLast = j === pts.length - 1
          p1 = moved(pts[j], !isLast)
          const p2 = moved(pts[j + 1] || pts[pts.length - 1], !isLast)
          ctx.lineTo(p1.x, p1.y)
          if (isLast) ctx.moveTo(p2.x, p2.y)
        }
      }

      ctx.stroke()
      ctx.globalAlpha = 1
    }

    function updateMouse(clientX, clientY) {
      if (!animate) return
      const rect = container.getBoundingClientRect()
      mouse.x = clientX - rect.left
      mouse.y = clientY - rect.top
      if (!mouse.set) {
        mouse.sx = mouse.x
        mouse.sy = mouse.y
        mouse.lx = mouse.x
        mouse.ly = mouse.y
        mouse.set = true
      }
    }

    function updateScrollOpacity() {
      const intro = document.querySelector('.home-intro')
      const work = document.getElementById('work')
      if (!intro || !work) {
        scrollOpacity = 1
        motionIntensity = 1
        return
      }

      const vh = window.innerHeight
      const introTop = intro.getBoundingClientRect().top + window.scrollY
      const workTop = work.getBoundingClientRect().top + window.scrollY
      const focus = window.scrollY + vh * 0.42
      const span = Math.max(1, workTop - introTop - vh * 0.08)
      const progress = clamp01((focus - introTop) / span)
      const atmosphere = atmosphereFromProgress(progress)

      scrollOpacity = atmosphere.opacity
      motionIntensity = reducedMotion.matches
        ? Math.min(0.28, atmosphere.intensity)
        : atmosphere.intensity

      intro.style.setProperty('--wave-opacity', scrollOpacity.toFixed(3))
      intro.style.setProperty('--wave-intensity', motionIntensity.toFixed(3))
      intro.style.setProperty('--wave-veil', (0.22 + (1 - scrollOpacity) * 0.52).toFixed(3))
    }

    function tick(t) {
      if (!visible || scrollOpacity <= 0.01) {
        drawLines()
        return
      }

      if (animate) {
        mouse.sx += (mouse.x - mouse.sx) * 0.08
        mouse.sy += (mouse.y - mouse.sy) * 0.08
        const d = Math.hypot(mouse.x - mouse.lx, mouse.y - mouse.ly)
        mouse.vs += (d - mouse.vs) * 0.08
        mouse.vs = Math.min(60, mouse.vs)
        mouse.a = Math.atan2(mouse.y - mouse.ly, mouse.x - mouse.lx)
        mouse.lx = mouse.x
        mouse.ly = mouse.y
        movePoints(t)
      }

      drawLines()
      if (animate) frameId = requestAnimationFrame(tick)
    }

    function startLoop() {
      cancelAnimationFrame(frameId)
      if (animate && visible && scrollOpacity > 0.01) {
        frameId = requestAnimationFrame(tick)
      } else {
        movePoints(0)
        drawLines()
      }
    }

    function onResize() {
      config = mobileQuery.matches ? MOBILE : DESKTOP
      animate = !reducedMotion.matches && !mobileQuery.matches
      setSize()
      setLines()
      updateScrollOpacity()
      startLoop()
    }

    function onScroll() {
      const prev = scrollOpacity
      updateScrollOpacity()
      if (!animate) {
        drawLines()
        return
      }
      if (scrollOpacity > 0.01 && (prev <= 0.01 || !frameId)) startLoop()
      if (scrollOpacity <= 0.01) {
        cancelAnimationFrame(frameId)
        frameId = 0
        drawLines()
      }
    }

    function onMouseMove(e) {
      updateMouse(e.clientX, e.clientY)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && animate && scrollOpacity > 0.01) startLoop()
      },
      { rootMargin: '120px' }
    )
    const intro = document.querySelector('.home-intro')
    io.observe(intro || container)

    setSize()
    setLines()
    updateScrollOpacity()
    startLoop()

    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    const onReducedChange = () => onResize()
    const onMobileChange = () => onResize()
    reducedMotion.addEventListener?.('change', onReducedChange)
    mobileQuery.addEventListener?.('change', onMobileChange)

    return () => {
      cancelAnimationFrame(frameId)
      io.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
      reducedMotion.removeEventListener?.('change', onReducedChange)
      mobileQuery.removeEventListener?.('change', onMobileChange)
    }
  }, [])

  return (
    <div ref={containerRef} className={`home-waves ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="home-waves__canvas" />
    </div>
  )
}
