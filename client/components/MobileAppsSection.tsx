'use client'
import { useRef } from 'react'
import ScrollCanvas from './ScrollCanvas'
import { useWordRise, useScrollReveal } from './useWordRise'
import { drawMobile } from '@/lib/canvasDraw'

const chips = ['iOS', 'Android', 'React Native']

export default function MobileAppsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  useWordRise(sectionRef)
  useScrollReveal(sectionRef)

  return (
    <section
      ref={sectionRef}
      id="mobile"
      className="relative px-[clamp(24px,6vw,72px)] py-[clamp(90px,12vh,170px)] max-w-[1320px] mx-auto"
    >
      <div className="flex flex-wrap gap-[clamp(36px,5vw,80px)] items-center">
        {/* Canvas — left */}
        <ScrollCanvas
          draw={drawMobile}
          frames={96}
          sectionRef={sectionRef}
          imgPath="/frames/mobile"
          glowSide="right"
        />

        {/* Text — right */}
        <div data-reveal className="flex-[1_1_360px] min-w-[280px]">
          <div className="font-mono text-[14px] tracking-[0.2em] text-lime mb-[18px]">
            02 / MOBILE APPS
          </div>
          <h2
            data-rt
            className="font-display font-bold text-[clamp(34px,5vw,68px)] leading-[0.98] tracking-[-0.03em] m-0 mb-6"
          >
            Native-feeling, end to end.
          </h2>
          <p className="text-[18px] leading-[1.7] text-white/[0.66] max-w-[46ch] m-0 mb-7">
            iOS and Android experiences that respect the platform and your roadmap. We
            ship the first build quickly, then sand every edge until the app disappears
            and the work speaks.
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
      </div>
    </section>
  )
}
