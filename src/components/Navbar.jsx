import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaDog } from "react-icons/fa";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-orange-100 via-white to-orange-50 shadow-md py-3 px-4 sm:px-6 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2">
          <FaDog className="text-orange-500 text-2xl sm:text-3xl" />
          <span className="text-xl sm:text-2xl font-bold text-gray-800">
            PawMart
          </span>
        </Link>

        {/* Middle: Desktop Links */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-orange-600 font-semibold border-b-2 border-orange-500 pb-1"
                : "hover:text-orange-500"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/pets-supplies"
            className={({ isActive }) =>
              isActive
                ? "text-orange-600 font-semibold border-b-2 border-orange-500 pb-1"
                : "hover:text-orange-500"
            }
          >
            Pets & Supplies
          </NavLink>

          {/* Uncomment if needed later
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-orange-600 font-semibold border-b-2 border-orange-500 pb-1"
                : "hover:text-orange-500"
            }
          >
            About
          </NavLink> */}
        </div>

        {/* Right: Auth Buttons */}
        <div className="hidden md:flex gap-3">
          <Link
            to="/login"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-900 transition"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-700"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-orange-100">
          <div className="flex flex-col gap-4 pt-4">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-orange-600 font-semibold px-4 py-2"
                  : "text-gray-700 px-4 py-2 hover:text-orange-500"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/pets-supplies"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-orange-600 font-semibold px-4 py-2"
                  : "text-gray-700 px-4 py-2 hover:text-orange-500"
              }
            >
              Pets & Supplies
            </NavLink>

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
              className="mx-4 bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-900 text-center"
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
