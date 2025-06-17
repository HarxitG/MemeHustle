/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: "#39ff14",
        cyberblue: "#00ffff",
        glitch: "#ff00ff",
      },
    },
  },
  plugins: [],
};
