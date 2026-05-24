/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        mahogany: {
          900: '#1a0d07',
          800: '#2a1610',
          700: '#3d2419',
          600: '#523222',
          500: '#6b4226',
          400: '#8b5a3c'
        },
        champagne: {
          400: '#d9b779',
          500: '#c9a875',
          600: '#a88a5c'
        },
        cream: {
          50: '#fdf6e8',
          100: '#f5ead2'
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
