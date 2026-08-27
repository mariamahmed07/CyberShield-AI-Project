/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        navy: {
          950: '#030710',
          900: '#060d1f',
          850: '#0a1426',
          800: '#0e1a32',
          700: '#152544',
          600: '#1e3354',
        },
        cyan: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
        },
        steel: {
          100: '#dbe4f0',
          200: '#bcc9dc',
          300: '#94a6c4',
          400: '#6a7fa3',
          500: '#4a6088',
          600: '#364b6b',
        },
      },
      boxShadow: {
        'cyan-glow': '0 0 0 1px rgba(34, 211, 238, 0.15), 0 0 24px -6px rgba(34, 211, 238, 0.45)',
        'cyan-glow-lg': '0 0 0 1px rgba(34, 211, 238, 0.2), 0 0 48px -8px rgba(34, 211, 238, 0.55)',
        'soft': '0 8px 32px -12px rgba(0, 0, 0, 0.6)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '40%': { opacity: '1' },
          '100%': { transform: 'translateY(400%)', opacity: '0' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'grid-drift': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '40px 40px' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'fade-in': 'fade-in 0.4s ease-out forwards',
        'scale-in': 'scale-in 0.4s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.5s ease-out forwards',
        scan: 'scan 1.2s ease-in-out forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'grid-drift': 'grid-drift 20s linear infinite',
      },
    },
  },
  plugins: [],
};
