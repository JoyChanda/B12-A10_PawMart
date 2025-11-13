import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound404() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "PawMart - 404 Not Found";

    // ✅ Hide Navbar and Footer dynamically when 404 loads
    const navbar = document.querySelector("nav");
    const footer = document.querySelector("footer");

    if (navbar) navbar.style.display = "none";
    if (footer) footer.style.display = "none";

    // ✅ Restore when leaving the page
    return () => {
      if (navbar) navbar.style.display = "";
      if (footer) footer.style.display = "";
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-center px-4">
      {/* Font Awesome warning icon */}
      <i
        className="fa fa-exclamation-circle text-orange-600 text-6xl mb-4 animate-bounce"
        aria-hidden="true"
      ></i>

      {/* 404 Text */}
      <h1 className="text-7xl font-extrabold text-orange-600">404</h1>

      {/* Message */}
      <p className="text-2xl mt-3 text-gray-800 dark:text-gray-100 font-semibold">
        Oops! Page not found.
      </p>
      <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all"
      >
        Go to Home
      </button>
    </div>
  );
}
