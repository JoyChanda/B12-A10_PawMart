import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/category-filtered-product/${encodeURIComponent(category.name)}`}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg border border-orange-100 dark:border-gray-700 text-center cursor-pointer transition-all"
      >
        <div className="text-4xl">{category.emoji}</div>
        <h4 className="font-semibold text-orange-600 dark:text-orange-400 mt-2 text-lg">
          {category.name}
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Explore curated {category.name}
        </p>
      </motion.div>
    </Link>
  );
}
