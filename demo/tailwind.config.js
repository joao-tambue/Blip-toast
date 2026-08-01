/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand (from the Blip logo)
        violet: '#8B5CF6',
        violetDeep: '#7C3AED',
        blue: '#3B82F6',
        sky: '#38BDF8',
        // Semantic / theme-aware tokens (values flip in light mode via CSS vars)
        night: 'var(--color-night)',
        nightSoft: 'var(--color-night-soft)',
        surface: 'var(--color-surface)',
        surfaceHover: 'var(--color-surface-hover)',
        line: 'var(--color-line)',
        ink: 'var(--color-ink)',
        muted: 'var(--color-muted)',
      },
      fontFamily: {
        display: [
          '"Plus Jakarta Sans Variable"',
          'Plus Jakarta Sans',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        sans: ['"Inter Variable"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: [
          '"JetBrains Mono Variable"',
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'monospace',
        ],
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(139, 92, 246, 0.28)',
        glow: '0 0 32px rgba(139, 92, 246, 0.4), 0 0 80px rgba(59, 130, 246, 0.2)',
        'glow-lg': '0 0 48px rgba(139, 92, 246, 0.5), 0 8px 40px rgba(59, 130, 246, 0.28)',
        'btn-primary': '0 8px 24px -8px rgba(124, 58, 237, 0.7)',
        card: '0 8px 40px -12px rgba(0, 0, 0, 0.5)',
        phone: '0 30px 60px -15px rgba(0, 0, 0, 0.65), 0 0 40px rgba(139, 92, 246, 0.12)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 24px rgba(139, 92, 246, 0.35), 0 0 60px rgba(59, 130, 246, 0.18)',
          },
          '50%': {
            boxShadow: '0 0 44px rgba(139, 92, 246, 0.6), 0 0 90px rgba(59, 130, 246, 0.35)',
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        aurora: {
          '0%, 100%': { opacity: '0.5', transform: 'translate(0, 0) scale(1)' },
          '50%': { opacity: '0.9', transform: 'translate(40px, -30px) scale(1.15)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'gradient-shift': 'gradient-shift 6s ease infinite',
        aurora: 'aurora 12s ease-in-out infinite',
      },
    },
  },
};
