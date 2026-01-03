import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Tag, Calendar, ArrowRight, Star } from "lucide-react";

export default function ListingCard({ item }) {
  const nav = useNavigate();
  
  // Format date if available
  const formatDate = (dateString) => {
    if (!dateString) return "Recently Added";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group h-[480px] flex flex-col bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 overflow-hidden"
    >
      {/* Image Section - Fixed Height */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={item.image || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800&auto=format&fit=crop"}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4 px-4 py-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl shadow-xl border border-white/20">
          <span className="text-base font-extrabold text-primary-700 dark:text-primary-400">
            {Number(item.price) === 0 ? "FREE" : `$${item.price}`}
          </span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white rounded-lg shadow-lg text-xs font-bold uppercase tracking-wide">
            <Tag size={12} />
            {item.category}
          </div>
        </div>

        {/* Status Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content Section - Flexible */}
      <div className="flex-1 flex flex-col p-5">
        {/* Title */}
        <h3 className="font-display font-bold text-slate-950 dark:text-white text-xl leading-tight mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-700 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4 font-medium">
          {item.description || "Discover this amazing pet looking for a loving home. Contact us for more details."}
        </p>

        {/* Meta Information */}
        <div className="space-y-2.5 mt-auto">
          {/* Location */}
          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
              <MapPin size={14} />
            </div>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {item.location || "Location Available"}
            </span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
              <Calendar size={14} />
            </div>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {formatDate(item.createdAt || item.date)}
            </span>
          </div>

          {/* Rating (if available) */}
          {item.rating && (
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                <Star size={14} fill="currentColor" />
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {item.rating}/5 Rating
              </span>
            </div>
          )}
        </div>
      </div>

      {/* View Details Button - Fixed at Bottom */}
      <div className="p-5 pt-0">
        <button
          onClick={() => nav(`/listing/${item._id}`)}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-800/50 text-slate-950 dark:text-white font-bold border border-slate-200 dark:border-slate-700 hover:from-primary-600 hover:to-primary-700 hover:text-white hover:border-primary-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary-500/25 flex items-center justify-center gap-2 group/button"
        >
          View Details
          <ArrowRight size={18} className="group-hover/button:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

