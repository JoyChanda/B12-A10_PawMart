import React, { useEffect, useState } from "react";
import API from "../services/api";
import ListingCard from "../components/ListingCard";
import ListingCardSkeleton from "../components/ListingCardSkeleton";
import CategoryCard from "../components/CategoryCard";
import { Link } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Heart, ShieldCheck, Zap } from "lucide-react";

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
    <div className="bg-slate-50 dark:bg-slate-900 transition-colors duration-500 overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
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

        {/* Scroll Hint */}
        <Motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight * 0.7, behavior: 'smooth' })}
        >
          <div className="flex flex-col items-center gap-2 text-slate-400 hover:text-primary-500 transition-colors">
            <span className="text-sm font-bold uppercase tracking-widest">Explore More</span>
            <div className="w-6 h-10 border-2 border-current rounded-full p-1">
              <Motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-current rounded-full mx-auto"
              />
            </div>
          </div>
        </Motion.div>
      </section>


      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 py-20 pb-0">
        {/* Section 2: Categories Section */}
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

        {/* Section 3: How It Works */}
        <section className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white">How PawMart Works</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Your journey to finding a new family member is simple and safe.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Browse & Discover", desc: "Search through thousands of verified pet listings and supplies." },
              { step: "02", title: "Connect Safely", desc: "Message sellers and shelters directly through our secure platform." },
              { step: "03", title: "Happy Adoption", desc: "Complete the process and welcome your new friend home!" },
            ].map((s, i) => (
              <div key={i} className="relative p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow group">
                <span className="text-6xl font-display font-bold text-slate-100 dark:text-slate-700 absolute top-4 right-8 group-hover:text-primary-100 dark:group-hover:text-slate-600 transition-colors">
                  {s.step}
                </span>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{s.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Featured Listings */}
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <ListingCardSkeleton key={index} />
              ))
            ) : listings.length > 0 ? (
              listings.slice(0, 4).map((l) => <ListingCard key={l._id} item={l} />)
            ) : (
              <div className="col-span-full py-20 text-center glass-card rounded-3xl">
                <p className="text-slate-500 dark:text-slate-400 text-lg">No listings found yet. Check back soon!</p>
              </div>
            )}
          </div>
        </section>

        {/* Section 5: Statistics Counter */}
        <section className="bg-slate-900 dark:bg-slate-950 rounded-[3rem] p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 blur-[100px] rounded-full"></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 text-center">
            {[
              { icon: Heart, count: "10K+", label: "Pets Adopted" },
              { icon: ShieldCheck, count: "5K+", label: "Verified Sellers" },
              { icon: Zap, count: "12M+", label: "Monthly Visits" },
              { icon: Sparkles, count: "24/7", label: "Expert Support" },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-primary-400 mx-auto mb-4">
                  <stat.icon size={24} />
                </div>
                <p className="text-4xl font-display font-bold text-white tracking-tight">{stat.count}</p>
                <p className="text-slate-400 font-semibold uppercase text-xs tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Why Us Section */}
        <section className="relative rounded-[3rem] overflow-hidden bg-primary-600 px-8 py-20 text-center text-white">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-10">
            <div className="inline-block p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <ShieldCheck size={40} />
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-bold">Safe Adoptions, Happy Pets</h2>
            <p className="text-xl text-primary-100 opacity-90 leading-relaxed">
              We provide a safe, secure, and transparent environment for pet adoption 
              and care. Our mission is to ensure every pet finds a loving, lifelong home.
            </p>
            <div className="flex justify-center gap-4">
               <Link to="/about" className="px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:shadow-xl transition-all">About Our Mission</Link>
            </div>
          </div>
        </section>

        {/* Section 7: Pet Care Tips (Blog Preview) */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white">Pet Care Insights</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Learn how to take the best care of your furry family members.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=600", title: "10 Tips for New Puppy Owners", cat: "Training" },
              { img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600", title: "Understanding Cat Body Language", cat: "Behavior" },
              { img: "https://images.unsplash.com/photo-1544191130-104975765715?q=80&w=600", title: "Top Rated Pet Food of 2024", cat: "Nutrition" },
            ].map((blog, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative rounded-3xl overflow-hidden mb-6">
                  <img src={blog.img} className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-xs font-bold text-primary-600">
                    {blog.cat}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors mb-2">
                  {blog.title}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-bold text-sm flex items-center gap-2">
                  Read Article <ArrowRight size={14} />
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Testimonials */}
        <section className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white">Our Pet Heroes</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
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
              <Motion.div key={i} whileHover={{ y: -10 }} className="card-premium p-6 text-center space-y-4 bg-white dark:bg-slate-800/50">
                <img src={hero.img} alt={hero.name} className="w-20 h-20 object-cover rounded-full mx-auto border-4 border-primary-500 shadow-xl" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{hero.name}</h4>
                  <p className="text-primary-500 text-xs font-semibold">{hero.role}</p>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm italic leading-relaxed">
                  &ldquo;{hero.story}&rdquo;
                </p>
              </Motion.div>
            ))}
          </div>
        </section>

        {/* Section 9: Trusted Partners */}
        <section className="py-10 border-y border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {["Royal Canin", "Petco", "Whiskas", "Pedigree", "Chewy"].map(p => (
               <span key={p} className="text-2xl font-display font-black text-slate-400 dark:text-slate-600">{p}</span>
             ))}
          </div>
        </section>

        {/* Section 10: App Promo */}
        <section className="relative glass-card rounded-[3rem] p-12 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             <div className="space-y-6">
                <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white leading-tight">
                  Download the PawMart <span className="text-primary-600">Mobile App</span>
                </h2>
                <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                  Get pet listing alerts, manage your adoptions, and discover premium supplies on the go.
                </p>
                <div className="flex gap-4">
                   <div className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center gap-3 cursor-pointer hover:bg-black transition-colors">
                      <Zap size={20} /> App Store
                   </div>
                   <div className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center gap-3 cursor-pointer hover:bg-black transition-colors">
                      <Zap size={20} /> Play Store
                   </div>
                </div>
             </div>
             <div className="relative flex justify-center">
                <div className="w-64 h-[400px] bg-slate-200 dark:bg-slate-700 rounded-[2.5rem] border-8 border-slate-900 dark:border-slate-800 relative z-10 overflow-hidden shadow-2xl">
                   <img src="https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=400" className="w-full h-full object-cover" alt="" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-600/20 rounded-full blur-2xl"></div>
             </div>
          </div>
        </section>

        {/* Section 11: FAQ Preview */}
        <section className="space-y-12">
           <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white text-center">Frequently Asked Questions</h2>
              <div className="space-y-4">
                 {[
                   { q: "How do I verify a pet's health?", a: "Every listing includes health certificates and vaccination records for your peace of mind." },
                   { q: "Is there an adoption fee?", a: "Fees are set by individual shelters or sellers, clearly displayed on each pet listing." },
                 ].map((f, i) => (
                   <div key={i} className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                      <p className="font-bold text-slate-900 dark:text-white mb-2">{f.q}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{f.a}</p>
                   </div>
                 ))}
              </div>
              <div className="text-center">
                 <Link to="/help" className="text-primary-600 font-bold hover:underline">View All FAQs</Link>
              </div>
           </div>
        </section>

        {/* Section 12: Newsletter */}
        <section className="bg-primary-600 rounded-[3rem] p-12 text-center text-white relative overflow-hidden mb-20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl font-display font-bold">Join the Pack!</h2>
            <p className="text-primary-100 text-lg">Subscribe to get monthly pet care tips, new pet alerts, and exclusive offers.</p>
            <form onSubmit={(e) => { e.preventDefault(); toast.success("Subscribed to newsletter! 🐾"); }} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                required 
                placeholder="Enter your email" 
                className="flex-1 px-6 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl outline-none focus:bg-white/30 transition-all placeholder:text-white/60 text-white"
              />
              <button className="px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-slate-100 transition-all shadow-xl">
                Subscribe Now
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
