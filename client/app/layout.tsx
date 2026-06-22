import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'cev.studio — built to be remembered',
  description:
    'Four disciplines, one obsessive standard. Web, mobile, brand, and 3D for teams who ship things worth keeping.',
  openGraph: {
    title: 'cev.studio — built to be remembered',
    description:
      'Four disciplines, one obsessive standard. Web, mobile, brand, and 3D for teams who ship things worth keeping.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-bg text-white font-body antialiased min-h-screen">
        {/* Film grain overlay */}
        <div
          aria-hidden
          className="grain fixed inset-0 z-[60] pointer-events-none opacity-[0.06] mix-blend-overlay"
        />
        {children}
      </body>
    </html>
  )
}
