import React, { useEffect, useState } from "react";
import API from "../services/api";
import ListingCard from "../components/ListingCard";
import CategoryCard from "../components/CategoryCard";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      img: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1080&auto=format&fit=crop",
      tagline: "Find Your Furry Friend Today! 🐾",
      subtagline: "Adopt, don’t shop — give a pet a loving home.",
    },
    {
      img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1738",
      tagline: "Because Every Pet Deserves Love and Care.",
      subtagline: "Explore our listings and bring happiness home.",
    },
    {
      img: "https://images.unsplash.com/photo-1551779891-b83901e1f8b3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      tagline: "Happy Pets, Happy Owners! 🐕",
      subtagline: "Find your perfect companion today.",
    },
  ];

  useEffect(() => {
    document.title = "PawMart - Home";
    (async () => {
      try {
        const res = await API.get("/listings", { params: { limit: 6 } });
        setListings(res.data);
      } catch (err) {
        // Only log if it's not a network/connection error
        if (err.code !== "ERR_NETWORK" && err.code !== "ECONNREFUSED") {
          console.error("Error fetching listings:", err);
        }
        // Silently handle connection errors (backend not running)
        setListings([]);
      }
    })();

    // Auto slide every 5 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    { name: "Pets", emoji: "🐶" },
    { name: "Pet Food", emoji: "🍖" },
    { name: "Accessories", emoji: "🧸" },
    { name: "Care Products", emoji: "💊" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-10 space-y-10 sm:space-y-16">
        {/* 🐾 Banner Section */}
        <section className="relative h-[400px] sm:h-[450px] md:h-[500px] overflow-hidden rounded-2xl sm:rounded-3xl shadow-md border border-orange-100 dark:border-gray-700">
          <AnimatePresence mode="wait">
            {slides.map((slide, index) =>
              index === currentSlide ? (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 flex flex-col md:flex-row items-stretch"
                >
                  {/* 🧡 Left side text & buttons */}
                  <div className="z-10 w-full md:w-1/2 px-5 sm:px-7 md:px-12 py-6 sm:py-8 md:py-0 flex flex-col justify-center gap-3 sm:gap-4 text-orange-700 dark:text-orange-400 bg-white/80 dark:bg-gray-800/70 md:bg-transparent rounded-3xl md:rounded-none backdrop-blur-sm md:backdrop-blur-0">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-sm dark:text-orange-300">
                      {slide.tagline}
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 drop-shadow-sm max-w-xl">
                      {slide.subtagline}
                    </p>
                    <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-start">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-auto"
                      >
                        <Link
                          to="/pets-supplies"
                          className="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 dark:bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-600 dark:hover:bg-orange-700 shadow-md transition-all duration-200 text-sm sm:text-base"
                        >
                          Browse Listings
                        </Link>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-auto"
                      >
                        <Link
                          to="/add-listing"
                          className="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border-2 border-orange-500 dark:border-orange-400 text-orange-600 dark:text-orange-400 rounded-lg font-semibold hover:bg-orange-500 dark:hover:bg-orange-600 hover:text-white shadow-md transition-all duration-200 text-sm sm:text-base"
                        >
                          Add Listing
                        </Link>
                      </motion.div>
                    </div>
                  </div>

                  {/* 🐕 Right side image */}
                  <img
                    src={slide.img}
                    alt={slide.tagline}
                    className="w-full md:w-1/2 h-64 sm:h-72 md:h-full object-cover rounded-3xl md:rounded-none"
                  />
                </motion.div>
              ) : null
            )}
          </AnimatePresence>

          {/* ⚪ Dot indicators */}
          <div className="absolute bottom-4 w-full flex justify-center gap-3 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-orange-500 dark:bg-orange-400 scale-110"
                    : "bg-white/70 dark:bg-gray-600/70"
                }`}
              />
            ))}
          </div>
        </section>

        {/* 🧩 Category Section */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 sm:mb-6 text-center px-2">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((c) => (
              <CategoryCard key={c.name} category={c} />
            ))}
          </div>
        </section>

        {/* 🐕 Recent Listings */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 sm:mb-6 text-center px-2">
            Recent Listings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {listings.length > 0 ? (
              listings.map((l) => <ListingCard key={l._id} item={l} />)
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
                No listings found yet.
              </p>
            )}
          </div>
        </section>

        {/* ❤️ Extra Sections */}
        <section className="space-y-6 sm:space-y-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow border border-orange-50 dark:border-gray-700 text-center">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100 mx-auto max-w-2xl">
              Why Adopt from PawMart?
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Adopting saves lives, reduces overpopulation, and gives animals a
              chance for a loving home. Together, we can make the world kinder
              for our furry friends.
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow border border-orange-50 dark:border-gray-700"
          >
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                  Meet Our Pet Heroes
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm leading-relaxed max-w-xl">
                  Stories from the compassionate adopters and caregivers who make
                  PawMart&apos;s mission possible.
                </p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {[
                {
                  name: "Amin",
                  role: "Foster Caregiver",
                  img: "https://randomuser.me/api/portraits/men/75.jpg",
                  story: "Helps senior dogs find loving homes.",
                },
                {
                  name: "Rita",
                  role: "Volunteer",
                  img: "https://randomuser.me/api/portraits/women/44.jpg",
                  story: "Hosts weekend adoption drives.",
                },
                {
                  name: "Mateo",
                  role: "Adopter",
                  img: "https://randomuser.me/api/portraits/men/32.jpg",
                  story: "Rescued two bonded kittens.",
                },
                {
                  name: "Sana",
                  role: "Pet Therapist",
                  img: "https://randomuser.me/api/portraits/women/65.jpg",
                  story: "Guides families through pet integration.",
                },
              ].map((hero, i) => (
                <div
                  key={i}
                  className="p-4 bg-orange-50/50 dark:bg-gray-700 rounded-xl hover:bg-orange-100/70 dark:hover:bg-gray-600 transition flex flex-col items-center text-center"
                >
                  <img
                    src={hero.img}
                    alt={hero.name}
                    className="w-24 h-24 object-cover rounded-full shadow-md"
                  />
                  <p className="mt-3 font-semibold text-gray-800 dark:text-gray-200">
                    {hero.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {hero.role}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {hero.story}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
