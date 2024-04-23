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
          900: "#002B53",
          500: "#3B9DF8",
          600: "#0386FF"
        },
        yellow: {
          400: "#FF8A00",
          500: "#FE8900",
        },
        neutral: {
          900: "#241400",
          100: "#F4F2F2"
        },
      }
    },
  },
  plugins: [],
}