import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#1d1d1d',
        olive: '#333f00',
        lime: '#b3e611',
      },
      fontFamily: {
        display: ['var(--font-bricolage)', 'sans-serif'],
        body:    ['var(--font-archivo)', 'sans-serif'],
        mono:    ['var(--font-space-mono)', 'monospace'],
      },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(26px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadein: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        cuemove: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.5' },
          '50%':      { transform: 'translateY(7px)', opacity: '1' },
        },
      },
      animation: {
        'rise':    'rise .9s cubic-bezier(.2,.7,0,1) both',
        'fadein':  'fadein .8s ease both',
        'cuemove': 'cuemove 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
