import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ListingCard({ item }) {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate image loading
    const img = new Image();
    img.src = item.image || "https://via.placeholder.com/400x250";
    img.onload = () => setLoading(false);
  }, [item.image]);

  if (loading) {
    // Skeleton loader
    return (
      <div className="card h-full flex flex-col p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm animate-pulse">
        <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded-xl mb-4"></div>
        <div className="flex-1 flex flex-col space-y-2">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-16 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="card h-full flex flex-col p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition">
      <img
        src={item.image || "https://via.placeholder.com/400x250"}
        alt={item.name}
        className="w-full h-48 object-cover rounded-xl"
      />
      <div className="mt-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-lg leading-tight">
          {item.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {item.category} • {item.location}
        </p>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 h-16 overflow-hidden">
          {item.description}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="font-semibold text-gray-800 dark:text-gray-100">
          {Number(item.price) === 0 ? "Free for Adoption" : `$${item.price}`}
        </span>
        <button
          onClick={() => nav(`/listing/${item._id}`)}
          className="text-sm py-2 px-4 rounded-lg bg-orange-500 dark:bg-orange-600 text-white font-semibold hover:bg-orange-600 dark:hover:bg-orange-700 transition"
        >
          See Details
        </button>
      </div>
    </div>
  );
}
