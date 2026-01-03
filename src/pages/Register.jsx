import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../firebase.config";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion as Motion } from "framer-motion";
import { Eye, EyeOff, User, Mail, Lock, Camera, Loader2, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [photo, setPhoto] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const nav = useNavigate();

  const passValid = (pw) => /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(pw);
  const emailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const urlValid = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Real-time validation
  const validateField = (field, value) => {
    const newErrors = { ...errors };

    switch (field) {
      case "name":
        if (!value.trim()) {
          newErrors.name = "Name is required";
        } else if (value.trim().length < 3) {
          newErrors.name = "Name must be at least 3 characters";
        } else {
          delete newErrors.name;
        }
        break;
      
      case "email":
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (!emailValid(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;
      
      case "password":
        if (!value) {
          newErrors.password = "Password is required";
        } else if (value.length < 6) {
          newErrors.password = "Password must be at least 6 characters";
        } else if (!passValid(value)) {
          newErrors.password = "Must contain 1 uppercase and 1 lowercase letter";
        } else {
          delete newErrors.password;
        }
        break;
      
      case "photo":
        if (!value.trim()) {
          newErrors.photo = "Photo URL is required";
        } else if (!urlValid(value)) {
          newErrors.photo = "Please enter a valid URL";
        } else {
          delete newErrors.photo;
        }
        break;
      
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAll = () => {
    validateField("name", name);
    validateField("email", email);
    validateField("password", pw);
    validateField("photo", photo);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Mark all fields as touched
    setTouched({ name: true, email: true, password: true, photo: true });

    // Validate all fields
    const isValid = validateAll();
    if (!isValid) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = pw.trim();
    const trimmedPhoto = photo.trim();

    setIsSubmitting(true);
    try {
      const resp = await createUserWithEmailAndPassword(
        auth,
        trimmedEmail,
        trimmedPassword
      );
      await updateProfile(resp.user, {
        displayName: trimmedName,
        photoURL: trimmedPhoto,
      });
      toast.success("Account created successfully! 🎉");
      nav("/");
    } catch (err) {
      let message = "Failed to create account";
      
      switch (err?.code) {
        case "auth/email-already-in-use":
          message = "This email is already registered. Please login instead.";
          break;
        case "auth/weak-password":
          message = "Password is too weak. Please use a stronger password.";
          break;
        case "auth/invalid-email":
          message = "Invalid email address";
          break;
        case "auth/operation-not-allowed":
          message = "Email/password accounts are not enabled";
          break;
        case "auth/network-request-failed":
          message = "Network error. Please check your connection.";
          break;
        default:
          message = err?.message || message;
      }
      
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleRegister = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await signInWithPopup(auth, provider);
      toast.success("Successfully signed in with Google!");
      nav("/");
    } catch (err) {
      let message = "Failed to sign in with Google";
      
      if (err?.code === "auth/popup-closed-by-user") {
        message = "Sign-in popup was closed";
      } else if (err?.code === "auth/network-request-failed") {
        message = "Network error. Please check your connection.";
      }
      
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldStatus = (field) => {
    if (!touched[field]) return null;
    return errors[field] ? "error" : "success";
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
      <Motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="bg-white dark:bg-slate-800/50 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-12 shadow-2xl shadow-primary-500/10 border border-slate-100 dark:border-slate-700/50">
          {/* Header */}
          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/30 mb-2">
              <Sparkles size={32} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 dark:text-white">
              Create Account
            </h2>
            <p className="text-slate-800 dark:text-slate-400 font-medium">
              Join PawMart and start connecting with your future pets!
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
               <label className="text-sm font-bold text-slate-900 dark:text-slate-300 ml-1">Full Name</label>
              <div className="relative group">
                <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  errors.name ? "text-red-500" : getFieldStatus("name") === "success" ? "text-emerald-500" : "text-slate-400 group-focus-within:text-primary-600"
                }`} size={20} />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (touched.name) validateField("name", e.target.value);
                  }}
                  onBlur={() => {
                    setTouched({ ...touched, name: true });
                    validateField("name", name);
                  }}
                  className={`w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900/50 border rounded-2xl outline-none transition-all text-slate-950 dark:text-white ${
                    errors.name && touched.name
                      ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : getFieldStatus("name") === "success"
                      ? "border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      : "border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600"
                  }`}
                />
                {getFieldStatus("name") === "success" && (
                  <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500" size={20} />
                )}
              </div>
              {errors.name && touched.name && (
                <Motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1 ml-1"
                >
                  <AlertCircle size={14} />
                  {errors.name}
                </Motion.p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
               <label className="text-sm font-bold text-slate-900 dark:text-slate-300 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  errors.email ? "text-red-500" : getFieldStatus("email") === "success" ? "text-emerald-500" : "text-slate-400 group-focus-within:text-primary-600"
                }`} size={20} />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (touched.email) validateField("email", e.target.value);
                  }}
                  onBlur={() => {
                    setTouched({ ...touched, email: true });
                    validateField("email", email);
                  }}
                  className={`w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900/50 border rounded-2xl outline-none transition-all text-slate-950 dark:text-white ${
                    errors.email && touched.email
                      ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : getFieldStatus("email") === "success"
                      ? "border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      : "border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600"
                  }`}
                />
                {getFieldStatus("email") === "success" && (
                  <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500" size={20} />
                )}
              </div>
              {errors.email && touched.email && (
                <Motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1 ml-1"
                >
                  <AlertCircle size={14} />
                  {errors.email}
                </Motion.p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
               <label className="text-sm font-bold text-slate-900 dark:text-slate-300 ml-1">Password</label>
              <div className="relative group">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  errors.password ? "text-red-500" : getFieldStatus("password") === "success" ? "text-emerald-500" : "text-slate-400 group-focus-within:text-primary-600"
                }`} size={20} />
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={pw}
                  onChange={(e) => {
                    setPw(e.target.value);
                    if (touched.password) validateField("password", e.target.value);
                  }}
                  onBlur={() => {
                    setTouched({ ...touched, password: true });
                    validateField("password", pw);
                  }}
                  className={`w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-900/50 border rounded-2xl outline-none transition-all text-slate-950 dark:text-white ${
                    errors.password && touched.password
                      ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : getFieldStatus("password") === "success"
                      ? "border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      : "border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary-600 transition-colors"
                >
                  {showPw ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && touched.password && (
                <Motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1 ml-1"
                >
                  <AlertCircle size={14} />
                  {errors.password}
                </Motion.p>
              )}
              {!errors.password && touched.password && (
                <p className="text-xs text-slate-500 dark:text-slate-400 ml-1">
                  Must be 6+ characters with 1 uppercase & 1 lowercase
                </p>
              )}
            </div>

            {/* Photo URL */}
            <div className="space-y-2">
               <label className="text-sm font-bold text-slate-900 dark:text-slate-300 ml-1">Photo URL</label>
              <div className="relative group">
                <Camera className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  errors.photo ? "text-red-500" : getFieldStatus("photo") === "success" ? "text-emerald-500" : "text-slate-400 group-focus-within:text-primary-600"
                }`} size={20} />
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={photo}
                  onChange={(e) => {
                    setPhoto(e.target.value);
                    if (touched.photo) validateField("photo", e.target.value);
                  }}
                  onBlur={() => {
                    setTouched({ ...touched, photo: true });
                    validateField("photo", photo);
                  }}
                  className={`w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900/50 border rounded-2xl outline-none transition-all text-slate-950 dark:text-white ${
                    errors.photo && touched.photo
                      ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : getFieldStatus("photo") === "success"
                      ? "border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      : "border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600"
                  }`}
                />
                {getFieldStatus("photo") === "success" && (
                  <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500" size={20} />
                )}
              </div>
              {errors.photo && touched.photo && (
                <Motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1 ml-1"
                >
                  <AlertCircle size={14} />
                  {errors.photo}
                </Motion.p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-premium py-4 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={20} />
                  <span>Creating account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <button
            onClick={handleGoogleRegister}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-950 dark:text-slate-200 font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-primary-600 transition-all shadow-sm group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
              className="w-5 h-5 group-hover:scale-110 transition-transform" 
              alt="Google" 
            />
            {isSubmitting ? "Connecting..." : "Continue with Google"}
          </button>

          {/* Login Link */}
           <p className="text-center mt-8 text-slate-800 dark:text-slate-400 font-medium">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary-600 dark:text-primary-500 font-bold hover:text-primary-700 dark:hover:text-primary-400 underline underline-offset-4 transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </Motion.div>
    </div>
  );
}
