/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          100: '#00e8a6',
          200: '#00cf94',
        },
        dark: {
          100: '#0e0035',
        },
      },
    },
  },
  plugins: [],
};
