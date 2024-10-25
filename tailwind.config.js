/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./node_modules/preline/**/*", "./assets/**/*", "./views/**/*"],
  theme: {
    extend: {
      fontFamily: {
        cal: ["Cal Sans"]
      }
    },
  },
  plugins: [
    require('preline/plugin')
  ],
}

