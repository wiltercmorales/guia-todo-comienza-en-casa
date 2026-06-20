/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Lora', 'Georgia', 'serif'],
        body: ['Nunito', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#FFFEF9',
          100: '#FFFBF2',
          200: '#FFF5E0',
          300: '#F5EDD6',
          400: '#EDE0C4',
          500: '#D4C4A0',
        },
        gold: {
          100: '#FDF3D0',
          200: '#FBE49A',
          300: '#F8CF5C',
          400: '#F0B823',
          500: '#E8A838',
          600: '#C88820',
          700: '#9E6A12',
        },
        forest: {
          100: '#D4E8DC',
          200: '#A8D1B8',
          300: '#74B48B',
          400: '#4A8C65',
          500: '#3D7254',
          600: '#2F5940',
          700: '#1E3D2A',
        },
        sky: {
          100: '#E8F4FB',
          200: '#C4E0F2',
          300: '#8EC5E8',
          400: '#5BA3D0',
          500: '#4A8AB8',
          600: '#376E96',
          700: '#265475',
        },
        rose: {
          100: '#F9E8E4',
          200: '#F2C9C1',
          300: '#E8A496',
          400: '#D87B6A',
          500: '#C45D4A',
          600: '#A4402F',
          700: '#7A2A1E',
        },
        sand: {
          100: '#FBF5E8',
          200: '#F5E8C8',
          300: '#EDD5A0',
          400: '#D4B87A',
          500: '#B89458',
          600: '#8F7240',
          700: '#6B5430',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        warm: '0 4px 20px rgba(180,120,60,0.15)',
        'warm-lg': '0 8px 40px rgba(180,120,60,0.22)',
        green: '0 4px 20px rgba(60,120,80,0.18)',
        'green-lg': '0 8px 30px rgba(60,120,80,0.25)',
        card: '0 2px 12px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.03)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.12)',
        glow: '0 0 30px rgba(240,184,35,0.4)',
      },
      animation: {
        float: 'float 3.5s ease-in-out infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2.5s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'scale-in': 'scale-in 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        stamp: 'stamp 0.45s cubic-bezier(0.34,1.56,0.64,1)',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.65' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.85)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        stamp: {
          '0%': { transform: 'scale(2.5) rotate(-12deg)', opacity: '0' },
          '60%': { transform: 'scale(0.88) rotate(3deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}
