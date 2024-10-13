/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        lightBg: "#f3f4f6",
        darkBg: "#1f2937",
        lightText: "#000",
        darkText: "#fff",
        lightCard: "#fff",
        darkCard: "#2d3748",
        blue: {
          500: "#2563eb",
        },
      },
    },
  },
  plugins: [],
};
