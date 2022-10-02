/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ferocia: '#451a6e'
      }
    },

  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
};
