/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // use 'class' based dark mode toggling
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        // Keep your main orange tone consistent (optional)
        orange: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
    },
  },

  plugins: [require("daisyui")],

  daisyui: {
    themes: ["light", "dark"], // use only the basic DaisyUI light/dark pair
    darkTheme: "dark", // ensures class="dark" syncs with DaisyUI dark theme
  },
};
