import React, { useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase.config";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { motion as Motion } from "framer-motion";
import { User, Mail, Camera, Save, Edit2, X } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    photoURL: ""
  });

  useEffect(() => {
    document.title = "Profile | PawMart";
    if (user) {
      setFormData({
        displayName: user.displayName || "",
        photoURL: user.photoURL || ""
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: formData.displayName.trim(),
        photoURL: formData.photoURL.trim()
      });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      // Force re-render by reloading auth state
      window.location.reload();
    } catch (error) {
      toast.error(error?.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || ""
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 dark:text-white mb-2">
            Profile Settings
          </h1>
          <p className="text-slate-800 dark:text-slate-400 font-medium">
            Manage your account information and preferences
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/25"
          >
            <Edit2 size={18} />
            Edit Profile
          </button>
        )}
      </div>

      {/* Profile Card */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
      >
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-700 relative">
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <img
                src={formData.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                alt={formData.displayName}
                className="w-32 h-32 rounded-2xl border-4 border-white dark:border-slate-800 shadow-xl object-cover"
              />
              {isEditing && (
                <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                  <Camera className="text-white" size={32} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Display Name */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900 dark:text-slate-300 ml-1">
                Display Name
              </label>
              <div className="relative group">
                <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  isEditing ? "text-primary-600" : "text-slate-400"
                }`} size={20} />
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900/50 border rounded-2xl outline-none transition-all text-slate-950 dark:text-white ${
                    isEditing
                      ? "border-primary-600 focus:ring-2 focus:ring-primary-500/20"
                      : "border-slate-200 dark:border-slate-700 cursor-not-allowed"
                  }`}
                />
              </div>
            </div>

            {/* Email (Read-only) */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900 dark:text-slate-300 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none text-slate-950 dark:text-white cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 ml-1">
                Email cannot be changed
              </p>
            </div>

            {/* Photo URL */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900 dark:text-slate-300 ml-1">
                Photo URL
              </label>
              <div className="relative group">
                <Camera className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  isEditing ? "text-primary-600" : "text-slate-400"
                }`} size={20} />
                <input
                  type="url"
                  value={formData.photoURL}
                  onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
                  disabled={!isEditing}
                  placeholder="https://example.com/photo.jpg"
                  className={`w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900/50 border rounded-2xl outline-none transition-all text-slate-950 dark:text-white ${
                    isEditing
                      ? "border-primary-600 focus:ring-2 focus:ring-primary-500/20"
                      : "border-slate-200 dark:border-slate-700 cursor-not-allowed"
                  }`}
                />
              </div>
            </div>

            {/* Account Info (Read-only) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <div>
                <label className="text-sm font-bold text-slate-900 dark:text-slate-300 block mb-2">
                  Account Created
                </label>
                <p className="text-slate-950 dark:text-white font-semibold">
                  {user?.metadata?.creationTime 
                    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : "N/A"
                  }
                </p>
              </div>
              <div>
                <label className="text-sm font-bold text-slate-900 dark:text-slate-300 block mb-2">
                  Last Sign In
                </label>
                <p className="text-slate-950 dark:text-white font-semibold">
                  {user?.metadata?.lastSignInTime
                    ? new Date(user.metadata.lastSignInTime).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : "N/A"
                  }
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/25 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="px-6 py-4 bg-slate-100 dark:bg-slate-700 text-slate-950 dark:text-white font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <X size={18} />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </form>
        </div>
      </Motion.div>

      {/* Additional Info */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8"
      >
        <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-4">Account Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-primary-200 dark:border-primary-700">
            <p className="text-sm font-semibold text-primary-700 dark:text-primary-400 mb-1">Total Listings</p>
            <p className="text-3xl font-bold text-primary-900 dark:text-primary-300">-</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl border border-emerald-200 dark:border-emerald-700">
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-1">Total Orders</p>
            <p className="text-3xl font-bold text-emerald-900 dark:text-emerald-300">-</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-xl border border-amber-200 dark:border-amber-700">
            <p className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-1">Member Since</p>
            <p className="text-xl font-bold text-amber-900 dark:text-amber-300">
              {user?.metadata?.creationTime
                ? new Date(user.metadata.creationTime).getFullYear()
                : "2024"
              }
            </p>
          </div>
        </div>
      </Motion.div>
    </div>
  );
}
