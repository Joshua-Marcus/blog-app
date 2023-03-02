/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#d6645d",
          50: "#fcf4f4",
          100: "#fae7e6",
          200: "#f7d3d1",
          300: "#efb5b2",
          400: "#e6908b",
          500: "#d6645d",
          600: "#c24740",
          700: "#a23933",
          800: "#87322d",
          900: "#712f2b",
        },
        accent: {
          DEFAULT: "#567892",
          50: "#f3f7f8",
          100: "#e0e8ed",
          200: "#c5d3dc",
          300: "#9cb3c4",
          400: "#6c8da4",
          500: "#567892",
          600: "#465e74",
          700: "#3d4f61",
          800: "#384552",
          900: "#323b47",
        },
        light: "#fffaf4",
        dark: {
          DEFAULT: "#33434f",
          darker: "#313e48",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("@tailwindcss/forms")],
};
