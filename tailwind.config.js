/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.ejs'],
  theme: {
    extend: {
      colors: {
        roverNeutral: "#F7F4E5",
        roverGold: "#DBB13B",
        roverNavy: "#2D325A",
        roverBlue: "#2494A2",
        roverAqua: "#56BDA2"
      },
    },
  },
  plugins: [
  require('tailwindcss/forms'),
    require('autoprefixer'),
  ],
}
