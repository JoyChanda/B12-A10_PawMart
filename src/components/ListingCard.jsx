import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Tag } from "lucide-react";

export default function ListingCard({ item }) {
  const nav = useNavigate();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group card-premium h-full flex flex-col p-3 bg-white dark:bg-slate-800/50"
    >
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={item.image || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800&auto=format&fit=crop"}
          alt={item.name}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 px-3 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full shadow-lg">
          <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
            {Number(item.price) === 0 ? "Adoption" : `$${item.price}`}
          </span>
        </div>
      </div>

      <div className="mt-5 flex-1 flex flex-col px-1">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-primary-500 mb-2">
          <Tag size={12} />
          {item.category}
        </div>
        <h3 className="font-display font-bold text-slate-900 dark:text-white text-xl leading-snug group-hover:text-primary-500 transition-colors">
          {item.name}
        </h3>
        <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mt-2">
          <MapPin size={14} className="text-primary-400" />
          {item.location}
        </div>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
      </div>

      <div className="mt-6">
        <button
          onClick={() => nav(`/listing/${item._id}`)}
          className="w-full py-3 px-6 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold hover:bg-primary-500 hover:text-white transition-all duration-300 shadow-sm"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
}

