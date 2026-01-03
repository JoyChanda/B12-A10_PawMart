import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaDog } from "react-icons/fa";
import { Menu, X, LogOut, ChevronDown, User as UserIcon, LayoutDashboard } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";
import { AnimatePresence, motion as Motion } from "framer-motion";

const Navbar = ({ user, handleLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/pets-supplies" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Help", path: "/help" },
  ];

  const visibleNavLinks = useMemo(() => {
    if (!user) return navLinks;
    return navLinks.filter(link => !["About", "Contact", "Help"].includes(link.name));
  }, [user]);

  const authLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Add Listing", path: "/dashboard/add-listing" },
    { name: "My Listings", path: "/dashboard/my-listings" },
    { name: "My Orders", path: "/dashboard/my-orders" },
  ];

  return (
    <nav 
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 border-b ${
        scrolled 
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-slate-200 dark:border-slate-800 py-3 shadow-xl" 
          : "bg-white dark:bg-slate-900/80 backdrop-blur-xl border-slate-100 dark:border-slate-800/50 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2.5 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl group-hover:rotate-[15deg] transition-transform duration-500 shadow-lg shadow-primary-500/30">
              <FaDog className="text-white text-2xl" />
            </div>
            <span className="text-2xl font-display font-bold text-slate-950 dark:text-white tracking-tight">
              Paw<span className="text-primary-700 dark:text-primary-500">Mart</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {[...visibleNavLinks, ...(user ? authLinks : [])].map((link) => (
              <NavLink
                key={link.path + link.name}
                to={link.path}
                  className={({ isActive }) =>
                  `px-5 py-2.5 rounded-2xl text-[15px] font-extrabold transition-all duration-300 relative group overflow-hidden ${
                    isActive
                      ? "text-primary-700 dark:text-primary-400"
                      : "text-slate-950 dark:text-slate-300 hover:text-primary-600"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{link.name}</span>
                    {isActive && (
                      <Motion.div 
                        layoutId="navUnderline"
                        className="absolute bottom-1 left-5 right-5 h-1 bg-primary-600 dark:bg-primary-500 rounded-full"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-5">
            <DarkModeToggle />
            <div className="h-8 w-px bg-slate-300 dark:bg-slate-800 mx-1"></div>
            {user ? (
              <ProfileMenu user={user} onLogout={handleLogout} />
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-6 py-2.5 text-[15px] font-extrabold text-slate-900 dark:text-slate-200 hover:text-primary-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-premium px-8 py-3 rounded-2xl text-[15px] dark:shadow-primary-500/20 shadow-primary-600/30"
                >
                  Join Us
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <DarkModeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 text-slate-900 dark:text-slate-300 bg-slate-200/50 dark:bg-slate-800 rounded-2xl transition-all active:scale-90"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <Motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-8 space-y-3">
              {[...visibleNavLinks, ...(user ? authLinks : [])].map((link) => (
                <NavLink
                  key={link.path + link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-6 py-4 rounded-[1.5rem] font-extrabold transition-all ${
                      isActive
                        ? "bg-primary-600 text-white shadow-xl shadow-primary-600/30"
                        : "text-slate-950 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
                {user ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 px-2">
                      <img
                        src={user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${user.displayName}`}
                        className="w-14 h-14 rounded-2xl border-2 border-primary-600 p-0.5"
                        alt=""
                      />
                      <div>
                        <p className="font-extrabold text-xl text-slate-950 dark:text-white leading-tight">{user.displayName}</p>
                        <p className="text-sm text-slate-800 dark:text-slate-400 font-extrabold">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-3 py-4 bg-red-100/50 dark:bg-red-500/10 text-red-700 dark:text-red-400 font-extrabold rounded-2xl border border-red-200 dark:border-red-500/20"
                    >
                      <LogOut size={22} />
                      Terminate Session
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-4 text-center font-extrabold text-slate-950 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-2xl"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-4 text-center font-extrabold text-white bg-primary-600 rounded-2xl shadow-lg shadow-primary-600/30"
                    >
                      Join Now
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};



const ProfileMenu = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-1 pr-3 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
      >
        <img
          src={user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${user.displayName}`}
          className="w-8 h-8 rounded-full border border-primary-400"
          alt=""
        />
        <ChevronDown size={14} className={`transition-transform duration-300 text-slate-700 dark:text-slate-300 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <Motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden"
          >
            <div className="p-5 text-center bg-primary-50 dark:bg-primary-900/10">
              <img
                src={user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${user.displayName}`}
                className="w-16 h-16 rounded-full mx-auto border-4 border-white dark:border-slate-800 shadow-xl"
                alt=""
              />
              <p className="mt-3 font-bold text-slate-900 dark:text-white">{user.displayName}</p>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
            <div className="p-2 space-y-1">
              <Link
                to="/dashboard/profile"
                onClick={() => setOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-2xl transition-colors"
              >
                <UserIcon size={18} />
                My Profile
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-2xl transition-colors"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              <div className="h-px bg-slate-100 dark:bg-slate-700 my-1 mx-2"></div>
              <button
                onClick={() => {
                  onLogout();
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-colors"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;

