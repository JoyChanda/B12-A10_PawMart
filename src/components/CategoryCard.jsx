import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/category-filtered-product/${encodeURIComponent(category.name)}`}
      className="block h-full"
    >
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="h-full bg-white dark:bg-slate-800/50 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-700/50 text-center cursor-pointer transition-all duration-300 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-primary-500/10 hover:border-primary-500/30"
      >
        <div className="text-5xl sm:text-6xl mb-4 filter drop-shadow-lg transform transition-transform group-hover:scale-110">
          {category.emoji}
        </div>
        <h4 className="font-display font-bold text-slate-900 dark:text-white text-lg sm:text-xl">
          {category.name}
        </h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Explore {category.name.toLowerCase()}
        </p>
      </motion.div>
    </Link>
  );
}

