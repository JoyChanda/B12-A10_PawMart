import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import OrderModal from "../components/OrderModal";
import ListingCard from "../components/ListingCard";
import { motion as Motion } from "framer-motion";
import { MapPin, Tag, ArrowLeft, Heart, ShieldCheck, Share2, Calendar, Package, Star, ChevronLeft, ChevronRight, User, Mail, Phone, CheckCircle2 } from "lucide-react";

export default function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [openOrder, setOpenOrder] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { user } = useAuth();

  // Mock images for gallery (in production, these would come from the API)
  const images = item ? [
    item.image || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=1200&auto=format&fit=crop"
  ] : [];

  useEffect(() => {
    document.title = item ? `PawMart | ${item.name}` : "PawMart | Listing";
  }, [item]);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get(`/listings/${id}`);
        setItem(res.data);
        
        // Fetch related items
        const relatedRes = await API.get("/listings", { 
          params: { category: res.data.category, limit: 4 } 
        });
        setRelatedItems(relatedRes.data.filter(i => i._id !== id));
      } catch (err) {
        setItem(null);
        toast.error("Listing not found");
        navigate("/pets-supplies");
      }
    })();
  }, [id, navigate]);

  const handleOrderSuccess = () => {
    toast.success("Order placed successfully!");
  };

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  if (!item)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
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
          className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary-600 font-bold transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left: Image Gallery - 3 columns */}
          <Motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Main Image with Navigation */}
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary-500/10 border-8 border-white dark:border-slate-800 group">
              <img
                src={images[currentImageIndex]}
                alt={item.name}
                className="w-full h-[500px] object-cover"
              />
              
              {/* Category & Price Badges */}
              <div className="absolute top-6 left-6 px-4 py-2 bg-emerald-500 text-white rounded-xl shadow-lg">
                <div className="flex items-center gap-2 font-bold">
                  <Tag size={18} />
                  {item.category}
                </div>
              </div>
              
              <div className="absolute top-6 right-6 px-5 py-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-xl">
                <p className="text-2xl font-extrabold text-primary-700 dark:text-primary-400">
                  {Number(item.price) === 0 ? "FREE" : `$${item.price}`}
                </p>
              </div>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 dark:text-white hover:bg-white dark:hover:bg-slate-900 transition-all shadow-xl opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 dark:text-white hover:bg-white dark:hover:bg-slate-900 transition-all shadow-xl opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-full text-white text-sm font-bold">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`relative rounded-2xl overflow-hidden h-24 border-4 transition-all ${
                    currentImageIndex === idx 
                      ? "border-primary-600 scale-105" 
                      : "border-slate-200 dark:border-slate-700 hover:border-primary-400"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-6 rounded-3xl flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Verified</p>
                  <p className="font-bold text-slate-950 dark:text-white">Safety Check</p>
                </div>
              </div>
              <div className="glass-card p-6 rounded-3xl flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Heart size={24} fill="currentColor" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Health</p>
                  <p className="font-bold text-slate-950 dark:text-white">Premium Care</p>
                </div>
              </div>
            </div>
          </Motion.div>

          {/* Right: Info Section - 2 columns */}
          <Motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="px-3 py-1.5 bg-primary-600 text-white text-xs font-bold uppercase tracking-widest rounded-full">
                  Featured
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-semibold text-sm">
                  <MapPin size={16} />
                  {item.location || "Location Available"}
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-slate-950 dark:text-white leading-tight">
                {item.name}
              </h1>
              
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={20} fill="#fbbf24" className="text-amber-400" />
                ))}
                <span className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">(4.8 / 128 reviews)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                className="w-full btn-premium py-4 text-lg"
                onClick={() => setOpenOrder(true)}
              >
                Adopt / Purchase Now
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button className="px-6 py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-950 dark:text-white font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                  <Heart size={18} />
                  Save
                </button>
                <button className="px-6 py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-950 dark:text-white font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </div>

            {/* Seller Info */}
            <div className="p-6 rounded-[2rem] bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800/50 dark:to-slate-800/30 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-white dark:border-slate-700 flex-shrink-0">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.email || 'seller'}`} alt="" className="w-full h-full" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-950 dark:text-white text-lg">Trusted Provider</h4>
                  <p className="text-sm text-slate-800 dark:text-slate-400 font-medium">Verified member since 2024</p>
                </div>
                <button className="text-primary-600 font-bold hover:underline">Contact</button>
              </div>
            </div>
          </Motion.div>
        </div>

        {/* Sections Below */}
        <div className="mt-20 space-y-16">
          {/* Overview/Description Section */}
          <section className="glass-card p-10 rounded-[2.5rem]">
            <h2 className="text-3xl font-display font-bold text-slate-950 dark:text-white mb-6 flex items-center gap-3">
              <Package className="text-primary-600" />
              Overview & Description
            </h2>
            <p className="text-xl text-slate-800 dark:text-slate-300 leading-relaxed font-medium">
              {item.description || "This is a premium pet listing with complete health checkups and vaccination records. The pet is very friendly and well-trained, making it perfect for families with children. All necessary documentation and certifications are available."}
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <CheckCircle2 className="text-emerald-500" size={24} />
                <div>
                  <p className="font-bold text-slate-950 dark:text-white">Health Certified</p>
                  <p className="text-sm text-slate-500">Full medical records</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="text-emerald-500" size={24} />
                <div>
                  <p className="font-bold text-slate-950 dark:text-white">Vaccinated</p>
                  <p className="text-sm text-slate-500">Up-to-date shots</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="text-emerald-500" size={24} />
                <div>
                  <p className="font-bold text-slate-950 dark:text-white">Trained</p>
                  <p className="text-sm text-slate-500">Basic commands</p>
                </div>
              </div>
            </div>
          </section>

          {/* Key Information/Specs Section */}
          <section className="glass-card p-10 rounded-[2.5rem]">
            <h2 className="text-3xl font-display font-bold text-slate-950 dark:text-white mb-8">Key Information & Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Category", value: item.category, icon: <Tag size={20} /> },
                { label: "Location", value: item.location || "Available on Request", icon: <MapPin size={20} /> },
                { label: "Price", value: Number(item.price) === 0 ? "Free Adoption" : `$${item.price}`, icon: <Heart size={20} /> },
                { label: "Posted Date", value: new Date(item.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), icon: <Calendar size={20} /> },
                { label: "Age", value: item.age || "2 Years", icon: <User size={20} /> },
                { label: "Weight", value: item.weight || "15 lbs", icon: <Package size={20} /> },
              ].map((spec, idx) => (
                <div key={idx} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-xl flex items-center justify-center">
                      {spec.icon}
                    </div>
                    <span className="font-semibold text-slate-600 dark:text-slate-400">{spec.label}</span>
                  </div>
                  <span className="font-bold text-slate-950 dark:text-white">{spec.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews/Ratings Section */}
          <section className="glass-card p-10 rounded-[2.5rem]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-display font-bold text-slate-950 dark:text-white">Reviews & Ratings</h2>
              <div className="flex items-center gap-2">
                <Star size={28} fill="#fbbf24" className="text-amber-400" />
                <span className="text-3xl font-bold text-slate-950 dark:text-white">4.8</span>
                <span className="text-slate-500 dark:text-slate-400">(128)</span>
              </div>
            </div>
            
            <div className="space-y-6">
              {[
                { name: "Sarah Johnson", rating: 5, comment: "Amazing experience! The pet is exactly as described and very healthy.", date: "2 days ago" },
                { name: "Michael Chen", rating: 5, comment: "Great seller, very responsive and professional. Highly recommend!", date: "1 week ago" },
                { name: "Emma Davis", rating: 4, comment: "Good overall experience. The pet adapted quickly to our home.", date: "2 weeks ago" }
              ].map((review, idx) => (
                <div key={idx} className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-500">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${review.name}`} alt="" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-950 dark:text-white">{review.name}</p>
                        <p className="text-sm text-slate-500">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} size={16} fill="#fbbf24" className="text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-800 dark:text-slate-400 leading-relaxed font-medium">{review.comment}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related/Suggested Items Section */}
          {relatedItems.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-display font-bold text-slate-950 dark:text-white">Similar Listings</h2>
                <Link to="/pets-supplies" className="text-primary-600 font-bold hover:underline flex items-center gap-1">
                  View All <ArrowLeft size={18} className="rotate-180" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedItems.slice(0, 4).map((relatedItem) => (
                  <ListingCard key={relatedItem._id} item={relatedItem} />
                ))}
              </div>
            </section>
          )}
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

