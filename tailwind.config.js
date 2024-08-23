/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: { 
      },
      backgroundColor: {
        mycolorr : "rgba(0, 0, 0, 0.7)"
      },
      fontFamily : {
        lato : "Lato"
      }
    },
  },
  plugins: [],
}