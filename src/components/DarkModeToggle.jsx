import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const handleToggle = (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleTheme();
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={handleToggle}
      className={`relative inline-flex h-10 w-18 items-center rounded-full border border-transparent transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 ${
        isDark
          ? "bg-gray-900 hover:bg-gray-800"
          : "bg-orange-300 hover:bg-orange-400"
      }`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className="sr-only">Toggle color theme</span>
      <span
        className={`pointer-events-none absolute inset-y-1 left-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow transition-transform duration-300 ${
          isDark
            ? "translate-x-8 text-gray-900"
            : "translate-x-0 text-orange-400"
        }`}
      >
        {isDark ? <Moon size={18} /> : <Sun size={18} />}
      </span>
    </button>
  );
}
