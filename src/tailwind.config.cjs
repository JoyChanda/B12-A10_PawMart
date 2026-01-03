/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6", // Main Primary: Violet
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        secondary: {
          500: "#10b981", // Emerald
        },
        accent: {
          500: "#f59e0b", // Amber
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Outfit", "Inter", "sans-serif"],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },

  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#8b5cf6",
          secondary: "#10b981",
          accent: "#f59e0b",
          neutral: "#1f2937",
          "base-100": "#ffffff",
          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#a78bfa",
          secondary: "#34d399",
          accent: "#fbbf24",
          neutral: "#f3f4f6",
          "base-100": "#0f172a", // Slate 900
          "base-200": "#1e293b", // Slate 800
          "base-300": "#334155", // Slate 700
          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",
        },
      },
    ],
  },
};

