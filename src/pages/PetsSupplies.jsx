import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion as Motion } from "framer-motion";
import API from "../services/api";
import ListingCard from "../components/ListingCard";
import ListingCardSkeleton from "../components/ListingCardSkeleton";
import { Search, Filter, Loader2, PackageSearch, SlidersHorizontal, ChevronLeft, ChevronRight, X } from "lucide-react";

const categoryFilters = [
  "All",
  "Pets",
  "Pet Food",
  "Accessories",
  "Care Products",
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
];

const ITEMS_PER_PAGE = 12;

export default function PetsSupplies() {
  const { categoryName } = useParams();
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

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

  // Filter and Sort Logic
  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    const locationTerm = location.trim().toLowerCase();
    
    let filtered = listings.filter((item) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      
      // Search filter
      const matchesSearch =
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.description?.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term);
      
      // Price filter
      const itemPrice = Number(item.price);
      const minPrice = priceRange.min === "" ? 0 : Number(priceRange.min);
      const maxPrice = priceRange.max === "" ? Infinity : Number(priceRange.max);
      const matchesPrice = itemPrice >= minPrice && itemPrice <= maxPrice;
      
      // Location filter
      const matchesLocation =
        !locationTerm || item.location?.toLowerCase().includes(locationTerm);
      
      return matchesCategory && matchesSearch && matchesPrice && matchesLocation;
    });

    // Sorting
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now());
        case "oldest":
          return new Date(a.createdAt || Date.now()) - new Date(b.createdAt || Date.now());
        case "price-low":
          return Number(a.price) - Number(b.price);
        case "price-high":
          return Number(b.price) - Number(a.price);
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    setFilteredListings(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [listings, searchTerm, selectedCategory, priceRange, location, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredListings.length / ITEMS_PER_PAGE);
  const paginatedListings = filteredListings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setPriceRange({ min: "", max: "" });
    setLocation("");
    setSortBy("newest");
  };

  const activeFilterCount = [
    selectedCategory !== "All",
    priceRange.min !== "" || priceRange.max !== "",
    location !== "",
    searchTerm !== ""
  ].filter(Boolean).length;

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-24 pb-20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 space-y-6">
          <Motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-slate-950 dark:text-white">
                {categoryName ? decodeURIComponent(categoryName) : "Marketplace"}
              </h1>
              <p className="text-slate-800 dark:text-slate-400 max-w-2xl text-lg font-medium leading-relaxed">
                Discover high-quality pets and curated supplies from our verified community.
              </p>
            </div>
            <div className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-md">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-bold text-slate-950 dark:text-white">
                {filteredListings.length} Available
              </span>
            </div>
          </Motion.div>

          {/* Search and Primary Filters */}
          <Motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="flex flex-col lg:flex-row gap-4"
          >
            {/* Search Bar */}
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors" size={20} />
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search pets, supplies, locations..."
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 transition-all text-slate-950 dark:text-white shadow-sm font-medium"
              />
            </div>

            {/* Category Filter */}
            <div className="relative group min-w-[200px]">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors pointer-events-none" size={18} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-10 py-4 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 transition-all text-slate-950 dark:text-white appearance-none cursor-pointer shadow-sm font-bold"
              >
                {categoryFilters.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "All" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>

            {/* Sort */}
            <div className="relative group min-w-[200px]">
              <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors pointer-events-none" size={18} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-12 pr-10 py-4 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 transition-all text-slate-950 dark:text-white appearance-none cursor-pointer shadow-sm font-bold"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-4 rounded-2xl border-2 font-bold transition-all shadow-sm flex items-center gap-2 ${
                showFilters || activeFilterCount > 0
                  ? "bg-primary-600 text-white border-primary-600"
                  : "bg-white dark:bg-slate-800 text-slate-950 dark:text-white border-slate-200 dark:border-slate-700"
              }`}
            >
              <SlidersHorizontal size={18} />
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>
          </Motion.div>

          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <Motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="glass-card p-6 rounded-[2rem] space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white">Advanced Filters</h3>
                    <button
                      onClick={handleResetFilters}
                      className="text-sm font-bold text-red-600 hover:underline flex items-center gap-1"
                    >
                      <X size={16} />
                      Reset All
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Price Range */}
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Price Range</label>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="number"
                          placeholder="Min $"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                          className="px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 transition-all text-slate-950 dark:text-white font-medium"
                        />
                        <input
                          type="number"
                          placeholder="Max $"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                          className="px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 transition-all text-slate-950 dark:text-white font-medium"
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Location</label>
                      <input
                        type="text"
                        placeholder="Enter city or area..."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 transition-all text-slate-950 dark:text-white font-medium"
                      />
                    </div>

                    {/* Active Filters Summary */}
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Active Filters</label>
                      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                        <p className="text-sm font-bold text-slate-950 dark:text-white">
                          {activeFilterCount === 0 ? "No filters applied" : `${activeFilterCount} filter${activeFilterCount > 1 ? 's' : ''} active`}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {filteredListings.length} result{filteredListings.length !== 1 ? 's' : ''} found
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Results */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ListingCardSkeleton key={i} />
            ))}
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
              <h3 className="text-2xl font-bold text-slate-950 dark:text-white">No Results Found</h3>
              <p className="text-slate-800 dark:text-slate-400 max-w-md mx-auto">
                We couldn't find anything matching your current filters. 
                Try adjusting your search or filters.
              </p>
            </div>
            <button 
              onClick={handleResetFilters}
              className="px-10 py-4 bg-white dark:bg-slate-950 text-primary-600 dark:text-white font-black rounded-2xl hover:bg-slate-50 dark:hover:bg-black transition-all shadow-xl hover:scale-105 active:scale-95 text-lg border-2 border-primary-100 dark:border-transparent"
            >
              Reset All Filters
            </button>
          </Motion.div>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              <AnimatePresence mode="popLayout">
                {paginatedListings.map((listing) => (
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

            {/* Pagination */}
            {totalPages > 1 && (
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2"
              >
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-950 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => {
                      if (totalPages <= 7) return true;
                      if (page === 1 || page === totalPages) return true;
                      if (Math.abs(page - currentPage) <= 1) return true;
                      return false;
                    })
                    .map((page, idx, arr) => (
                      <React.Fragment key={page}>
                        {idx > 0 && arr[idx - 1] !== page - 1 && (
                          <span className="px-2 text-slate-400">...</span>
                        )}
                        <button
                          onClick={() => setCurrentPage(page)}
                          className={`min-w-[44px] h-[44px] rounded-xl font-bold transition-all ${
                            currentPage === page
                              ? "bg-primary-600 text-white shadow-lg shadow-primary-600/25"
                              : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-950 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700"
                          }`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    ))}
                </div>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-950 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </Motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

