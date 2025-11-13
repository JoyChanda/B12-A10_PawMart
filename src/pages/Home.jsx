import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      img: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1080&auto=format&fit=crop",
      tagline: "Find Your Furry Friend Today! 🐾",
      subtagline: "Adopt, don’t shop — give a pet a loving home.",
    },
    {
      img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1738",
      tagline: "Because Every Pet Deserves Love and Care.",
      subtagline: "Explore our listings and bring happiness home.",
    },
    {
      img: "https://images.unsplash.com/photo-1551779891-b83901e1f8b3?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
      tagline: "Happy Pets, Happy Owners! 🐕",
      subtagline: "Find your perfect companion today.",
    },
  ];

  const categories = [
    { name: "Pets", emoji: "🐶" },
    { name: "Pet Food", emoji: "🍖" },
    { name: "Accessories", emoji: "🧸" },
    { name: "Care Products", emoji: "💊" },
  ];

  useEffect(() => {
    document.title = "PawMart - Home";
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        {/* 🐾 Banner Section */}
        <section className="relative h-[400px] sm:h-[500px] overflow-hidden rounded-3xl shadow-lg border border-orange-100 dark:border-gray-700">
          <AnimatePresence mode="wait">
            {slides.map(
              (slide, index) =>
                index === currentSlide && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 flex flex-col md:flex-row items-stretch"
                  >
                    <div className="z-10 w-full md:w-1/2 px-8 py-10 flex flex-col justify-center gap-4 bg-white/80 dark:bg-gray-800/70 backdrop-blur-md">
                      <h1 className="text-3xl md:text-5xl font-extrabold text-orange-600 dark:text-orange-400">
                        {slide.tagline}
                      </h1>
                      <p className="text-gray-700 dark:text-gray-300 text-lg">
                        {slide.subtagline}
                      </p>
                      <div className="flex gap-4 mt-4">
                        <Link
                          to="/"
                          className="px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition"
                        >
                          Browse Now
                        </Link>
                        <Link
                          to="/"
                          className="px-5 py-3 border-2 border-orange-500 dark:border-orange-400 text-orange-500 dark:text-orange-300 hover:bg-orange-500 hover:text-white rounded-lg font-semibold transition"
                        >
                          Add Listing
                        </Link>
                      </div>
                    </div>
                    <img
                      src={slide.img}
                      alt={slide.tagline}
                      className="w-full md:w-1/2 object-cover h-full"
                    />
                  </motion.div>
                )
            )}
          </AnimatePresence>

          {/* Dot Indicators */}
          <div className="absolute bottom-4 w-full flex justify-center gap-3 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === i
                    ? "bg-orange-500 scale-110"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </section>

        {/* 🧩 Category Section */}
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {categories.map((c) => (
              <div
                key={c.name}
                className="p-6 bg-orange-50 dark:bg-gray-800 rounded-2xl shadow hover:scale-105 transition text-center border border-orange-100 dark:border-gray-700"
              >
                <p className="text-4xl">{c.emoji}</p>
                <p className="mt-2 font-semibold text-gray-700 dark:text-gray-200">
                  {c.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ❤️ Why Adopt Section */}
        <section className="bg-orange-50 dark:bg-gray-800 p-8 rounded-3xl shadow text-center">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Why Adopt from PawMart?
          </h3>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Adopting saves lives, reduces overpopulation, and gives animals a
            chance for a loving home. Together, we can make the world kinder for
            our furry friends.
          </p>
        </section>
      </div>
    </div>
  );
}
