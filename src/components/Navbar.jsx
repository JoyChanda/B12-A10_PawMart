import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaDog } from "react-icons/fa";
import { Menu, X, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply theme to <html> element
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle function
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <nav className="bg-gradient-to-r from-orange-100 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-md py-3 px-4 sm:px-6 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2">
          <FaDog className="text-orange-500 text-2xl sm:text-3xl" />
          <span className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
            PawMart
          </span>
        </Link>

        {/* Middle: Desktop Links */}
        <div className="hidden md:flex gap-6 text-gray-700 dark:text-gray-300 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-orange-600 dark:text-orange-400 font-semibold border-b-2 border-orange-500 pb-1"
                : "hover:text-orange-500 dark:hover:text-orange-400"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/pets-supplies"
            className={({ isActive }) =>
              isActive
                ? "text-orange-600 dark:text-orange-400 font-semibold border-b-2 border-orange-500 pb-1"
                : "hover:text-orange-500 dark:hover:text-orange-400"
            }
          >
            Pets & Supplies
          </NavLink>
        </div>

        {/* Right: Theme Toggle + Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* 🌙 Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-orange-100 hover:bg-orange-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon size={18} className="text-gray-800" />
            ) : (
              <Sun size={18} className="text-yellow-400" />
            )}
          </button>

          <Link
            to="/login"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-gray-800 dark:bg-gray-100 dark:text-gray-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-900 dark:hover:bg-gray-200 transition"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-700 dark:text-gray-200"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-orange-100 dark:border-gray-700 transition-colors duration-300">
          <div className="flex flex-col gap-4 pt-4">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-orange-600 dark:text-orange-400 font-semibold px-4 py-2"
                  : "text-gray-700 dark:text-gray-300 px-4 py-2 hover:text-orange-500 dark:hover:text-orange-400"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/pets-supplies"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-orange-600 dark:text-orange-400 font-semibold px-4 py-2"
                  : "text-gray-700 dark:text-gray-300 px-4 py-2 hover:text-orange-500 dark:hover:text-orange-400"
              }
            >
              Pets & Supplies
            </NavLink>

            <button
              onClick={toggleTheme}
              className="mx-4 bg-orange-100 hover:bg-orange-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg font-semibold transition"
            >
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>

            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="mx-4 bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 text-center"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="mx-4 bg-gray-800 dark:bg-gray-100 dark:text-gray-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-900 dark:hover:bg-gray-200 text-center"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
