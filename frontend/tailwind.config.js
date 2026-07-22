/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        background: '#f8fafc',
        foreground: '#0f172a',
        surface: '#ffffff',
        'surface-hover': '#f1f5f9',
        border: '#e2e8f0',
        muted: '#64748b',
        card: '#ffffff',
        'card-foreground': '#0f172a',
        'muted-foreground': '#64748b',
        secondary: '#f1f5f9',
        'secondary-foreground': '#334155',
        destructive: '#dc2626',
        'destructive-foreground': '#ffffff',
        input: '#cbd5e1',
        ring: '#2563eb',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 8px 20px rgba(37, 99, 235, 0.18)',
      }
    },
  },
  plugins: [],
}
