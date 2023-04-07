/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Roboto: ["Poppins", "serif"],
    },

    extend: {
      screens: {
        extraSmall: "280px",
        mobile: "375px",
        desktop: "1140px",
      },
    },
  },
  plugins: [],
};
