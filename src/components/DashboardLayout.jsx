import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  PlusCircle, 
  Package, 
  ShoppingCart, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X,
  ChevronDown,
  Settings,
  Bell
} from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";
import { FaDog } from "react-icons/fa";

export default function DashboardLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const menuItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Overview", end: true },
    { path: "/dashboard/add-listing", icon: PlusCircle, label: "Add Listing" },
    { path: "/dashboard/my-listings", icon: Package, label: "My Listings" },
    { path: "/dashboard/my-orders", icon: ShoppingCart, label: "My Orders" },
    { path: "/dashboard/profile", icon: UserIcon, label: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 z-40">
        <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-950 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <NavLink to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-gradient-to-br dark:from-primary-600 dark:to-primary-700 flex items-center justify-center text-slate-950 dark:text-white shadow-md dark:shadow-lg group-hover:rotate-[15deg] transition-transform duration-500">
                <FaDog size={20} />
              </div>
              <span className="font-display font-bold text-xl text-slate-950 dark:text-white hidden sm:block tracking-tight">
                Paw<span className="text-primary-700 dark:text-primary-500">Mart</span>
              </span>
            </NavLink>
          </div>

          {/* Right: Notifications & Profile */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <DarkModeToggle />

            {/* Notifications */}
            <button className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                <img
                  src={user?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                  alt={user?.displayName}
                  className="w-8 h-8 rounded-lg"
                />
                <div className="hidden md:block text-left">
                  <p className="text-sm font-bold text-slate-950 dark:text-white leading-tight">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Member</p>
                </div>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {profileOpen && (
                  <Motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                  >
                    <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                      <p className="font-bold text-slate-950 dark:text-white">{user?.displayName}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                    </div>
                    <div className="p-2">
                      <NavLink
                        to="/dashboard/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <UserIcon size={18} />
                        <span className="font-semibold">Profile</span>
                      </NavLink>
                      <NavLink
                        to="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <LayoutDashboard size={18} />
                        <span className="font-semibold">Dashboard</span>
                      </NavLink>
                      <NavLink
                        to="/"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <Settings size={18} />
                        <span className="font-semibold">Settings</span>
                      </NavLink>
                    </div>
                    <div className="p-2 border-t border-slate-200 dark:border-slate-700">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <LogOut size={18} />
                        <span className="font-semibold">Logout</span>
                      </button>
                    </div>
                  </Motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-20">
        {/* Sidebar for Desktop */}
        <aside className="hidden lg:block sticky top-20 h-[calc(100vh-80px)] w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto z-30">
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${
                    isActive
                      ? "bg-primary-50 text-primary-700 dark:bg-primary-600 dark:text-white shadow-sm dark:shadow-primary-600/25"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`
                }
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Sidebar for Mobile */}
        <AnimatePresence>
          {sidebarOpen && (
            <Motion.aside
              initial={{ x: -288 }}
              animate={{ x: 0 }}
              exit={{ x: -288 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-20 left-0 bottom-0 w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 overflow-y-auto z-30"
            >
              <nav className="p-4 space-y-2">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${
                        isActive
                          ? "bg-primary-50 text-primary-700 dark:bg-primary-600 dark:text-white shadow-sm dark:shadow-primary-600/25"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`
                    }
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </Motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
        />
      )}
    </div>
  );
}
