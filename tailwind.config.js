/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mjgold: '#d4af37',
        mjdark: '#080808',
        mjpanel: 'rgba(18, 18, 18, 0.75)',
        mjborder: 'rgba(212, 175, 55, 0.25)',
      },
    },
  },
  plugins: [],
}