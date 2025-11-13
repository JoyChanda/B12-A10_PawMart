import React from "react";
import { Link } from "react-router-dom";
import { FaDog } from "react-icons/fa";
import { FaFacebookF, FaYoutube, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-linear-to-r from-orange-100 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-orange-100 dark:border-gray-700 mt-8 sm:mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center justify-items-center">
        {/* 🐶 Logo + Intro */}
        <div className="max-w-xs">
          <div className="flex items-center justify-center gap-3 mb-3">
            <FaDog className="text-orange-500 dark:text-orange-400 text-3xl" />
            <h3 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100">
              PawMart
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
            PawMart connects pet lovers and fosters a community of adoption, pet
            care, and compassion. 🐾
          </p>
        </div>

        {/* 🔗 Useful Links */}
        <div className="max-w-xs">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
            Useful Links
          </h4>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-400 flex flex-col items-center">
            <li>
              <Link
                to="/"
                className="hover:text-orange-500 dark:hover:text-orange-400"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-orange-500 dark:hover:text-orange-400"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-orange-500 dark:hover:text-orange-400"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="hover:text-orange-500 dark:hover:text-orange-400"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* 🐾 Our Services */}
        <div className="max-w-xs">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
            Our Services
          </h4>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-400 flex flex-col items-center">
            <li>
              <Link
                to="/adoption"
                className="hover:text-orange-500 dark:hover:text-orange-400"
              >
                Pet Adoption
              </Link>
            </li>
            <li>
              <Link
                to="/supplies"
                className="hover:text-orange-500 dark:hover:text-orange-400"
              >
                Pet Supplies
              </Link>
            </li>
            <li>
              <Link
                to="/training"
                className="hover:text-orange-500 dark:hover:text-orange-400"
              >
                Pet Training
              </Link>
            </li>
            <li>
              <Link
                to="/care-tips"
                className="hover:text-orange-500 dark:hover:text-orange-400"
              >
                Care Tips
              </Link>
            </li>
          </ul>
        </div>

        {/* 🌐 Social Media */}
        <div className="max-w-xs">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
            Connect With Us
          </h4>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 bg-orange-500 dark:bg-orange-600 text-white rounded-full flex items-center justify-center hover:bg-orange-600 dark:hover:bg-orange-700 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 bg-orange-500 dark:bg-orange-600 text-white rounded-full flex items-center justify-center hover:bg-orange-600 dark:hover:bg-orange-700 transition"
            >
              <FaYoutube />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 bg-orange-500 dark:bg-orange-600 text-white rounded-full flex items-center justify-center hover:bg-orange-600 dark:hover:bg-orange-700 transition"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* 🧾 Bottom Section */}
      <div className="border-t border-orange-100 dark:border-gray-700 py-4 text-center text-sm text-gray-800 dark:text-gray-300 bg-orange-100 dark:bg-gray-800">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-orange-500 dark:text-orange-400">
          PawMart
        </span>
        . All rights reserved.
      </div>
    </footer>
  );
}
