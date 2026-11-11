/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Montserrat'", 'system-ui', 'sans-serif'],
        body: ["'Barlow'", 'sans-serif'],
      },
      colors: {
        // the yellow of the Sr. Will lion logo
        brand: { DEFAULT: '#ECD012', hover: '#F5DC3A' },
        panel: '#111111',
        line: '#262626',
      },
    },
  },
  plugins: [],
}
