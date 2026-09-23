/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        surface: {
          bg: '#faf8ff',
          bgDark: '#0f0a1f',
          card: '#ffffff',
          cardDark: '#1a1230',
          border: '#ede9fe',
          borderDark: '#2e1065',
        },
        accent: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        mood: {
          awful: '#e57373',
          bad: '#f0a56e',
          neutral: '#e8c05e',
          good: '#a3c96a',
          great: '#6ec89a',
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(139, 92, 246, 0.06), 0 4px 16px rgba(139, 92, 246, 0.04)',
        'soft-lg': '0 4px 16px rgba(139, 92, 246, 0.08), 0 8px 32px rgba(139, 92, 246, 0.06)',
        glow: '0 0 24px rgba(139, 92, 246, 0.25)',
      },
    },
  },
  plugins: [],
};