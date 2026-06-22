'use client'
import { useRef } from 'react'
import ScrollCanvas from './ScrollCanvas'
import { useWordRise, useScrollReveal } from './useWordRise'
import { drawBrand } from '@/lib/canvasDraw'

const chips = ['Logotype', 'Type system', 'Guidelines']

export default function BrandIdentitySection() {
  const sectionRef = useRef<HTMLElement>(null)
  useWordRise(sectionRef)
  useScrollReveal(sectionRef)

  return (
    <section
      ref={sectionRef}
      id="brand"
      className="relative px-[clamp(24px,6vw,72px)] py-[clamp(90px,12vh,170px)] max-w-[1320px] mx-auto"
    >
      <div className="flex flex-wrap-reverse gap-[clamp(36px,5vw,80px)] items-center">
        {/* Text — right (wrap-reverse) */}
        <div data-reveal className="flex-[1_1_360px] min-w-[280px]">
          <div className="font-mono text-[14px] tracking-[0.2em] text-lime mb-[18px]">
            03 / BRAND IDENTITY
          </div>
          <h2
            data-rt
            className="font-display font-bold text-[clamp(34px,5vw,68px)] leading-[0.98] tracking-[-0.03em] m-0 mb-6"
          >
            A system, not a logo.
          </h2>
          <p className="text-[18px] leading-[1.7] text-white/[0.66] max-w-[46ch] m-0 mb-7">
            Names, marks, type, motion, and the rules that hold them together. We design
            identities that survive contact with the real world — on a billboard, a
            favicon, and everything in between.
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

        {/* Canvas — left */}
        <ScrollCanvas
          draw={drawBrand}
          frames={72}
          sectionRef={sectionRef}
          imgPath="/frames/brand"
          glowSide="left"
        />
      </div>
    </section>
  )
}
