'use client'
import { useRef } from 'react'
import ScrollCanvas from './ScrollCanvas'
import { useWordRise, useScrollReveal } from './useWordRise'
import { drawWeb } from '@/lib/canvasDraw'

const chips = ['Next.js', 'TypeScript', 'Edge-rendered']

export default function WebDevSection() {
  const sectionRef = useRef<HTMLElement>(null)
  useWordRise(sectionRef)
  useScrollReveal(sectionRef)

  return (
    <section
      ref={sectionRef}
      id="web"
      className="relative px-[clamp(24px,6vw,72px)] py-[clamp(90px,12vh,170px)] max-w-[1320px] mx-auto"
    >
      <div className="flex flex-wrap-reverse gap-[clamp(36px,5vw,80px)] items-center">
        {/* Text — right column (wrap-reverse puts it second in DOM, visually right) */}
        <div data-reveal className="flex-[1_1_360px] min-w-[280px]">
          <div className="font-mono text-[14px] tracking-[0.2em] text-lime mb-[18px]">
            01 / WEB DEVELOPMENT
          </div>
          <h2
            data-rt
            className="font-display font-bold text-[clamp(34px,5vw,68px)] leading-[0.98] tracking-[-0.03em] m-0 mb-6"
          >
            Fast, durable, unmistakably yours.
          </h2>
          <p className="text-[18px] leading-[1.7] text-white/[0.66] max-w-[46ch] m-0 mb-7">
            We engineer the front end like a product, not a brochure — server-rendered
            where it counts, animated where it earns it, accessible everywhere. The
            result loads in a blink and ages well.
          </p>
          <div className="flex flex-wrap gap-[10px]">
            {chips.map((c) => (
              <span
                key={c}
                className="font-mono text-[12px] text-white/55 border border-white/[0.16] px-[13px] py-[7px] rounded-full"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Canvas — left column */}
        <ScrollCanvas
          draw={drawWeb}
          frames={120}
          fps={24}
          label="WEB-DEV"
          sectionRef={sectionRef}
          imgPath="/frames/web"
          glowSide="left"
        />
      </div>
    </section>
  )
}
