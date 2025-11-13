import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion as Motion } from "framer-motion";
import API from "../services/api";
import ListingCard from "../components/ListingCard";

const categoryFilters = [
  "All",
  "Pets",
  "Pet Food",
  "Accessories",
  "Care Products",
];

export default function PetsSupplies() {
  const { categoryName } = useParams();
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  const pageTitle = useMemo(
    () =>
      categoryName
        ? `PawMart - ${decodeURIComponent(categoryName)}`
        : "PawMart - Pets & Supplies",
    [categoryName]
  );

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchListings() {
      setIsLoading(true);
      try {
        const params = {};
        if (categoryName) {
          const decoded = decodeURIComponent(categoryName);
          params.category = decoded;
          setSelectedCategory(decoded);
        }
        const res = await API.get("/listings", {
          params,
          signal: controller.signal,
        });
        setListings(res.data);
        setFilteredListings(res.data);
      } catch (err) {
        if (err.name !== "CanceledError" && err.code !== "ERR_CANCELED") {
          if (err.code !== "ERR_NETWORK" && err.code !== "ECONNREFUSED") {
            console.error("Error fetching listings:", err);
          }
          setListings([]);
          setFilteredListings([]);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchListings();
    return () => controller.abort();
  }, [categoryName]);

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    const filtered = listings.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.location.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
    setFilteredListings(filtered);
  }, [listings, searchTerm, selectedCategory]);

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 min-h-screen">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100">
            {categoryName ? decodeURIComponent(categoryName) : "All Listings"}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Browse pets ready for adoption and curated supplies from trusted
            caregivers.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span>{filteredListings.length}</span>
          <span>items found</span>
        </div>
      </header>

      <section className="mb-6 flex flex-col lg:flex-row gap-3 sm:gap-4">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or location..."
          className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-500/40 transition"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-500/40 transition"
        >
          {categoryFilters.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </section>

      {isLoading ? (
        <div className="py-12 text-center text-gray-500 dark:text-gray-400">
          Loading listings...
        </div>
      ) : filteredListings.length === 0 ? (
        <div className="py-12 text-center text-gray-500 dark:text-gray-400">
          No listings{" "}
          {searchTerm || selectedCategory !== "All"
            ? "match your filters."
            : "available yet."}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <Motion.div
            key={`${selectedCategory}-${searchTerm}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            {filteredListings.map((listing) => (
              <Motion.div
                key={listing._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                <ListingCard item={listing} />
              </Motion.div>
            ))}
          </Motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
