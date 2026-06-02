/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brandTeal: '#006666', 
        brandGreen: '#00E676', 
      },
    },
  },
  plugins: [],
}