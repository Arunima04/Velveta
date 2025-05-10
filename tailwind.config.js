/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      'charup-pink': '#FFD6E0',
      'charup-darkpink': '#FF8FAB',
      'charup-lightpink': '#FFE5EC',
      fontFamily: {
        lora: ['Lora', 'serif'],
      },
    },
      
  },
  plugins: [],
}

