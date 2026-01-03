import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Ghost, Search } from "lucide-react";

export default function NotFound404() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "PawMart | Lost in Space";
    
    // Smoothly hide main layout elements
    const navbar = document.querySelector("nav");
    const footer = document.querySelector("footer");
    if (navbar) navbar.style.opacity = "0";
    if (footer) footer.style.opacity = "0";

    return () => {
      if (navbar) navbar.style.opacity = "1";
      if (footer) footer.style.opacity = "1";
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 px-6 relative overflow-hidden transition-colors duration-500">
      {/* Decorative Circles */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-center z-10"
      >
        {/* Floating Ghost Animation */}
        <motion.div
           animate={{ 
             y: [0, -20, 0],
             rotate: [0, 5, -5, 0]
           }}
           transition={{ 
             duration: 4,
             repeat: Infinity,
             ease: "easeInOut"
           }}
           className="mb-12 inline-block"
        >
          <div className="p-10 bg-white dark:bg-slate-800 rounded-[3rem] shadow-2xl shadow-primary-500/20 relative">
             <Ghost size={120} className="text-primary-500" strokeWidth={1} />
             <div className="absolute -top-4 -right-4 p-4 bg-primary-500 text-white rounded-2xl shadow-lg animate-bounce">
                <Search size={24} />
             </div>
          </div>
        </motion.div>

        {/* 404 Typography */}
        <h1 className="text-[12rem] font-display font-black leading-none text-slate-200 dark:text-slate-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none opacity-50">
          404
        </h1>

        <div className="space-y-4 max-w-lg mx-auto">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-slate-900 dark:text-white">
            Lost Your Way? 🐾
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
            It seems the page you're sniffing for has wandered away. Don't worry, even the best pets get lost sometimes.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
           <button
             onClick={() => navigate(-1)}
             className="w-full sm:w-auto px-8 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 font-bold text-slate-950 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group"
           >
             <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
             Go Back
           </button>
           <button
             onClick={() => navigate("/")}
             className="w-full sm:w-auto btn-premium px-10 py-4 flex items-center justify-center gap-2"
           >
             <Home size={20} />
             Back to Safety
           </button>
        </div>
      </motion.div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-slate-300 dark:text-slate-700 font-bold tracking-widest text-xs uppercase">
        <span className="w-8 h-px bg-current"></span>
        PawMart Premium Experience
        <span className="w-8 h-px bg-current"></span>
      </div>
    </div>
  );
}

