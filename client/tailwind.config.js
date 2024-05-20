/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
    container: {
      center: true,
      padding: "1rem",
    },
    fontFamily: {
      lato: ["Lato", "sans-serif"],
      inter: ["inter", "sans-serif"],
      poppins: ["poppins", "sans-serif"],
      libre: ["Libre Baskerville", "serif"],
    },
    extend: {
      fontSize: {
        h1: [
          "clamp(2.25rem, 4vw, 3.375rem)",
          {
            lineHeight: "normal",
            fontWeight: "700",
          },
        ],
        h2: [
          "clamp(2rem, 4vw, 2.75rem)",
          {
            lineHeight: "normal",
            fontWeight: "700",
          },
        ],
        h3: [
          "clamp(1.75rem, 4vw, 2.25rem)",
          {
            lineHeight: "normal",
            fontWeight: "700",
          },
        ],
      },
      colors: {
        primary: "#FE8900",
        gray: {
          default: "#F4F2F2",
          10: "#292c32",
          20: "#393e45",
          30: "#4a4f59",
          40: "#5a616c",
          50: "#6a7280",
          60: "#7d8491",
          70: "#9096a1",
          80: "#a4a9b2",
          90: "#b7bbc2",
        },
        blue: "#002B53",
        blue2: "#0386FF",
        blue3: "#3B9DF8",
        deepBlue: "#235C92",
        blueGradient: "#3B9DF8",
        orangeGradient: "#FF8A00",
        dark: "#241400",
      },
      borderRadius: {
        "4xl": "32px",
      },
    },
  },
  plugins: [],
};
