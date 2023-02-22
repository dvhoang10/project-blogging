/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1DC071",
        secondary: "#A4D96C",
        blue00: "#00A7B4",
        grayf1: "#F1F1F3",
      },
      backgroundImage: {
        btPrimary: "linear-gradient(107.61deg, #00A7B4 15.59%, #A4D96C 87.25%)",
      },
    },
  },
  plugins: [],
};
