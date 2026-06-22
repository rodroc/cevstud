import Image from 'next/image'

const navItems = [
  { label: 'Web',     href: '#web' },
  { label: 'Mobile',  href: '#mobile' },
  { label: 'Brand',   href: '#brand' },
  { label: '3D',      href: '#threed' },
  { label: 'Contact', href: '#contact' },
]

export default function SiteHeader() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[clamp(24px,6vw,72px)] py-5 backdrop-blur-[12px] animate-fadein"
      style={{ background: 'linear-gradient(180deg,rgba(26,26,26,0.85),rgba(26,26,26,0.0))' }}
    >
      <a href="#top" className="flex items-center no-underline">
        <Image
          src="/final-logo.png"
          alt="cev.studio"
          width={140}
          height={36}
          priority
          className="h-[28px] w-auto"
        />
      </a>

      <nav className="flex items-center gap-[clamp(14px,2.4vw,34px)]">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="no-underline text-white/[0.62] hover:text-lime font-mono text-[12.5px] tracking-[0.04em] transition-colors duration-[250ms]"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
