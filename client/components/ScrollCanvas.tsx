'use client'
import { useEffect, useRef, RefObject } from 'react'
import type { DrawFn } from '@/lib/canvasDraw'

const IMG_FRAME_COUNT = 121

interface ScrollCanvasProps {
  draw: DrawFn
  frames: number
  sectionRef: RefObject<HTMLElement | null>
  /** e.g. "/frames/web" — triggers WebP preload when provided */
  imgPath?: string
  /** "left" = glow at 72% (text-right/canvas-left), "right" = 28% */
  glowSide?: 'left' | 'right'
}

export default function ScrollCanvas({
  draw,
  frames,
  sectionRef,
  imgPath,
  glowSide = 'left',
}: ScrollCanvasProps) {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const barRef     = useRef<HTMLDivElement>(null)
  const rafRef     = useRef<number>(0)
  const ctxRef     = useRef<CanvasRenderingContext2D | null>(null)
  const wRef       = useRef(0)
  const hRef       = useRef(0)
  const dprRef     = useRef(1)
  const imagesRef  = useRef<HTMLImageElement[]>([])
  const loadedRef  = useRef(false)

  // Resize handler
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const rect = canvas.getBoundingClientRect()
      canvas.width  = Math.round(rect.width  * dpr)
      canvas.height = Math.round(rect.height * dpr)
      wRef.current   = rect.width
      hRef.current   = rect.height
      dprRef.current = dpr
      ctxRef.current = canvas.getContext('2d')
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  // WebP preload (Task 5d)
  useEffect(() => {
    if (!imgPath) return
    loadedRef.current = false
    imagesRef.current = []
    const imgs = Array.from({ length: IMG_FRAME_COUNT }, (_, i) => {
      const img = new Image()
      img.src = `${imgPath}/frame_${String(i + 1).padStart(4, '0')}.webp`
      return img
    })
    Promise.all(
      imgs.map((img) => new Promise<void>((res) => { img.onload = img.onerror = () => res() })),
    ).then(() => {
      imagesRef.current = imgs
      loadedRef.current = true
    })
    return () => {
      imagesRef.current = []
      loadedRef.current = false
    }
  }, [imgPath])

  // rAF loop
  useEffect(() => {
    const tick = (t: number) => {
      const section = sectionRef.current
      const ctx     = ctxRef.current
      const w       = wRef.current
      const h       = hRef.current
      const dpr     = dprRef.current

      if (section && ctx && w && h) {
        const vh = window.innerHeight
        const r  = section.getBoundingClientRect()

        if (r.bottom > -80 && r.top < vh + 80) {
          const p  = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)))
          const pe = Math.max(0, Math.min(1, (p - 0.12) / 0.62))

          ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
          ctx.clearRect(0, 0, w, h)

          if (loadedRef.current && imagesRef.current.length > 0) {
            const idx = Math.round(pe * (IMG_FRAME_COUNT - 1))
            ctx.drawImage(imagesRef.current[idx], 0, 0, w, h)
          } else {
            draw(ctx, w, h, pe, t)
          }

          if (frameRef.current)
            frameRef.current.textContent = String(Math.round(pe * frames)).padStart(3, '0')
          if (barRef.current)
            barRef.current.style.width = (pe * 100).toFixed(1) + '%'
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  // sectionRef is stable; draw is a module-level fn reference — safe to omit
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frames])

  const bgClass = glowSide === 'left' ? 'canvas-panel-left' : 'canvas-panel-right'

  return (
    <div
      data-reveal
      className={`${bgClass} relative flex-[1_1_440px] min-w-[300px] border border-lime/[0.16] rounded-[6px] overflow-hidden`}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-[520px]"
      />
      {/* Progress bar */}
      <div
        ref={barRef}
        className="absolute left-0 bottom-0 h-[2px] bg-lime w-0"
      />
    </div>
  )
}
