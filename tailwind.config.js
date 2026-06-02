/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mobsters: ['Mobsters', 'Palatino Linotype', 'serif'],
      },
      colors: {
        mob: {
          bg: '#0d0b08',
          dark: '#0a0806',
          surface: '#161208',
          card: '#1a1408',
          border: '#2a1e0e',
          red: '#8b0000',
          'red-light': '#a81020',
          gold: '#c9a227',
          'gold-light': '#e8c940',
          'gold-dim': '#8a6e18',
          cream: '#d4c5a9',
          muted: '#7a6a50',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
