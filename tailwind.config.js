/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.tsx", "./node_modules/flowbite-react/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        hero: ["Yuji Syuku", "serif"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
