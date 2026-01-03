import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion as Motion } from "framer-motion";
import API from "../services/api";
import ListingCard from "../components/ListingCard";
import { Search, Filter, Loader2, PackageSearch } from "lucide-react";

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
        ? `PawMart | ${decodeURIComponent(categoryName)}`
        : "PawMart | Pets & Supplies",
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
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-24 pb-20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 space-y-4">
          <Motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-slate-900 dark:text-white">
                {categoryName ? decodeURIComponent(categoryName) : "Marketplace"}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-lg">
                Discover high-quality pets and curated supplies from our verified community.
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                {filteredListings.length} Products Found
              </span>
            </div>
          </Motion.div>

          <Motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="flex flex-col lg:flex-row gap-4 pt-4"
          >
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, category or location..."
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-white shadow-sm"
              />
            </div>
            <div className="relative group min-w-[200px]">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors pointer-events-none" size={18} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-10 py-4 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-white appearance-none cursor-pointer shadow-sm font-bold"
              >
                {categoryFilters.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </Motion.div>
        </header>

        {isLoading ? (
          <div className="py-32 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
            <p className="text-slate-500 dark:text-slate-400 font-bold animate-pulse">Curating your results...</p>
          </div>
        ) : filteredListings.length === 0 ? (
          <Motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 flex flex-col items-center justify-center space-y-6 glass-card rounded-[3rem]"
          >
            <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-400">
              <PackageSearch size={64} />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">No Results Found</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                We couldn't find anything matching your current filters. 
                Try adjusting your search term or category.
              </p>
            </div>
            <button 
              onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
              className="px-8 py-3 bg-primary-500 text-white font-bold rounded-xl hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/25"
            >
              Reset All Filters
            </button>
          </Motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredListings.map((listing) => (
                <Motion.div
                  key={listing._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ListingCard item={listing} />
                </Motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

