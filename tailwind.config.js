/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        "lg-wrapper": "min(40rem, 95%)",
        "md-wrapper": "min(20rem, 95%)",
        "sm-wrapper": "min(15rem, 90%)"
      },

      margin: {
        wrapper: "0 auto"
      },

      backgroundColor: {
        magenta: "#8E49E8",
        "light-blue": "#6D6DE9"
      }
    },
  },
  plugins: [],
}