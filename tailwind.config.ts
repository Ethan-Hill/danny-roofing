import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4fb',
          100: '#d9e3f5',
          200: '#b7caed',
          300: '#8aa7e0',
          400: '#5d7ed0',
          500: '#3c5cbc',
          600: '#0e2a85',
          700: '#1e3167',
          800: '#182853',
          900: '#152243',
          950: '#0d1529',
          DEFAULT: '#0e2a85'
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
} satisfies Config
