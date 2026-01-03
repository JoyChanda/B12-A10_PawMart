import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from "firebase/auth";
import { auth, provider } from "../firebase.config";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2, Mail, Lock, Sparkles, UserCheck, AlertCircle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Demo User Auto-Login with Registration Fallback
  const handleDemoLogin = async () => {
    if (isSubmitting) return;
    
    const demoEmail = "demo@pawmart.com";
    const demoPassword = "Demo123"; // Updated to meet password criteria (uppercase + lowercase)
    
    setErrors({});
    setIsSubmitting(true);
    const toastId = toast.loading("Accessing demo account...");
    
    try {
      // 1. Try to Login
      await signInWithEmailAndPassword(auth, demoEmail, demoPassword);
      toast.success("Welcome back to Demo Mode! 🚀", { id: toastId });
      navigate("/");
    } catch (error) {
      // 2. If user doesn't exist, try to Register
      if (error.code === "auth/user-not-found" || error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, demoEmail, demoPassword);
          await updateProfile(userCredential.user, {
            displayName: "Demo User",
            photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Demo"
          });
          toast.success("Demo account initialized! Enjoy PawMart. 🐾", { id: toastId });
          navigate("/");
        } catch (regError) {
          // If even registration fails (maybe email taken with different password)
          toast.error("Demo access failed. Please try manual registration.", { id: toastId });
          setIsSubmitting(false);
          console.error("Demo registration error:", regError);
        }
      } else {
        toast.error("Authentication system busy. Please try later.", { id: toastId });
        setIsSubmitting(false);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    
    // Validate form
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      toast.success("Welcome back! 🎉");
      navigate("/");
    } catch (error) {
      let message = "Failed to login";
      
      switch (error?.code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
          message = "Invalid email or password";
          break;
        case "auth/too-many-requests":
          message = "Too many failed attempts. Please try again later.";
          break;
        case "auth/network-request-failed":
          message = "Network error. Please check your connection.";
          break;
        default:
          message = error?.message || message;
      }
      
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await signInWithPopup(auth, provider);
      toast.success("Successfully signed in with Google!");
      navigate("/");
    } catch (error) {
      let message = "Failed to login with Google";
      
      if (error?.code === "auth/popup-closed-by-user") {
        message = "Sign-in popup was closed";
      } else if (error?.code === "auth/network-request-failed") {
        message = "Network error. Please check your connection.";
      }
      
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
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
              Welcome Back
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Pick up where you left off. Your furry friends are waiting!
            </p>
          </div>

          {/* Demo Credentials Button */}
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={isSubmitting}
            className="w-full mb-6 flex items-center justify-center gap-2 px-6 py-3 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-700 text-amber-800 dark:text-amber-400 font-bold rounded-xl hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-all disabled:opacity-50"
          >
            <UserCheck size={20} />
            Try Demo Account
          </button>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  errors.email ? "text-red-500" : "text-slate-400 group-focus-within:text-primary-600"
                }`} size={20} />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  className={`w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900/50 border rounded-2xl outline-none transition-all text-slate-950 dark:text-white ${
                    errors.email
                      ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600"
                  }`}
                />
              </div>
              {errors.email && (
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
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Password</label>
              <div className="relative group">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  errors.password ? "text-red-500" : "text-slate-400 group-focus-within:text-primary-600"
                }`} size={20} />
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: "" });
                  }}
                  className={`w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-900/50 border rounded-2xl outline-none transition-all text-slate-950 dark:text-white ${
                    errors.password
                      ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
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
              {errors.password && (
                <Motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1 ml-1"
                >
                  <AlertCircle size={14} />
                  {errors.password}
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
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
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
            onClick={handleGoogleLogin}
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

          {/* Register Link */}
          <p className="text-center mt-8 text-slate-600 dark:text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary-600 dark:text-primary-500 font-bold hover:text-primary-700 dark:hover:text-primary-400 underline underline-offset-4 transition-colors"
            >
              Create one for free
            </Link>
          </p>
        </div>
      </Motion.div>
    </div>
  );
};

export default Login;

