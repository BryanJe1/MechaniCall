/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        roadside: {
          red: '#D92C2C',
          light: '#FFFFFF',
          dark: '#333333',
          gray: '#E0E0E0',
          lightGray: '#F5F5F5',
        },
      },
    },
  },
  plugins: [],
}