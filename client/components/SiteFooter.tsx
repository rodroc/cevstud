export default function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.07] px-[clamp(24px,6vw,72px)] py-[42px] max-w-[1320px] mx-auto flex flex-wrap gap-5 items-center justify-between">
      <div className="flex items-center gap-[10px] font-mono text-[12.5px] text-white/50">
        <span className="w-[9px] h-[9px] bg-lime block rounded-[2px]" />
        © 2026 cev.studio — built to be remembered
      </div>
      <div className="flex gap-[26px]">
        <a href="#contact" className="no-underline text-white/50 font-mono text-[12.5px] transition-colors duration-[250ms] hover:text-lime">
          Email
        </a>
        <a href="#contact" className="no-underline text-white/50 font-mono text-[12.5px] transition-colors duration-[250ms] hover:text-lime">
          Instagram
        </a>
        <a href="#top" className="no-underline text-white/50 font-mono text-[12.5px] transition-colors duration-[250ms] hover:text-lime">
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
