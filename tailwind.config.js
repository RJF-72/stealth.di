// packages/ui-components/tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'stealth': {
          'black': '#0a0a0a',
          'surface': '#1a1a1a',
          'primary': '#00ff88',
          'secondary': '#8b5cf6',
          'accent': '#06b6d4',
          'text': '#f8fafc',
          'muted': '#64748b'
        }
      },
      animation: {
        'matrix-glow': 'matrixGlow 2s ease-in-out infinite',
        'stealth-pulse': 'stealthPulse 3s ease-in-out infinite',
      },
      backdropBlur: {
        'stealth': '20px',
      }
    },
  },
  plugins: [],
}