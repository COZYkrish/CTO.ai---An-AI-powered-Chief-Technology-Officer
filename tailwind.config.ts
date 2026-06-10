/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        void: '#050816',
        deep: '#0A0F1F',
        dark: '#0B1120',
        // Accents
        electric: '#3B82F6',
        cyan: {
          DEFAULT: '#06B6D4',
          400: '#22D3EE',
          500: '#06B6D4',
        },
        purple: {
          DEFAULT: '#8B5CF6',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
        },
        indigo: {
          DEFAULT: '#6366F1',
          400: '#818CF8',
          500: '#6366F1',
        },
        // Glass
        glass: 'rgba(255,255,255,0.04)',
        'glass-border': 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        geist: ['Geist', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      fontSize: {
        'cinema': ['clamp(3rem, 8vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display': ['clamp(2rem, 5vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'headline': ['clamp(1.5rem, 3vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      backgroundImage: {
        'aurora': 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(59,130,246,0.15), transparent)',
        'aurora-purple': 'radial-gradient(ellipse 80% 80% at 80% 50%, rgba(139,92,246,0.12), transparent)',
        'aurora-cyan': 'radial-gradient(ellipse 60% 60% at 20% 80%, rgba(6,182,212,0.1), transparent)',
        'glow-blue': 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
        'glow-purple': 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
      },
      boxShadow: {
        'glow-blue': '0 0 40px rgba(59, 130, 246, 0.4)',
        'glow-cyan': '0 0 40px rgba(6, 182, 212, 0.4)',
        'glow-purple': '0 0 40px rgba(139, 92, 246, 0.4)',
        'glow-sm': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glass': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        'panel': '0 0 0 1px rgba(255,255,255,0.06), 0 8px 40px rgba(0,0,0,0.6)',
      },
      animation: {
        'aurora-drift': 'aurora-drift 8s ease-in-out infinite alternate',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'data-flow': 'data-flow 2s linear infinite',
        'neural-pulse': 'neural-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'aurora-drift': {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '100%': { transform: 'translate(5%, 5%) scale(1.05)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'data-flow': {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
        'neural-pulse': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.95)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
