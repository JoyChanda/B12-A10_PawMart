import React from "react";
import { Link } from "react-router-dom";
import { FaDog, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF, FaYoutube, FaXTwitter } from "react-icons/fa6";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const usefulLinks = [
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/pets-supplies" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  const serviceLinks = [
    { name: "Adoptions", path: "/pets-supplies" },
    { name: "Pet Care", path: "/about" },
    { name: "Help Center", path: "/help" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, href: "https://facebook.com", label: "Facebook" },
    { icon: <FaXTwitter />, href: "https://twitter.com", label: "Twitter" },
    { icon: <FaInstagram />, href: "https://instagram.com", label: "Instagram" },
    { icon: <FaLinkedinIn />, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Info */}
          <div className="flex flex-col space-y-6">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="p-2 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                <FaDog className="text-white text-xl" />
              </div>
              <span className="text-2xl font-display font-bold text-slate-950 dark:text-white">
                Paw<span className="text-primary-700 dark:text-primary-500">Mart</span>
              </span>
            </Link>
            <p className="text-slate-800 dark:text-slate-400 leading-relaxed font-medium">
              Connecting loving homes with pets in need. We're your trusted platform for pet adoption and premium pet care supplies. 🐾
            </p>
            
            {/* Social Links */}
            <div>
              <p className="text-sm font-bold text-slate-950 dark:text-white mb-3">Follow Us</p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-400 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all duration-300 shadow-sm"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-slate-950 dark:text-white font-display">Quick Links</h4>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.path + link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-700 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-semibold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-slate-950 dark:text-white font-display">Our Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.path + link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-700 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-semibold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-slate-950 dark:text-white font-display">Contact Us</h4>
            <div className="space-y-4">
              <a 
                href="mailto:support@pawmart.com" 
                className="flex items-center gap-3 text-slate-700 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-all">
                  <Mail size={18} />
                </div>
                <span className="font-medium">support@pawmart.com</span>
              </a>
              
              <a 
                href="tel:+1234567890" 
                className="flex items-center gap-3 text-slate-700 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <Phone size={18} />
                </div>
                <span className="font-medium">+1 (234) 567-890</span>
              </a>
              
              <div className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <span className="font-medium leading-relaxed">
                  123 Pet Street, Animal City,<br />CA 94016, USA
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800 py-8 bg-white/50 dark:bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-700 dark:text-slate-400 text-sm font-semibold">
              © {currentYear} <span className="font-bold text-slate-950 dark:text-white">PawMart</span>. All rights reserved. Crafted with ❤️ for pets.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/" className="text-slate-700 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-semibold">
                Privacy Policy
              </Link>
              <Link to="/" className="text-slate-700 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-semibold">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

