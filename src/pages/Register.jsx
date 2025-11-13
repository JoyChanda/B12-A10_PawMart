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
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [photo, setPhoto] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nav = useNavigate();

  const passValid = (pw) => /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(pw);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = pw.trim();
    const trimmedPhoto = photo.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      toast.error("Please fill in name, email and password.");
      return;
    }

    if (!passValid(trimmedPassword)) {
      toast.error("Password must be 6+ chars with 1 uppercase and 1 lowercase");
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
        photoURL: trimmedPhoto || undefined,
      });
      toast.success("Registered successfully 🎉");
      nav("/");
    } catch (err) {
      toast.error(err?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await signInWithPopup(auth, provider);
      toast.success("Signed in with Google!");
      nav("/");
    } catch (err) {
      toast.error(err?.message || "Google sign-in failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-linear-to-r from-orange-100 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-8">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-md border border-orange-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
          Create Your Account 🐾
        </h2>

        <form onSubmit={handleRegister}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Full Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            autoComplete="name"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
          />

          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            autoComplete="email"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
          />

          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <div className="relative mb-3">
            <input
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              type={showPw ? "text" : "password"}
              placeholder="Password"
              autoComplete="new-password"
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

          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Profile Photo URL{" "}
            <span className="text-xs text-gray-500">(optional)</span>
          </label>
          <input
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            placeholder="https://"
            autoComplete="url"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
          />

          <Motion.button
            type="submit"
            whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
            className="w-full bg-orange-500 dark:bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 dark:hover:bg-orange-700 mb-3 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Creating account...
              </>
            ) : (
              "Register"
            )}
          </Motion.button>
        </form>

        <Motion.button
          whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
          className="w-full border border-orange-500 dark:border-orange-600 text-orange-500 dark:text-orange-400 py-2 rounded-lg font-semibold hover:bg-orange-50 dark:hover:bg-gray-700 mb-3 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          onClick={handleGoogleSignup}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Please wait...
            </>
          ) : (
            "Sign up with Google"
          )}
        </Motion.button>

        <p className="text-center text-sm text-gray-700 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-600 dark:text-orange-400 font-semibold hover:text-orange-500 dark:hover:text-orange-400"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
