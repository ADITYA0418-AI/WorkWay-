/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        eco: {
          bg: '#F3F4F6',        // Cool Gray primary background
          card: '#FFFFFF',      // Pure White container / card
          primary: '#0F766E',   // Deep Forest Teal (Primary CTAs)
          primaryHover: '#115E59',
          sky: '#0284C7',       // Sky Blue (Secondary / Status Highlight)
          rose: '#E11D48',      // Rose (Status / Emergency Highlight)
        },
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e', // Deep Forest Teal primary
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        teal: {
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        sky: {
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
        },
        rose: {
          500: '#F43F5E',
          600: '#E11D48',
          700: '#BE123C',
        },
        navy: {
          800: '#0b1329',
          900: '#060b19',
        },
        theme: {
          bg: 'var(--background)',
          surface: 'var(--surface)',
          secondary: 'var(--surface-secondary)',
          tertiary: 'var(--surface-tertiary)',
          primary: 'var(--text-primary)',
          text: 'var(--text-primary)',
          'text-secondary': 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          border: 'var(--border)',
          'border-light': 'var(--border-light)',
          accent: 'var(--primary)',
          'accent-hover': 'var(--primary-hover)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

