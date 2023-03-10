/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: "500px",
        mobile2: "526px",
        sm: "539px",
        imgBreakpoint: "586px",
        hideVideo: "612px",
        md: "700px",
        md2: "820px",
        lg: "850px",
        lg1: "880px",
        lg2: "895px",
        lg3: "893px",
        "4lg": "900px",
        "5lg": "1000px",
        hide: "1100px",
        xl: "1120px",
        unhide: "1180px",
        xxl: "1294px",
        "3xl": "1325px",
        "3.5xl": "1350px",
        "4xl": "1662px",
      },
      zIndex: { 60: "60", 70: "70" },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
