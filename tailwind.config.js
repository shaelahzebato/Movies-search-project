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
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        'fade-in': 'fade-in 1s ease-in-out',
      },
    },
  },
  // theme: {
  //   extend: {
  //     keyframes: {
  //       shake: {
  //         '0%, 100%': { transform: 'translateX(0)' },
  //         '25%': { transform: 'translateX(-5px)' },
  //         '75%': { transform: 'translateX(5px)' },
  //       },
  //     },
  //     animation: {
  //       shake: 'shake 0.5s ease-in-out',
  //     },
  //   },
  // },
  plugins: [],
}