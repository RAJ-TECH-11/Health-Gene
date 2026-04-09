export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0F172A',
        'secondary': '#1E293B',
        'accent': '#06B6D4',
        'accent-light': '#22D3EE',
        'accent-dark': '#0891B2',
        'success': '#10B981',
        'warning': '#F59E0B',
        'danger': '#EF4444',
        'danger-dark': '#DC2626',
      },
      fontFamily: {
        'display': ['Sora', 'system-ui', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        'gradient-accent': 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
        'gradient-glow': 'radial-gradient(circle at center, rgba(6, 182, 212, 0.2) 0%, transparent 70%)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(31, 41, 55, 0.1)',
        'glass-lg': '0 20px 40px rgba(31, 41, 55, 0.15)',
        'glow': '0 0 20px rgba(6, 182, 212, 0.3)',
        'glow-sm': '0 0 10px rgba(6, 182, 212, 0.2)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-in-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-in': 'slide-in 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(6, 182, 212, 0.2), 0 0 20px rgba(6, 182, 212, 0.1)' },
          '50%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(6, 182, 212, 0.2)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'slide-up': {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          'from': { opacity: '0', transform: 'translateX(-10px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
