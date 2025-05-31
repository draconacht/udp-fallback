const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app.vue',
    './plugins/**/*.{js,ts}',
  ],
  safelist: [
    'bg-pastelGreen',
    'bg-pastelBlue',
    'bg-pastelPink',
  ],
  theme: {
    extend: {
      colors: {
        pastelBlue: '#a3c9f9',
        pastelPink: '#f9a3c9',
        pastelGreen: '#b8f9c9',
      },
      fontFamily: {
        sans: ['Inter', 'Nunito', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
} 