/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        surface: {
          DEFAULT: '#141414',
          alt: '#1c1c1c',
        },
        text: {
          DEFAULT: '#f4f1ea',
          muted: 'rgba(244,241,234,0.55)',
          faint: 'rgba(244,241,234,0.35)',
        },
        accent: {
          DEFAULT: '#F9B21A',
          hover: '#d99a12',
          soft: 'rgba(249,178,26,0.14)',
        },
        divider: '#262626',
        neutral: {
          400: '#8a8a8a',
          700: '#2a2a2a',
          800: '#1c1c1c',
        },
      },
      fontFamily: {
        heading: ['Oswald', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '14px',
      },
      boxShadow: {
        elev: '0 0 0 1px rgba(255,255,255,0.06)',
      },
      keyframes: {
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(249,178,26,0.55)' },
          '100%': { boxShadow: '0 0 0 14px rgba(249,178,26,0)' },
        },
        scanFade: {
          '0%, 100%': { opacity: 0.35 },
          '50%': { opacity: 1 },
        },
        flameFlicker: {
          '0%, 100%': { filter: 'drop-shadow(0 0 6px rgba(249,178,26,0.5)) brightness(1)' },
          '25%': { filter: 'drop-shadow(0 0 14px rgba(249,178,26,0.85)) brightness(1.08)' },
          '50%': { filter: 'drop-shadow(0 0 8px rgba(249,178,26,0.6)) brightness(0.97)' },
          '75%': { filter: 'drop-shadow(0 0 16px rgba(249,178,26,0.9)) brightness(1.1)' },
        },
      },
      animation: {
        pulseRing: 'pulseRing 1.8s infinite',
        scanFade: 'scanFade 1s infinite',
        flameFlicker: 'flameFlicker 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
