import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaDog } from "react-icons/fa";
import { Menu, X, User, LogOut } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";
import { AnimatePresence, motion as Motion } from "framer-motion";

const Navbar = ({ user, handleLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-linear-to-r from-orange-100 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-md py-2 sm:py-3 px-4 sm:px-6 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-1 sm:gap-2">
          <FaDog className="text-orange-500 dark:text-orange-400 text-2xl sm:text-3xl" />
          <span className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
            PawMart
          </span>
        </Link>

        {/* Middle: Links - Desktop */}
        <div className="hidden md:flex gap-6 text-gray-700 dark:text-gray-300 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-orange-600 dark:text-orange-400 font-semibold border-b-2 border-orange-500 dark:border-orange-400 pb-1"
                : "hover:text-orange-500 dark:hover:text-orange-400"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/pets-supplies"
            className={({ isActive }) =>
              isActive
                ? "text-orange-600 dark:text-orange-400 font-semibold border-b-2 border-orange-500 dark:border-orange-400 pb-1"
                : "hover:text-orange-500 dark:hover:text-orange-400"
            }
          >
            Pets & Supplies
          </NavLink>

          {user && (
            <>
              <NavLink
                to="/add-listing"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-600 dark:text-orange-400 font-semibold border-b-2 border-orange-500 dark:border-orange-400 pb-1"
                    : "hover:text-orange-500 dark:hover:text-orange-400"
                }
              >
                Add Listing
              </NavLink>
              <NavLink
                to="/my-listings"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-600 dark:text-orange-400 font-semibold border-b-2 border-orange-500 dark:border-orange-400 pb-1"
                    : "hover:text-orange-500 dark:hover:text-orange-400"
                }
              >
                My Listings
              </NavLink>
              <NavLink
                to="/my-orders"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-600 dark:text-orange-400 font-semibold border-b-2 border-orange-500 dark:border-orange-400 pb-1"
                    : "hover:text-orange-500 dark:hover:text-orange-400"
                }
              >
                My Orders
              </NavLink>
            </>
          )}
        </div>

        {/* Right: Auth + Theme Toggle */}
        <div className="hidden md:flex gap-2 lg:gap-3 items-center">
          {user ? (
            <ProfileMenu user={user} onLogout={handleLogout} />
          ) : (
            <>
              <Link
                to="/login"
                className="bg-orange-500 dark:bg-orange-600 text-white px-3 lg:px-5 py-2 rounded-lg font-semibold hover:bg-orange-600 dark:hover:bg-orange-700 flex items-center justify-center text-sm lg:text-base"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gray-800 dark:bg-gray-700 text-white px-3 lg:px-5 py-2 rounded-lg font-semibold hover:bg-gray-900 dark:hover:bg-gray-600 flex items-center justify-center text-sm lg:text-base"
              >
                Register
              </Link>
            </>
          )}

          {/* 🌙 Theme Toggle (white moon icon, right side) */}
          <div className="ml-2">
            <DarkModeToggle />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-700 dark:text-gray-300"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-orange-100 dark:border-gray-700">
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
            {user && (
              <>
                <NavLink
                  to="/add-listing"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-600 dark:text-orange-400 font-semibold px-4 py-2"
                      : "text-gray-700 dark:text-gray-300 px-4 py-2 hover:text-orange-500 dark:hover:text-orange-400"
                  }
                >
                  Add Listing
                </NavLink>
                <NavLink
                  to="/my-listings"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-600 dark:text-orange-400 font-semibold px-4 py-2"
                      : "text-gray-700 dark:text-gray-300 px-4 py-2 hover:text-orange-500 dark:hover:text-orange-400"
                  }
                >
                  My Listings
                </NavLink>
                <NavLink
                  to="/my-orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-600 dark:text-orange-400 font-semibold px-4 py-2"
                      : "text-gray-700 dark:text-gray-300 px-4 py-2 hover:text-orange-500 dark:hover:text-orange-400"
                  }
                >
                  My Orders
                </NavLink>
                <div className="px-4">
                  <ProfileMenu
                    user={user}
                    onLogout={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    variant="mobile"
                  />
                </div>
              </>
            )}
            {!user && (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mx-4 bg-orange-500 dark:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 dark:hover:bg-orange-700 text-center"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mx-4 bg-gray-800 dark:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-900 dark:hover:bg-gray-600 text-center"
                >
                  Register
                </Link>
              </>
            )}

            {/* Mobile Theme Toggle */}
            <div className="mx-4 mt-2 flex justify-center">
              <DarkModeToggle afterToggle={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

const ProfileMenu = ({ user, onLogout, variant = "desktop" }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const [avatarError, setAvatarError] = useState(false);

  const displayName = useMemo(
    () => user?.displayName || user?.email?.split("@")[0] || "Pet Lover",
    [user?.displayName, user?.email]
  );

  const email = user?.email || "No email found";

  const fallbackAvatar = useMemo(
    () =>
      `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        displayName
      )}`,
    [displayName]
  );

  const avatarSrc =
    !avatarError && user?.photoURL ? user.photoURL : fallbackAvatar;

  useEffect(() => {
    if (variant !== "desktop") return undefined;
    const handleClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [variant]);

  if (variant === "mobile") {
    return (
      <div className="w-full bg-orange-50/70 dark:bg-gray-800/80 rounded-2xl p-4 border border-orange-100 dark:border-gray-700 text-center space-y-3 shadow-inner">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <img
              src={avatarSrc}
              alt={displayName}
              onError={() => setAvatarError(true)}
              className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
              You
            </span>
          </div>
          <div>
            <p className="text-base font-semibold text-gray-800 dark:text-gray-100">
              {displayName}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 break-all">
              {email}
            </p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full inline-flex items-center justify-center gap-2 bg-orange-500 text-white py-2 rounded-xl font-semibold hover:bg-orange-600 transition-all shadow"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 px-3 py-2 rounded-full border border-orange-100 dark:border-gray-700 shadow hover:shadow-md transition-all"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <img
          src={avatarSrc}
          alt={displayName}
          onError={() => setAvatarError(true)}
          className="w-9 h-9 rounded-full object-cover border-2 border-orange-400 dark:border-orange-500"
        />
        <div className="flex flex-col items-start">
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            {displayName}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-300">
            {email}
          </span>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <Motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-900 border border-orange-100 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden z-50"
          >
            <div className="relative flex flex-col items-center gap-3 px-5 pt-6 pb-5 bg-linear-to-br from-orange-100 via-white to-orange-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
              <div className="relative">
                <img
                  src={avatarSrc}
                  alt={displayName}
                  onError={() => setAvatarError(true)}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                />
                <div className="absolute inset-0 rounded-full border border-orange-400/60 dark:border-orange-500/60 animate-pulse" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {displayName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 break-all">
                  {email}
                </p>
              </div>
            </div>
            <div className="px-5 py-4 bg-white dark:bg-gray-900 flex flex-col gap-3">
              <button
                onClick={() => {
                  setOpen(false);
                  onLogout();
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-all shadow"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
