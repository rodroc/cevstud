'use client'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormData } from '@/lib/contactSchema'
import { useWordRise, useScrollReveal } from './useWordRise'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null)
  const [serverError, setServerError] = useState('')

  const sectionRef = useRef<HTMLElement>(null)
  useWordRise(sectionRef)
  useScrollReveal(sectionRef)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data: ContactFormData) => {
    setServerError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const json = await res.json()
        setServerError(json.error ?? 'Something went wrong.')
        return
      }
      setSubmittedData(data)
      setSubmitted(true)
    } catch {
      setServerError('Network error — please try again.')
    }
  }

  const handleReset = () => {
    reset()
    setSubmitted(false)
    setSubmittedData(null)
    setServerError('')
  }

  const firstName = submittedData?.name.trim().split(' ')[0] ?? 'there'

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative px-[clamp(24px,6vw,72px)] py-[clamp(110px,16vh,210px)] pb-[clamp(90px,12vh,150px)] border-t border-white/[0.07]"
    >
      {/* Top lime glow */}
      <div
        aria-hidden
        className="glow-contact absolute -top-[10%] left-1/2 -translate-x-1/2 w-[min(900px,90vw)] h-[600px] pointer-events-none"
      />

      <div className="relative max-w-[1080px] mx-auto">
        {/* Eyebrow */}
        <div
          data-reveal
          className="font-mono text-[14px] tracking-[0.24em] uppercase text-white/55 mb-[26px]"
        >
          [ Start a project ]
        </div>

        {/* Headline — full lime, word-rise */}
        <h2
          data-rt
          className="font-display font-extrabold text-[clamp(42px,8vw,116px)] leading-[0.9] tracking-[-0.04em] m-0 mb-[18px] text-lime max-w-[13ch]"
        >
          Tell us what you&apos;re building.
        </h2>

        {/* Intro */}
        <p
          data-reveal
          className="text-[clamp(17px,1.7vw,21px)] leading-[1.6] text-white/60 max-w-[50ch] m-0 mb-[56px]"
        >
          No brief too rough. Drop the shape of the thing and we&apos;ll reply within
          two working days — usually the same one.
        </p>

        {submitted && submittedData ? (
          /* Success card */
          <div className="max-w-[680px] border border-lime/[0.35] rounded-[6px] px-[clamp(28px,4vw,56px)] py-12"
            style={{ background: 'radial-gradient(120% 120% at 0% 0%, rgba(51,63,0,0.4), rgba(20,20,20,0) 70%)' }}
          >
            <div className="w-[46px] h-[46px] rounded-full bg-lime text-[#1a1a1a] flex items-center justify-center text-[24px] font-bold mb-6">
              ✓
            </div>
            <h3 className="font-display font-bold text-[clamp(28px,4vw,44px)] tracking-[-0.02em] m-0 mb-[14px]">
              Got it, {firstName}.
            </h3>
            <p className="text-[18px] leading-[1.65] text-white/[0.66] m-0 mb-[30px] max-w-[46ch]">
              Your message is in the queue. We&apos;ll reply to{' '}
              <span className="text-lime">{submittedData.email}</span> within two
              working days.
            </p>
            <button
              onClick={handleReset}
              className="bg-transparent text-white border border-white/25 font-mono text-[13px] px-[22px] py-3 rounded-[3px] transition-colors duration-[250ms] hover:border-lime hover:text-lime cursor-pointer"
            >
              Send another →
            </button>
          </div>
        ) : (
          /* Form */
          <form
            data-reveal
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-[34px] max-w-[680px]"
            noValidate
          >
            {/* Name */}
            <label className="flex flex-col gap-[10px]">
              <span className="font-mono text-[12px] tracking-[0.16em] uppercase text-white/50">
                Name
              </span>
              <input
                {...register('name')}
                type="text"
                placeholder="Jane Mercer"
                className="bg-transparent border-0 border-b border-white/[0.22] text-white font-body text-[clamp(20px,2.4vw,28px)] px-0 pt-2 pb-[14px] outline-none transition-colors duration-[250ms] focus:border-lime placeholder:text-white/25"
              />
              {errors.name && (
                <span className="font-mono text-[11px] text-lime">{errors.name.message}</span>
              )}
            </label>

            {/* Email */}
            <label className="flex flex-col gap-[10px]">
              <span className="font-mono text-[12px] tracking-[0.16em] uppercase text-white/50">
                Email
              </span>
              <input
                {...register('email')}
                type="email"
                placeholder="jane@company.com"
                className="bg-transparent border-0 border-b border-white/[0.22] text-white font-body text-[clamp(20px,2.4vw,28px)] px-0 pt-2 pb-[14px] outline-none transition-colors duration-[250ms] focus:border-lime placeholder:text-white/25"
              />
              {errors.email && (
                <span className="font-mono text-[11px] text-lime">{errors.email.message}</span>
              )}
            </label>

            {/* Message */}
            <label className="flex flex-col gap-[10px]">
              <span className="font-mono text-[12px] tracking-[0.16em] uppercase text-white/50">
                Message
              </span>
              <textarea
                {...register('message')}
                rows={3}
                placeholder="A new marketing site, an iOS companion app, a rebrand…"
                className="bg-transparent border-0 border-b border-white/[0.22] text-white font-body text-[clamp(20px,2.4vw,28px)] px-0 pt-2 pb-[14px] outline-none resize-y leading-[1.4] transition-colors duration-[250ms] focus:border-lime placeholder:text-white/25"
              />
              {errors.message && (
                <span className="font-mono text-[11px] text-lime">{errors.message.message}</span>
              )}
            </label>

            {serverError && (
              <p className="font-mono text-[12px] text-lime m-0">{serverError}</p>
            )}

            <div className="flex items-center gap-[22px] flex-wrap mt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer inline-flex items-center gap-3 bg-lime text-[#1a1a1a] border-0 font-display font-bold text-[18px] px-9 py-[18px] rounded-[3px] tracking-[-0.01em] transition-all duration-[250ms] hover:bg-transparent hover:text-lime hover:shadow-[inset_0_0_0_1.5px_#b3e611] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending…' : 'Send it →'}
              </button>
              <span className="font-mono text-[12px] text-white/40">⏎ Replies within 48h</span>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
