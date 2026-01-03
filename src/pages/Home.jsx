import React, { useEffect, useState } from "react";
import API from "../services/api";
import ListingCard from "../components/ListingCard";
import CategoryCard from "../components/CategoryCard";
import { Link } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Heart, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      img: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1200&auto=format&fit=crop",
      tagline: "Find Your Furry Friend Today!",
      subtagline: "Adopt, don’t shop — give a pet a loving home and change a life forever.",
    },
    {
      img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1200&auto=format&fit=crop",
      tagline: "Premium Care for Every Pet",
      subtagline: "Explore our curated listings of high-quality supplies and accessories.",
    },
    {
      img: "https://images.unsplash.com/photo-1551779891-b83901e1f8b3?q=80&w=1200&auto=format&fit=crop",
      tagline: "Happy Pets, Happy Life",
      subtagline: "Join our community of pet lovers and find the perfect companion.",
    },
  ];

  useEffect(() => {
    document.title = "PawMart | Premium Pet Adoption & Supplies";
    (async () => {
      try {
        const res = await API.get("/listings", { params: { limit: 6 } });
        setListings(res.data);
      } catch (err) {
        setListings([]);
      }
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const categories = [
    { name: "Pets", emoji: "🐶" },
    { name: "Pet Food", emoji: "🍖" },
    { name: "Accessories", emoji: "🧸" },
    { name: "Care Products", emoji: "💊" },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 transition-colors duration-500 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-bold text-sm border border-primary-100 dark:border-primary-800 animate-fade-in">
              <Sparkles size={16} />
              <span>Pet Services Platform</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Where Pets Find <span className="text-primary-500">Perfect</span> Homes.
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
              PawMart is the leading community for pet adoption and premium supplies. 
              We bridge the gap between pet lovers and their future companions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/pets-supplies"
                className="btn-premium flex items-center gap-2 text-lg px-8 py-4"
              >
                Explore Marketplace
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/add-listing"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
              >
                List a Pet/Item
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img 
                    key={i}
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} 
                    className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900"
                    alt=""
                  />
                ))}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                <span className="font-bold text-slate-900 dark:text-white">2k+</span> Pet Lovers Joined
              </p>
            </div>
          </Motion.div>

          <Motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary-500/20 border-8 border-white dark:border-slate-800">
              <AnimatePresence mode="wait">
                <Motion.img
                  key={currentSlide}
                  src={slides[currentSlide].img}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="w-full aspect-[4/5] lg:aspect-square object-cover"
                />
              </AnimatePresence>
            </div>
            
            {/* Floating Cards */}
            <Motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -right-6 z-20 glass-card p-4 rounded-2xl shadow-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-secondary-500 rounded-lg flex items-center justify-center text-white">
                <Heart size={20} fill="currentColor" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Health Checked</p>
                <p className="font-bold text-slate-900 dark:text-white">Certified Pets</p>
              </div>
            </Motion.div>

            <Motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 z-20 glass-card p-4 rounded-2xl shadow-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center text-white">
                <Zap size={20} fill="currentColor" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Fast Response</p>
                <p className="font-bold text-slate-900 dark:text-white">Verified Sellers</p>
              </div>
            </Motion.div>
          </Motion.div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 py-20">
        {/* Categories Section */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white">Browse Categories</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Find exactly what your pet needs with our curated categories.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((c) => (
              <CategoryCard key={c.name} category={c} />
            ))}
          </div>
        </section>

        {/* Featured Listings */}
        <section className="space-y-12">
          <div className="flex flex-col sm:flex-row items-end justify-between gap-6">
            <div className="space-y-4 text-center sm:text-left">
              <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white">Recent Listings</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-xl">
                The latest furry friends and pet supplies added to our marketplace.
              </p>
            </div>
            <Link to="/pets-supplies" className="group flex items-center gap-2 font-bold text-primary-500 hover:text-primary-600 transition-colors">
              Explore All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.length > 0 ? (
              listings.map((l) => <ListingCard key={l._id} item={l} />)
            ) : (
              <div className="col-span-full py-20 text-center glass-card rounded-3xl">
                <p className="text-slate-500 dark:text-slate-400 text-lg">No listings found yet. Check back soon!</p>
              </div>
            )}
          </div>
        </section>

        {/* Why Us Section */}
        <section className="relative rounded-[3rem] overflow-hidden bg-primary-600 px-8 py-20 text-center text-white">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-10">
            <div className="inline-block p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <ShieldCheck size={40} />
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-bold">Why Choose PawMart?</h2>
            <p className="text-xl text-primary-100 opacity-90 leading-relaxed">
              We provide a safe, secure, and transparent environment for pet adoption 
              and care. Our mission is to ensure every pet finds a loving, lifelong home.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div className="space-y-2">
                <p className="text-3xl font-bold">100%</p>
                <p className="text-sm text-primary-100 uppercase tracking-widest font-bold">Verified Leads</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold">24/7</p>
                <p className="text-sm text-primary-100 uppercase tracking-widest font-bold">Expert Support</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold">Free</p>
                <p className="text-sm text-primary-100 uppercase tracking-widest font-bold">Pet Consultations</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials/Pet Heroes */}
        <section className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white">Our Pet Heroes</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Real stories from real people who made a difference with PawMart.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                story: "Guides families through pet therapy.",
              },
            ].map((hero, i) => (
              <Motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="card-premium p-6 text-center space-y-4 bg-white dark:bg-slate-800/50"
              >
                <img
                  src={hero.img}
                  alt={hero.name}
                  className="w-24 h-24 object-cover rounded-full mx-auto border-4 border-primary-500 shadow-xl"
                />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">{hero.name}</h4>
                  <p className="text-primary-500 text-sm font-semibold">{hero.role}</p>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed italic">
                  &ldquo;{hero.story}&rdquo;
                </p>
              </Motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
