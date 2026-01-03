import React from "react";
import { Link } from "react-router-dom";
import { FaDog, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF, FaYoutube, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
          {/* Logo & Info */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-primary-500 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                <FaDog className="text-white text-xl" />
              </div>
              <span className="text-2xl font-display font-bold text-slate-900 dark:text-white">
                Paw<span className="text-primary-500">Mart</span>
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
              PawMart connects pet lovers and fosters a community of adoption, pet
              care, and compassion. Providing the best for your furry friends. 🐾
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: <FaFacebookF />, href: "#" },
                { icon: <FaXTwitter />, href: "#" },
                { icon: <FaInstagram />, href: "#" },
                { icon: <FaLinkedinIn />, href: "#" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-300 shadow-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white font-display">Useful Links</h4>
            <ul className="space-y-3">
              {["Home", "About Us", "Contact", "Terms & Conditions"].map((link) => (
                <li key={link}>
                  <Link
                    to="/"
                    className="text-slate-500 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white font-display">Our Services</h4>
            <ul className="space-y-3">
              {["Pet Adoption", "Pet Supplies", "Pet Training", "Care Tips"].map((link) => (
                <li key={link}>
                  <Link
                    to="/"
                    className="text-slate-500 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white font-display">Newsletter</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Subscribe to get latest updates and offers.
            </p>
            <div className="relative group">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-5 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
              />
              <button className="mt-3 w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-2xl shadow-lg shadow-primary-500/25 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800 py-8 bg-white/50 dark:bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            © {currentYear} <span className="font-bold text-slate-900 dark:text-white">PawMart</span>. Crafted with ❤️ for pets.
          </p>
        </div>
      </div>
    </footer>
  );
}

