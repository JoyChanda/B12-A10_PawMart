import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { PlusCircle, Tag, DollarSign, Layers, MapPin, Image as ImageIcon, Calendar, FileText, Loader2, Sparkles } from "lucide-react";

export default function AddListing() {
  const { user } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    document.title = "PawMart | Create New Listing";
  }, []);

  const initialForm = useMemo(
    () => ({
      name: "",
      category: "Pets",
      price: 0,
      quantity: 1,
      location: "",
      description: "",
      image: "",
      date: "",
    }),
    []
  );

  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Authentication required to add a listing.");
      return;
    }

    const requiredFields = ["name", "category", "location", "description", "image", "date"];
    const missingField = requiredFields.find((key) => !form[key] || form[key].toString().trim() === "");

    if (missingField) {
      toast.error(`Please provide a ${missingField}.`);
      return;
    }

    const priceNumber = Number(form.price);
    const quantityNumber = Number(form.quantity);

    if (priceNumber < 0) return toast.error("Price cannot be negative.");
    if (quantityNumber <= 0) return toast.error("Quantity must be at least 1.");

    const payload = {
      ...form,
      price: priceNumber,
      quantity: quantityNumber,
      email: user.email,
    };

    setSubmitting(true);
    try {
      await API.post("/listings", payload);
      toast.success("Listing published successfully! 🎉");
      setForm({ ...initialForm });
      nav("/my-listings");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Publication failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-24 pb-20 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 mb-12 text-center sm:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-bold text-sm border border-primary-100 dark:border-primary-800">
            <PlusCircle size={16} />
            <span>Create Marketplace Content</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-slate-900 dark:text-white">
            Add a New Listing
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">
            Join our community of caregivers. Share details about the pet or supply item you'd like to list.
          </p>
        </motion.div>

        <Motion.form 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-800/50 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-12 shadow-2xl shadow-primary-500/10 border border-slate-100 dark:border-slate-700/50 space-y-10"
        >
          {/* Header Info */}
          <div className="flex items-center gap-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-2xl border border-primary-100 dark:border-primary-800">
             <div className="p-3 bg-primary-500 text-white rounded-xl shadow-lg">
               <Sparkles size={24} />
             </div>
             <div>
               <p className="font-bold text-slate-900 dark:text-white">Premium Listing</p>
               <p className="text-sm text-slate-500 dark:text-slate-400">All fields are monitored for community safety.</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Listing Name */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Listing Name</label>
              <div className="relative group">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                <input
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="e.g. Golden Retriever Puppy"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Category</label>
              <div className="relative group">
                <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors pointer-events-none" size={20} />
                <select
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="w-full pl-12 pr-10 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-white appearance-none cursor-pointer font-bold"
                >
                  <option>Pets</option>
                  <option>Pet Food</option>
                  <option>Accessories</option>
                  <option>Care Products</option>
                </select>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Price (USD)</label>
              <div className="relative group">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                <input
                  type="number"
                  value={form.price}
                  min={0}
                  step="0.01"
                  onChange={(e) => handleChange("price", e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Available Quantity</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors font-bold text-xs uppercase underline underline-offset-2">Qty</div>
                <input
                  type="number"
                  value={form.quantity}
                  min={1}
                  onChange={(e) => handleChange("quantity", e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Location</label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                <input
                  value={form.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  placeholder="City, Country"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Available Date */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Target Date</label>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Media / Image URL</label>
            <div className="relative group">
              <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
              <input
                value={form.image}
                onChange={(e) => handleChange("image", e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Detailed Description</label>
            <div className="relative group">
              <FileText className="absolute left-4 top-6 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
              <textarea
                rows={6}
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Share details about temperament, health checks, care instructions, etc."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-3xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => nav(-1)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto btn-premium px-12 py-4 text-lg disabled:opacity-70"
            >
              {submitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={20} />
                  <span>Publishing...</span>
                </div>
              ) : (
                "Publish Listing"
              )}
            </button>
          </div>
        </Motion.form>
      </div>
    </div>
  );
}

