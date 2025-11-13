import React from "react";
import { Link } from "react-router-dom";
import { FaDog } from "react-icons/fa";
import { FaFacebookF, FaYoutube, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-orange-100 via-white to-orange-50 border-t border-orange-100 mt-8 sm:mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center justify-items-center">
        {/* 🐶 Logo + Intro */}
        <div className="max-w-xs">
          <div className="flex items-center justify-center gap-3 mb-3">
            <FaDog className="text-orange-500 text-3xl" />
            <h3 className="text-2xl font-extrabold text-gray-800">PawMart</h3>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed max-w-xs">
            PawMart connects pet lovers and fosters a community of adoption, pet
            care, and compassion. 🐾
          </p>
        </div>

        {/* 🔗 Useful Links */}
        <div className="max-w-xs">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">
            Useful Links
          </h4>
          <ul className="space-y-2 text-sm text-gray-700 flex flex-col items-center">
            <li>
              <Link to="/" className="hover:text-orange-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-orange-500">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-orange-500">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-orange-500">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* 🐾 Our Services */}
        <div className="max-w-xs">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">
            Our Services
          </h4>
          <ul className="space-y-2 text-sm text-gray-700 flex flex-col items-center">
            <li>
              <Link to="/adoption" className="hover:text-orange-500">
                Pet Adoption
              </Link>
            </li>
            <li>
              <Link to="/supplies" className="hover:text-orange-500">
                Pet Supplies
              </Link>
            </li>
            <li>
              <Link to="/training" className="hover:text-orange-500">
                Pet Training
              </Link>
            </li>
            <li>
              <Link to="/care-tips" className="hover:text-orange-500">
                Care Tips
              </Link>
            </li>
          </ul>
        </div>

        {/* 🌐 Social Media */}
        <div className="max-w-xs">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">
            Connect With Us
          </h4>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition"
            >
              <FaYoutube />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* 🧾 Bottom Section */}
      <div className="border-t border-orange-100 py-4 text-center text-sm text-gray-800 bg-orange-100">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-orange-500">PawMart</span>. All
        rights reserved.
      </div>
    </footer>
  );
}
