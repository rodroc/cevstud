'use client'
import { useEffect, RefObject } from 'react'

// Ported from cev.studio.dc.html — Lusion-style masked word-rise

function splitText(el: HTMLElement) {
  if ((el as HTMLElement & { _rtDone?: boolean })._rtDone) return
  ;(el as HTMLElement & { _rtDone?: boolean })._rtDone = true

  const lineEls = el.querySelectorAll<HTMLElement>('[data-rt-line]')
  const lines: Element[] = lineEls.length ? [...lineEls] : [el]
  const inners: HTMLElement[] = []

  lines.forEach((line) => {
    const text = line.textContent || ''
    line.textContent = ''
    const words = text.split(/\s+/).filter(Boolean)
    words.forEach((word, wi) => {
      const mask = document.createElement('span')
      mask.style.cssText =
        'display:inline-block;overflow:hidden;vertical-align:top;padding:0.02em 0 0.18em;margin-bottom:-0.18em;'
      const inner = document.createElement('span')
      inner.style.cssText =
        'display:inline-block;transform:translateY(118%);transition:transform .9s cubic-bezier(.16,1,.3,1);will-change:transform;'
      inner.textContent = word
      mask.appendChild(inner)
      line.appendChild(mask)
      if (wi < words.length - 1) line.appendChild(document.createTextNode(' '))
      inners.push(inner)
    })
  })

  inners.forEach((inner, i) => {
    inner.style.transitionDelay = (i * 0.052).toFixed(3) + 's'
  })
  ;(el as HTMLElement & { _rtInners?: HTMLElement[] })._rtInners = inners
}

function playReveal(el: HTMLElement) {
  ;((el as HTMLElement & { _rtInners?: HTMLElement[] })._rtInners || []).forEach(
    (inner) => { inner.style.transform = 'translateY(0)' },
  )
}

function hideReveal(el: HTMLElement) {
  ;((el as HTMLElement & { _rtInners?: HTMLElement[] })._rtInners || []).forEach(
    (inner) => { inner.style.transform = 'translateY(118%)' },
  )
}

/** Sets up masked word-rise on all [data-rt] elements inside containerRef. */
export function useWordRise(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const rtIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) playReveal(en.target as HTMLElement)
          else hideReveal(en.target as HTMLElement)
        })
      },
      { threshold: 0.25 },
    )

    container.querySelectorAll<HTMLElement>('[data-rt]').forEach((el) => {
      if (prefersReduced) return
      splitText(el)
      if (el.dataset.rtMode === 'load') {
        setTimeout(() => playReveal(el), 140)
      }
      rtIo.observe(el)
    })

    return () => rtIo.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

/** Sets up opacity+translateY reveal on all [data-reveal] elements inside containerRef. */
export function useScrollReveal(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          const t = en.target as HTMLElement
          if (en.isIntersecting) {
            t.style.opacity = '1'
            t.style.transform = 'none'
          } else {
            t.style.opacity = '0'
            t.style.transform = 'translateY(40px)'
          }
        })
      },
      { threshold: 0.16 },
    )

    container.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el, i) => {
      el.style.transitionDelay = ((i % 3) * 0.09) + 's'
      io.observe(el)
    })

    return () => io.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
