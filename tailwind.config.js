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
        sans: ['IM Fell English', 'Georgia', 'serif'],
        serif: ['IM Fell English', 'Georgia', 'serif'],
        mobsters: ['Mobsters', 'Palatino Linotype', 'serif'],
        fell: ['IM Fell English', 'Georgia', 'serif'],
      },
      colors: {
        mob: {
          bg:      '#0d0a07',
          dark:    '#0a0704',
          surface: '#18100a',
          card:    '#1e1408',
          border:  '#2e1e10',
          red:     '#5e1b21',
          'red-light': '#7a2028',
          taupe:   '#847464',
          cream:   '#d4c5a9',
          accent:  '#e55c35',
          muted:   '#6a5a48',
        },
      },
    },
  },
  plugins: [],
}
