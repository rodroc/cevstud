'use client'
import { useRef } from 'react'
import { useWordRise } from './useWordRise'

export default function Masthead() {
  const sectionRef = useRef<HTMLElement>(null)
  useWordRise(sectionRef)

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-screen flex flex-col justify-center px-[clamp(24px,6vw,72px)] pt-[140px] pb-[80px] max-w-[1320px] mx-auto"
    >
      {/* Lime radial glow */}
      <div
        aria-hidden
        className="glow-masthead absolute top-[18%] right-[-8%] w-[560px] h-[560px] pointer-events-none"
      />

      {/* Eyebrow */}
      <div
        className="font-mono text-[13px] tracking-[0.28em] uppercase text-white/50 mb-[34px] animate-rise"
        style={{ animationDelay: '0.05s' }}
      >
        Digital product studio
      </div>

      {/* Headline — word-rise via data-rt */}
      <h1
        data-rt
        data-rt-mode="load"
        className="font-display font-extrabold text-[clamp(46px,9.2vw,138px)] leading-[0.92] tracking-[-0.035em] m-0 max-w-[14ch]"
      >
        <span data-rt-line className="block">We build the</span>
        <span data-rt-line className="block">things people</span>
        <span data-rt-line className="block text-lime">remember.</span>
      </h1>

      {/* Subhead */}
      <p
        className="max-w-[52ch] mt-[38px] text-[clamp(17px,1.7vw,21px)] leading-[1.65] text-white/[0.66] animate-rise"
        style={{ animationDelay: '0.45s' }}
      >
        Four disciplines, one obsessive standard. We design and engineer web, mobile,
        brand, and 3D work for teams who&apos;d rather ship something worth keeping than
        something on time.
      </p>

      {/* CTA */}
      <a
        href="#contact"
        className="mt-[46px] self-start inline-flex items-center gap-3 no-underline bg-lime text-[#1a1a1a] font-display font-bold text-[16px] px-7 py-4 rounded-[3px] tracking-[-0.01em] transition-all duration-[250ms] hover:bg-transparent hover:text-lime hover:shadow-[inset_0_0_0_1.5px_#b3e611] hover:-translate-y-0.5 animate-rise"
        style={{ animationDelay: '0.55s' }}
      >
        Start a project →
      </a>

      {/* Scroll cue */}
      <div
        className="absolute bottom-[34px] left-[clamp(24px,6vw,72px)] font-mono text-[11px] tracking-[0.2em] text-white/40 flex items-center gap-[10px] animate-fadein"
        style={{ animationDelay: '0.9s' }}
      >
        SCROLL <span className="animate-cuemove inline-block">↓</span>
      </div>
    </section>
  )
}
