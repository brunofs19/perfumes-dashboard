/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Paleta CLARA — vitrine de joalheria / armário carvalho claro
        oak: {
          50:  '#faf6ed',
          100: '#f0e8d4',
          200: '#e0d3b8',
          300: '#c8b894',
          400: '#b89968',
          500: '#8a6f47',
          600: '#6b4f30',
          700: '#4a3520',
          800: '#3d2a18',
        },
        champagne: {
          300: '#f0d9a8',
          400: '#e8c878',
          500: '#d4b878',
          600: '#b89968',
        },
        cream: {
          50:  '#fdfaf3',
          100: '#f5f0e6',
          200: '#ede4d0',
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
