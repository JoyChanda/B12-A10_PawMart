import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-transparent">
      <div className="relative">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 rounded-full border-4 border-slate-100 dark:border-slate-800 border-t-primary-500"
        />
        <div className="absolute inset-0 flex items-center justify-center">
           <motion.div
             animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
             transition={{ duration: 1.5, repeat: Infinity }}
             className="text-primary-500"
           >
             <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm6.5 4c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zM5.5 15c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zM12 21c4.42 0 8-3.58 8-8 0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3-1.34 1.34-3 1.34-3-1.34-3-1.34zm0-10c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
             </svg>
           </motion.div>
        </div>
      </div>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-slate-500 dark:text-slate-400 font-bold tracking-widest text-xs uppercase animate-pulse"
      >
        Syncing PawMart Universe
      </motion.p>
    </div>
  );
}

