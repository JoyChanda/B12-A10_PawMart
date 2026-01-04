import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../firebase.config";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import { motion as Motion } from "framer-motion";
import { Eye, EyeOff, User, Mail, Lock, Camera, Loader2, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
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
        if (confirmPw && value !== confirmPw) {
          newErrors.confirmPassword = "Passwords do not match";
        } else if (confirmPw && value === confirmPw) {
          delete newErrors.confirmPassword;
        }
        break;
      
      case "confirmPassword":
        if (!value) {
          newErrors.confirmPassword = "Please confirm your password";
        } else if (value !== pw) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
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
    const nameValidResult = validateField("name", name);
    const emailValidResult = validateField("email", email);
    const pwValidResult = validateField("password", pw);
    const confirmPwValidResult = validateField("confirmPassword", confirmPw);
    const photoValidResult = validateField("photo", photo);
    
    return Object.keys(errors).length === 0; 
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setTouched({ name: true, email: true, password: true, confirmPassword: true, photo: true });

    if (pw !== confirmPw) {
        toast.error("Passwords do not match!");
        return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = pw.trim();
    const trimmedPhoto = photo.trim();

    // Check errors after setting touched
    const finalErrors = {};
    if (!trimmedName) finalErrors.name = "Name is required";
    if (!trimmedEmail || !emailValid(trimmedEmail)) finalErrors.email = "Valid email is required";
    if (!trimmedPassword || !passValid(trimmedPassword)) finalErrors.password = "Valid password is required";
    if (trimmedPassword !== confirmPw) finalErrors.confirmPassword = "Passwords do not match";
    if (!trimmedPhoto || !urlValid(trimmedPhoto)) finalErrors.photo = "Valid photo URL is required";

    if (Object.keys(finalErrors).length > 0) {
        setErrors(finalErrors);
        toast.error("Please fix the errors before submitting");
        return;
    }

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

      await API.post("/users", {
        name: trimmedName,
        email: trimmedEmail,
        photoURL: trimmedPhoto,
        role: "user"
      });

      toast.success("Account created successfully! 🎉");
      nav("/");
    } catch (err) {
      let message = "Failed to create account";
      switch (err?.code) {
        case "auth/email-already-in-use": message = "This email is already registered."; break;
        case "auth/weak-password": message = "Password is too weak."; break;
        default: message = err?.message || message;
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
      const result = await signInWithPopup(auth, provider);
      await API.post("/users", {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        role: "user"
      });
      toast.success("Successfully signed in with Google!");
      nav("/");
    } catch (err) {
      toast.error("Failed to sign in with Google");
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
      <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
        <div className="bg-white dark:bg-slate-800/50 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-12 shadow-2xl shadow-primary-500/10 border border-slate-100 dark:border-slate-700/50">
          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/30 mb-2">
              <Sparkles size={32} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 dark:text-white">Create Account</h2>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
               <label className="text-sm font-bold text-slate-900 dark:text-slate-300 ml-1">Full Name</label>
              <div className="relative group">
                <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.name ? "text-red-500" : getFieldStatus("name") === "success" ? "text-emerald-500" : "text-slate-400 group-focus-within:text-primary-600"}`} size={20} />
                <input type="text" placeholder="John Doe" value={name} onChange={(e) => { setName(e.target.value); if (touched.name) validateField("name", e.target.value); }} onBlur={() => { setTouched({ ...touched, name: true }); validateField("name", name); }} className={`w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900/50 border rounded-2xl outline-none transition-all text-slate-950 dark:text-white ${errors.name && touched.name ? "border-red-500 focus:ring-2 focus:ring-red-500/20" : getFieldStatus("name") === "success" ? "border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" : "border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600"}`} />
              </div>
            </div>

            <div className="space-y-2">
               <label className="text-sm font-bold text-slate-900 dark:text-slate-300 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.email ? "text-red-500" : getFieldStatus("email") === "success" ? "text-emerald-500" : "text-slate-400 group-focus-within:text-primary-600"}`} size={20} />
                <input type="email" placeholder="name@example.com" value={email} onChange={(e) => { setEmail(e.target.value); if (touched.email) validateField("email", e.target.value); }} onBlur={() => { setTouched({ ...touched, email: true }); validateField("email", email); }} className={`w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900/50 border rounded-2xl outline-none transition-all text-slate-950 dark:text-white ${errors.email && touched.email ? "border-red-500 focus:ring-2 focus:ring-red-500/20" : getFieldStatus("email") === "success" ? "border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" : "border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600"}`} />
              </div>
            </div>

            <div className="space-y-2">
               <label className="text-sm font-bold text-slate-900 dark:text-slate-300 ml-1">Password</label>
              <div className="relative group">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.password ? "text-red-500" : getFieldStatus("password") === "success" ? "text-emerald-500" : "text-slate-400 group-focus-within:text-primary-600"}`} size={20} />
                <input type={showPw ? "text" : "password"} placeholder="••••••••" value={pw} onChange={(e) => { setPw(e.target.value); if (touched.password) validateField("password", e.target.value); }} onBlur={() => { setTouched({ ...touched, password: true }); validateField("password", pw); }} className={`w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-900/50 border rounded-2xl outline-none transition-all text-slate-950 dark:text-white ${errors.password && touched.password ? "border-red-500 focus:ring-2 focus:ring-red-500/20" : getFieldStatus("password") === "success" ? "border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" : "border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600"}`} />
                <button type="button" onClick={() => setShowPw((prev) => !prev)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary-600 transition-colors">
                  {showPw ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && touched.password && <p className="text-xs text-red-500 ml-1">{errors.password}</p>}
            </div>

            <div className="space-y-2">
               <label className="text-sm font-bold text-slate-900 dark:text-slate-300 ml-1">Confirm Password</label>
              <div className="relative group">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.confirmPassword ? "text-red-500" : getFieldStatus("confirmPassword") === "success" ? "text-emerald-500" : "text-slate-400 group-focus-within:text-primary-600"}`} size={20} />
                <input type={showPw ? "text" : "password"} placeholder="••••••••" value={confirmPw} onChange={(e) => { setConfirmPw(e.target.value); if (touched.confirmPassword) validateField("confirmPassword", e.target.value); }} onBlur={() => { setTouched({ ...touched, confirmPassword: true }); validateField("confirmPassword", confirmPw); }} className={`w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-900/50 border rounded-2xl outline-none transition-all text-slate-950 dark:text-white ${errors.confirmPassword && touched.confirmPassword ? "border-red-500 focus:ring-2 focus:ring-red-500/20" : getFieldStatus("confirmPassword") === "success" ? "border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" : "border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600"}`} />
              </div>
              {errors.confirmPassword && touched.confirmPassword && <p className="text-xs text-red-500 ml-1">{errors.confirmPassword}</p>}
            </div>

            <div className="space-y-2">
               <label className="text-sm font-bold text-slate-900 dark:text-slate-300 ml-1">Photo URL</label>
              <div className="relative group">
                <Camera className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.photo ? "text-red-500" : getFieldStatus("photo") === "success" ? "text-emerald-500" : "text-slate-400 group-focus-within:text-primary-600"}`} size={20} />
                <input type="url" placeholder="https://example.com/photo.jpg" value={photo} onChange={(e) => { setPhoto(e.target.value); if (touched.photo) validateField("photo", e.target.value); }} onBlur={() => { setTouched({ ...touched, photo: true }); validateField("photo", photo); }} className={`w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900/50 border rounded-2xl outline-none transition-all text-slate-950 dark:text-white ${errors.photo && touched.photo ? "border-red-500 focus:ring-2 focus:ring-red-500/20" : getFieldStatus("photo") === "success" ? "border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" : "border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600"}`} />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full btn-premium py-4 text-lg disabled:opacity-70 disabled:cursor-not-allowed">
              {isSubmitting ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-700"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-4 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">Or continue with</span></div>
          </div>

          <button onClick={handleGoogleRegister} disabled={isSubmitting} className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-950 dark:text-slate-200 font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-primary-600 transition-all shadow-sm group disabled:opacity-70 disabled:cursor-not-allowed">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Google" />
            Continue with Google
          </button>

           <p className="text-center mt-8 text-slate-800 dark:text-slate-400 font-medium">
            Already have an account? <Link to="/login" className="text-primary-600 dark:text-primary-500 font-bold hover:text-primary-700 dark:hover:text-primary-400 underline underline-offset-4 transition-colors">Sign in here</Link>
          </p>
        </div>
      </Motion.div>
    </div>
  );
}
