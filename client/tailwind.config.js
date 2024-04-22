/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          10: "#2C7DC9",
        },
        blue: {
          900: "002B53",
        },
        neutral: {
          900: "241400"
        }
      }
    },
  },
  plugins: [],
}