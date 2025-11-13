import React from "react";
import { useNavigate } from "react-router-dom";

export default function ListingCard({ item }) {
  const nav = useNavigate();
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
