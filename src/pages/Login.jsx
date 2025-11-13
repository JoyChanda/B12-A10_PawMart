import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase.config";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      toast.success("Logged in successfully! 🎉");
      navigate("/");
    } catch (error) {
      const message =
        error?.code === "auth/invalid-credential"
          ? "Invalid email or password"
          : error?.message || "Failed to login";
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
      toast.success("Signed in with Google!");
      navigate("/");
    } catch (error) {
      toast.error(error?.message || "Failed to login with Google");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-linear-to-r from-orange-100 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-8">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-md border border-orange-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
          Welcome Back 🐾
        </h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <div className="relative mb-4">
            <input
              type={showPw ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
            />
            <button
              type="button"
              aria-label={showPw ? "Hide password" : "Show password"}
              onClick={() => setShowPw((prev) => !prev)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400"
            >
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Motion.button
            type="submit"
            whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
            className="w-full bg-orange-500 dark:bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 dark:hover:bg-orange-700 mb-3 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </Motion.button>
        </form>

        <Motion.button
          whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
          onClick={handleGoogleLogin}
          className="w-full border border-orange-500 dark:border-orange-600 text-orange-500 dark:text-orange-400 py-2 rounded-lg font-semibold hover:bg-orange-50 dark:hover:bg-gray-700 mb-3 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Please wait...
            </>
          ) : (
            "Sign in with Google"
          )}
        </Motion.button>

        <p className="text-center text-sm text-gray-700 dark:text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-orange-600 dark:text-orange-400 font-semibold hover:text-orange-500 dark:hover:text-orange-400"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
