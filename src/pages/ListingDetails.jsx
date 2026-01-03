import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import OrderModal from "../components/OrderModal";
import { motion } from "framer-motion";
import { MapPin, Tag, ArrowLeft, Heart, ShieldCheck, Share2 } from "lucide-react";

export default function ListingDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [openOrder, setOpenOrder] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    document.title = item ? `PawMart | ${item.name}` : "PawMart | Listing";
  }, [item]);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get(`/listings/${id}`);
        setItem(res.data);
      } catch (err) {
        setItem(null);
      }
    })();
  }, [id]);

  const handleOrderSuccess = () => {
    // Order was successfully placed
  };

  if (!item)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold animate-pulse">Loading Details...</p>
        </div>
      </div>
    );

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-24 pb-20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          to="/pets-supplies" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-primary-500 font-bold transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Listings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary-500/10 border-8 border-white dark:border-slate-800">
              <img
                src={item.image || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1200&auto=format&fit=crop"}
                alt={item.name}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full shadow-lg">
                <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-bold">
                  <Tag size={18} />
                  {item.category}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-6 rounded-3xl flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 text-primary-500 rounded-2xl flex items-center justify-center">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Verified</p>
                  <p className="font-bold text-slate-900 dark:text-white">Safety Check</p>
                </div>
              </div>
              <div className="glass-card p-6 rounded-3xl flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-500 rounded-2xl flex items-center justify-center">
                  <Heart size={24} fill="currentColor" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Health</p>
                  <p className="font-bold text-slate-900 dark:text-white">High Quality</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-primary-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Featured Listing
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 font-medium text-sm">
                  <MapPin size={16} />
                  {item.location}
                </div>
              </div>
              
              <h1 className="text-5xl font-display font-bold text-slate-900 dark:text-white leading-tight">
                {item.name}
              </h1>
              
              <div className="flex items-center justify-between py-6 border-y border-slate-200 dark:border-slate-800">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Price / Adoption Fee</p>
                  <p className="text-4xl font-display font-bold text-primary-500">
                    {Number(item.price) === 0 ? "Free Adoption" : `$${item.price}`}
                  </p>
                </div>
                <button className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-400 hover:text-primary-500 transition-colors shadow-sm">
                  <Share2 size={24} />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Description</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              <button
                className="flex-1 btn-premium py-5 text-xl"
                onClick={() => setOpenOrder(true)}
              >
                Interest & Process
              </button>
              <button className="px-8 py-5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                <Heart size={20} />
                Wishlist
              </button>
            </div>

            {/* Seller Quick Info */}
            <div className="p-8 rounded-[2rem] bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg border-2 border-white dark:border-slate-700">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.email || 'seller'}`} alt="" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Trusted Provider</h4>
                  <p className="text-sm text-slate-500">Verified community member since 2024</p>
                </div>
                <Link to="/contact" className="ml-auto text-primary-500 font-bold hover:underline">Chat</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <OrderModal
        item={item}
        isOpen={openOrder}
        onClose={() => setOpenOrder(false)}
        onSuccess={handleOrderSuccess}
      />
    </div>
  );
}

