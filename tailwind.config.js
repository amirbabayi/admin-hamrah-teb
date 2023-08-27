/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00539A',
        secondary: '#9747ff',
        background: '#f0eff3',
        white: '#fff',
        black: '#000',
        danger: '#ea1c1c',
        error: '#e83939',
        green: '#97e500',
        gray: '#ccc',
        'gray-300': '#7e7d7d',
        'disable-bg': '#80808059'
      },
    },
    fontFamily: {
      body: ['"dana-fanum"'],
    },
  },
  plugins: [],
}

