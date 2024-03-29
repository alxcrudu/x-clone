/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        twitterBlue: "#1D9BF0",
        secondaryText: "#71767C",
        accent: "#16181C",
        ligthGray: "#e7e9ea",
      },
    },
  },
  plugins: [],
};
