import React, { useEffect, useState } from "react";
import API from "../services/api";
import ListingCard from "../components/ListingCard";
import ListingCardSkeleton from "../components/ListingCardSkeleton";
import CategoryCard from "../components/CategoryCard";
import { Link } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Heart, ShieldCheck, Zap } from "lucide-react";
import toast from "react-hot-toast";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setLoading(true);
        const res = await API.get("/listings", { params: { limit: 8 } });
        setListings(res.data);
      } catch (err) {
        setListings([]);
      } finally {
        setLoading(false);
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
    <div className="bg-slate-100 dark:bg-slate-900 transition-colors duration-500 overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[750px] flex items-start pt-32 lg:pt-40 pb-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950/20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full relative z-10">
          <Motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-bold text-sm border border-primary-100 dark:border-primary-800 animate-fade-in">
              <Sparkles size={16} />
              <span>Pet Services Platform</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-slate-950 dark:text-white leading-[1.1] tracking-tight">
              Where Pets Find <span className="text-primary-500">Perfect</span> Homes.
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-800 dark:text-slate-400 leading-relaxed max-w-xl font-medium">
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
                to="/dashboard/add-listing"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 text-slate-950 dark:text-white font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 bg-white dark:bg-transparent"
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
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                <span className="font-bold text-slate-950 dark:text-white">2k+</span> Pet Lovers Joined
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
              
              {/* Slide Controls */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      currentSlide === index 
                        ? "w-8 h-2 bg-primary-600" 
                        : "w-2 h-2 bg-slate-300 dark:bg-slate-700 hover:bg-primary-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Floating Cards */}
            <Motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -right-6 z-20 glass-card p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/40 dark:border-slate-700"
            >
              <div className="w-10 h-10 bg-secondary-500 rounded-lg flex items-center justify-center text-white">
                <Heart size={20} fill="currentColor" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Health Checked</p>
                <p className="font-bold text-slate-900 dark:text-white text-sm">Certified Pets</p>
              </div>
            </Motion.div>

            <Motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 z-20 glass-card p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/40 dark:border-slate-700"
            >
              <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center text-white">
                <Zap size={20} fill="currentColor" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Fast Response</p>
                <p className="font-bold text-slate-900 dark:text-white text-sm">Verified Sellers</p>
              </div>
            </Motion.div>
          </Motion.div>
        </div>

        {/* Hero Bottom Mask */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-slate-100 dark:from-slate-900 to-transparent z-0"></div>
      </section>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 py-32 mt-12">
        {/* Section 2: Categories Section */}
        <section id="categories" className="scroll-mt-32">
          <div className="text-center space-y-4 mb-16">
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs font-bold uppercase tracking-wider mb-4"
            >
              <Sparkles size={14} />
              Quick Search
            </Motion.div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-950 dark:text-white">Browse Categories</h2>
            <p className="text-slate-700 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Find exactly what your pet needs with our curated categories.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((c) => (
              <CategoryCard key={c.name} category={c} />
            ))}
          </div>
        </section>

        {/* Section 3: How It Works */}
        <section className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-display font-bold text-slate-950 dark:text-white">How PawMart Works</h2>
            <p className="text-slate-700 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
              Your journey to finding a new family member is simple and safe.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
            {[
              { step: "01", title: "Browse & Discover", desc: "Search through thousands of verified pet listings and supplies." },
              { step: "02", title: "Connect Safely", desc: "Message sellers and shelters directly through our secure platform." },
              { step: "03", title: "Happy Adoption", desc: "Complete the process and welcome your new friend home!" },
            ].map((s, i) => (
              <div key={i} className="relative p-10 bg-white dark:bg-slate-800/50 rounded-[2.5rem] border border-white dark:border-slate-700 shadow-xl transition-all group hover:border-primary-500/30">
                <span className="text-7xl font-display font-black text-slate-100 dark:text-slate-800 absolute top-4 right-8 group-hover:text-primary-100 dark:group-hover:text-slate-700/50 transition-colors">
                  {s.step}
                </span>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-slate-950 dark:text-white mb-4">{s.title}</h3>
                  <p className="text-slate-800 dark:text-slate-400 leading-relaxed font-bold">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Featured Listings */}
        <section className="space-y-12">
          <div className="flex flex-col sm:flex-row items-end justify-between gap-6">
            <div className="space-y-4 text-center sm:text-left">
              <h2 className="text-4xl font-display font-bold text-slate-950 dark:text-white">Recent Listings</h2>
              <p className="text-slate-700 dark:text-slate-400 max-w-xl text-lg font-medium">
                The latest furry friends and pet supplies added to our marketplace.
              </p>
            </div>
            <Link to="/pets-supplies" className="group flex items-center gap-2 font-bold text-primary-500 hover:text-primary-600 transition-colors">
              Explore All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <ListingCardSkeleton key={index} />
              ))
            ) : listings.length > 0 ? (
              listings.slice(0, 4).map((l) => <ListingCard key={l._id} item={l} />)
            ) : (
              <div className="col-span-full py-20 text-center glass-card rounded-3xl">
                <p className="text-slate-700 dark:text-slate-400 text-lg font-bold">No listings found yet. Check back soon!</p>
              </div>
            )}
          </div>
        </section>

        {/* Section 5: Statistics Counter */}
        <section className="bg-white dark:bg-slate-950 rounded-[3.5rem] p-12 lg:p-20 overflow-hidden relative shadow-2xl border border-primary-100 dark:border-slate-800">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-600/10 dark:bg-primary-600/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-600/5 dark:bg-emerald-600/10 blur-[100px] rounded-full"></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10 text-center">
            {[
              { icon: Heart, count: "10K+", label: "Pets Adopted" },
              { icon: ShieldCheck, count: "5K+", label: "Verified Sellers" },
              { icon: Zap, count: "12M+", label: "Monthly Visits" },
              { icon: Sparkles, count: "24/7", label: "Expert Support" },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="w-16 h-16 bg-primary-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-primary-600 dark:text-primary-400 mx-auto mb-6 border border-primary-100 dark:border-white/10 shadow-sm">
                  <stat.icon size={28} />
                </div>
                <p className="text-5xl font-display font-bold text-slate-950 dark:text-white tracking-tight text-center">{stat.count}</p>
                <p className="text-slate-600 dark:text-slate-400 font-bold uppercase text-xs tracking-widest mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Why Us Section */}
        <section className="relative rounded-[3.5rem] overflow-hidden bg-primary-50 dark:bg-primary-600 px-8 py-24 text-center shadow-2xl border border-primary-100 dark:border-transparent">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-10">
            <div className="inline-block p-5 bg-primary-100 dark:bg-white/20 backdrop-blur-md rounded-[2rem] border border-primary-200 dark:border-white/30 shadow-xl text-primary-600 dark:text-white">
              <ShieldCheck size={48} />
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-bold leading-tight text-slate-950 dark:text-white">Safe Adoptions, Happy Pets</h2>
            <p className="text-xl text-slate-700 dark:text-primary-50 opacity-90 leading-relaxed font-bold">
              We provide a safe, secure, and transparent environment for pet adoption 
              and care. Our mission is to ensure every pet finds a loving, lifelong home.
            </p>
            <div className="flex justify-center pt-4">
               <Link to="/about" className="px-10 py-5 bg-white dark:bg-slate-950 text-primary-600 dark:text-white font-black rounded-2xl hover:bg-slate-50 dark:hover:bg-black transition-all hover:scale-105 shadow-xl border-2 border-primary-100 dark:border-transparent">About Our Mission</Link>
            </div>
          </div>
        </section>

        {/* Section 7: Pet Care Tips (Blog Preview) */}
        <section className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-display font-bold text-slate-950 dark:text-white">Pet Care Insights</h2>
            <p className="text-slate-700 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
              Learn how to take the best care of your furry family members.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=600", title: "10 Tips for New Puppy Owners", cat: "Training" },
              { img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600", title: "Understanding Cat Body Language", cat: "Behavior" },
              { img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop", title: "Top Rated Pet Food of 2024", cat: "Nutrition" },
            ].map((blog, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative rounded-[2.5rem] overflow-hidden mb-8 shadow-xl">
                  <img src={blog.img} className="w-full aspect-[4/3] object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                  <span className="absolute top-6 left-6 px-4 py-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl text-xs font-black text-primary-600 uppercase tracking-widest shadow-lg">
                    {blog.cat}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-950 dark:text-white group-hover:text-primary-600 transition-colors mb-3 leading-tight">
                  {blog.title}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-black text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                  Read Full Article <ArrowRight size={16} />
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Testimonials */}
        <section className="space-y-16 pb-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-display font-bold text-slate-950 dark:text-white">Our Pet Heroes</h2>
            <p className="text-slate-700 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium">
              Real stories from real people who made a difference with PawMart.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Amin", role: "Foster", img: "https://randomuser.me/api/portraits/men/75.jpg", story: "Helps senior dogs find homes." },
              { name: "Rita", role: "Volunteer", img: "https://randomuser.me/api/portraits/women/44.jpg", story: "Hosts weekend drives." },
              { name: "Mateo", role: "Adopter", img: "https://randomuser.me/api/portraits/men/32.jpg", story: "Rescued bonded kittens." },
              { name: "Sana", role: "Therapist", img: "https://randomuser.me/api/portraits/women/65.jpg", story: "Guides new families." },
            ].map((hero, i) => (
              <Motion.div key={i} whileHover={{ y: -12 }} className="bg-white dark:bg-slate-800/80 p-8 text-center space-y-6 rounded-[2.5rem] border border-white dark:border-slate-700 shadow-xl transition-all">
                <div className="relative inline-block">
                  <img src={hero.img} alt={hero.name} className="w-24 h-24 object-cover rounded-3xl mx-auto border-4 border-primary-500 shadow-2xl" />
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-xl shadow-lg">
                    <ShieldCheck size={16} />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-950 dark:text-white text-xl">{hero.name}</h4>
                  <p className="text-primary-600 text-sm font-black uppercase tracking-widest mt-1">{hero.role}</p>
                </div>
                <p className="text-slate-700 dark:text-slate-400 text-base italic leading-relaxed font-semibold">
                  &ldquo;{hero.story}&rdquo;
                </p>
              </Motion.div>
            ))}
          </div>
        </section>

        {/* Section 9: Trusted Partners */}
        <section className="py-20 border-y-2 border-slate-200/60 dark:border-slate-800">
          <div className="flex flex-wrap items-center justify-center gap-16 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
             {["Royal Canin", "Petco", "Whiskas", "Pedigree", "Chewy"].map(p => (
               <span key={p} className="text-3xl font-display font-black text-slate-400 dark:text-slate-600 tracking-tighter cursor-default">{p}</span>
             ))}
          </div>
        </section>

        {/* Section 10: App Promo */}
        <section className="relative bg-slate-100 dark:bg-slate-800/50 rounded-[4rem] p-12 lg:p-20 overflow-hidden shadow-inner border border-white dark:border-slate-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="space-y-8 text-center lg:text-left">
                <h2 className="text-5xl lg:text-6xl font-display font-bold text-slate-950 dark:text-white leading-tight">
                  Download the <br /> <span className="text-primary-600">PawMart App</span>
                </h2>
                <p className="text-xl text-slate-800 dark:text-slate-400 leading-relaxed font-bold">
                  Get pet listing alerts, manage your adoptions, and discover premium supplies all in one place.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                   <div className="px-8 py-4 bg-slate-950 text-white rounded-2xl font-black flex items-center gap-4 cursor-pointer hover:bg-black transition-all hover:scale-105 shadow-2xl">
                      <Zap size={24} className="text-primary-400" /> App Store
                   </div>
                   <div className="px-8 py-4 bg-slate-950 text-white rounded-2xl font-black flex items-center gap-4 cursor-pointer hover:bg-black transition-all hover:scale-105 shadow-2xl">
                      <Zap size={24} className="text-emerald-400" /> Play Store
                   </div>
                </div>
             </div>
             <div className="relative flex justify-center lg:justify-end">
                <div className="w-72 h-[500px] bg-slate-200 dark:bg-slate-700 rounded-[3.5rem] border-[12px] border-slate-950 dark:border-slate-900 relative z-10 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)]">
                   <img src="https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=400" className="w-full h-full object-cover" alt="" />
                   <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                {/* Decorative circles */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary-600/10 rounded-full blur-3xl -z-0"></div>
             </div>
          </div>
        </section>

        {/* Section 11: FAQ Preview */}
        <section className="space-y-16">
           <div className="max-w-4xl mx-auto space-y-10">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-display font-bold text-slate-950 dark:text-white">Common Questions</h2>
                <p className="text-lg text-slate-700 dark:text-slate-400 font-medium">Everything you need to know about adopting through PawMart.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {[
                   { q: "How do I verify a pet's health?", a: "Every listing includes health certificates and vaccination records. We also recommend a personal vet check before finalizing." },
                   { q: "Is there an adoption fee?", a: "Fees vary by listing and are set by sellers or shelters. They usually cover medical and care costs." },
                   { q: "Can I list my own pet?", a: "Yes, you can create a listing through your dashboard after a quick verification process." },
                   { q: "Is PawMart safe for payments?", a: "We facilitate connections. For payments, we recommend using secure, trackable methods." },
                 ].map((f, i) => (
                   <div key={i} className="p-8 bg-white dark:bg-slate-800/80 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all">
                      <p className="font-black text-slate-950 dark:text-white mb-3 text-lg">{f.q}</p>
                      <p className="text-base text-slate-800 dark:text-slate-400 font-bold leading-relaxed">{f.a}</p>
                   </div>
                 ))}
              </div>
              <div className="text-center">
                 <Link to="/help" className="inline-flex items-center gap-2 text-primary-600 font-black hover:gap-3 transition-all text-lg">
                   View Full Help Center <ArrowRight size={20} />
                 </Link>
              </div>
           </div>
        </section>

        {/* Section 12: Newsletter */}
        <section className="bg-primary-50 dark:bg-primary-800 rounded-[4rem] p-12 lg:p-24 text-center relative overflow-hidden mb-20 shadow-2xl border border-primary-100 dark:border-transparent">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 blur-3xl rounded-full"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-900/40 blur-3xl rounded-full"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-10">
            <h2 className="text-5xl font-display font-bold leading-tight text-slate-900 dark:text-white">Join the Furry Family!</h2>
            <p className="text-slate-800 dark:text-white text-xl font-bold opacity-90">Subscribe to get monthly pet care tips, new pet alerts, and exclusive offers delivered to your inbox.</p>
            <form onSubmit={(e) => { e.preventDefault(); toast.success("Welcome to the family! 🐾"); }} className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                required 
                placeholder="yours@email.com" 
                className="flex-1 px-8 py-5 bg-white/50 dark:bg-white/10 backdrop-blur-md border border-primary-200 dark:border-white/40 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 transition-all placeholder:text-slate-400 dark:placeholder:text-white/80 text-slate-900 dark:text-white font-bold text-lg"
              />
              <button className="px-10 py-5 bg-white dark:bg-slate-950 text-primary-600 dark:text-white font-black rounded-2xl hover:bg-slate-50 dark:hover:bg-black transition-all shadow-xl hover:scale-105 active:scale-95 text-lg border-2 border-primary-100 dark:border-transparent">
                Subscribe Now
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
