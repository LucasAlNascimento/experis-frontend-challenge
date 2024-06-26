/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      utilities: {
        '.all-unset': {
          all: 'unset',
        }
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
    plugins: [
      function ({ addUtilities }) {
        addUtilities({
          '.all-unset': {
            all: 'unset',
          }
        })
      }
    ],
  }
}
