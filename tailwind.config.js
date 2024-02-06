/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /text-(cyan|red)-(600|700)/,
      variants: ['hover'],
    }
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

