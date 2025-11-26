/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './posts/**/*.mdx'
  ],
  theme: {
    extend: {
      colors: {
        base: '#191724',
        surface: '#1f1d2e',
        overlay: '#26233a',
        muted: '#6e6a86',
        subtle: '#908caa',
        text: '#e0def4',
        love: '#eb6f92',
        gold: '#f6c177',
        rose: '#ebbcba',
        pine: '#31748f',
        foam: '#9ccfd8',
        iris: '#c4a7e7',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}