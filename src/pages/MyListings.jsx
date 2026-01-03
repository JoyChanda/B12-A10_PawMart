import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { Plus, Edit3, Trash2, Eye, Calendar, MapPin, Tag, DollarSign, Loader2, PackageOpen, AlertCircle, X } from "lucide-react";

const categories = ["Pets", "Pet Food", "Accessories", "Care Products"];

export default function MyListings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const resetForm = useMemo(
    () => ({
      name: "",
      category: "Pets",
      price: 0,
      location: "",
      description: "",
      image: "",
      date: "",
    }),
    []
  );
  const [form, setForm] = useState(resetForm);

  useEffect(() => {
    document.title = "PawMart | My Account";
  }, []);

  const extractListings = (payload) => {
    if (!payload) return [];
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload)) return payload;
    return [];
  };

  const toListing = (payload) => {
    if (!payload) return null;
    if (payload.data && !Array.isArray(payload.data)) return payload.data;
    return payload;
  };

  const fetchListings = async () => {
    if (!user?.email) return;
    setIsLoading(true);
    try {
      const res = await API.get("/listings", {
        params: { email: user.email },
      });
      setListings(extractListings(res.data));
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to load listings.");
      setListings([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [user?.email]);

  const openEditModal = (listing) => {
    const normalizedListing = toListing(listing);
    setSelectedListing(normalizedListing);
    setForm({
      name: normalizedListing?.name || "",
      category: normalizedListing?.category || "Pets",
      price: normalizedListing?.category === "Pets" ? 0 : normalizedListing?.price ?? 0,
      location: normalizedListing?.location || "",
      description: normalizedListing?.description || "",
      image: normalizedListing?.image || "",
      date: normalizedListing?.date || "",
    });
    setIsEditOpen(true);
  };

  const handleEditField = (field, value) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "category" && value === "Pets") updated.price = 0;
      return updated;
    });
  };

  const validateForm = () => {
    if (!form.name || !form.location || !form.description || !form.image) {
      toast.error("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const handleUpdate = async () => {
    if (!selectedListing?._id || !validateForm()) return;

    setSubmitLoading(true);
    try {
      const payload = {
        ...form,
        price: form.category === "Pets" ? 0 : Number(form.price || 0),
      };
      const updated = await API.patch(`/listings/${selectedListing._id}`, payload);
      const updatedListing = toListing(updated?.data ?? updated);
      
      setListings((prev) => prev.map((item) => item._id === selectedListing._id ? { ...item, ...updatedListing } : item));
      toast.success("Listing updated successfully! 🎉");
      setIsEditOpen(false);
    } catch (err) {
      toast.error("Update failed. Please check your data.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedListing?._id) return;
    setDeleteLoading(true);
    try {
      await API.delete(`/listings/${selectedListing._id}`);
      setListings((prev) => prev.filter((item) => item._id !== selectedListing._id));
      toast.success("Listing removed from database.");
      setIsDeleteOpen(false);
    } catch (err) {
      toast.error("Deletion failed.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <Motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest border border-emerald-100 dark:border-emerald-800">
             <Tag size={12} />
             <span>Active Inventory</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-slate-900 dark:text-white leading-tight">
            My Listings
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl leading-relaxed">
            Take full control of your published marketplace items. Edit, update, or remove them at any time.
          </p>
        </Motion.div>
        <Motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/dashboard/add-listing")}
          className="btn-premium px-8 py-4 flex items-center gap-2 group shadow-xl"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          Create New Item
        </Motion.button>
      </div>

      {/* Listings Content */}
      <div className="bg-white dark:bg-slate-800/50 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary-500/5 border border-slate-100 dark:border-slate-700/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Preview</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Details</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Price</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Stats</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="py-32">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
                      <p className="text-slate-400 font-bold animate-pulse">Syncing your data...</p>
                    </div>
                  </td>
                </tr>
              ) : listings.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-32">
                    <div className="flex flex-col items-center justify-center space-y-6">
                      <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-full text-slate-300">
                        <PackageOpen size={64} />
                      </div>
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">No Listings Found</h3>
                        <p className="text-slate-500 mt-2">You haven't added anything to the marketplace yet.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                listings.map((listing) => (
                  <tr key={listing._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white dark:border-slate-700 shadow-xl relative">
                         <img src={listing.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                         <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-slate-900/0 transition-colors"></div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <p className="font-bold text-slate-950 dark:text-white text-lg">{listing.name}</p>
                        <div className="flex items-center gap-3 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                          <span className="flex items-center gap-1.5 px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-md">
                            <Tag size={12} />
                            {listing.category}
                          </span>
                          <span className="flex items-center gap-1 text-slate-500 italic lowercase">
                            <MapPin size={12} />
                            {listing.location}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-lg font-black text-slate-950 dark:text-white">
                        {listing.price === 0 ? (
                          <span className="text-emerald-500">FREE</span>
                        ) : (
                          `$${listing.price}`
                        )}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                        <Calendar size={14} />
                        {new Date(listing.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-3">
                         <Link to={`/listing/${listing._id}`} className="p-3 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-primary-600 hover:text-white transition-all shadow-md border border-slate-100 dark:border-slate-700">
                           <Eye size={20} />
                         </Link>
                         <button onClick={() => openEditModal(listing)} className="p-3 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-md border border-slate-100 dark:border-slate-700">
                           <Edit3 size={20} />
                         </button>
                         <button onClick={() => { setSelectedListing(listing); setIsDeleteOpen(true); }} className="p-3 bg-white dark:bg-slate-800 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-md border border-slate-100 dark:border-slate-700">
                           <Trash2 size={20} />
                         </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <Motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
              onClick={() => setIsEditOpen(false)}
            />
            <Motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden border border-white/20"
            >
              <div className="p-8 sm:p-12">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-3xl font-display font-bold dark:text-white">Update Listing</h3>
                  <button onClick={() => setIsEditOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400">
                    <X size={28} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 ml-1">Pet/Product Name</label>
                    <input value={form.name} onChange={(e) => handleEditField("name", e.target.value)} className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 ml-1">Category</label>
                    <select value={form.category} onChange={(e) => handleEditField("category", e.target.value)} className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white font-bold appearance-none">
                      {categories.map((cat) => ( <option key={cat}>{cat}</option> ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 ml-1">Price (USD)</label>
                    <input type="number" value={form.price} disabled={form.category === "Pets"} onChange={(e) => handleEditField("price", e.target.value)} className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white font-bold disabled:opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 ml-1">Location</label>
                    <input value={form.location} onChange={(e) => handleEditField("location", e.target.value)} className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white font-bold" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-slate-500 ml-1">Image URL</label>
                    <input value={form.image} onChange={(e) => handleEditField("image", e.target.value)} className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white font-bold" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-slate-500 ml-1">Description</label>
                    <textarea rows={4} value={form.description} onChange={(e) => handleEditField("description", e.target.value)} className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-[2rem] outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white" />
                  </div>
                </div>

                <div className="flex gap-4 mt-12">
                  <button onClick={() => setIsEditOpen(false)} className="flex-1 px-8 py-5 border-2 border-slate-200 dark:border-slate-800 rounded-2xl font-black text-slate-950 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-lg">Cancel</button>
                  <button onClick={handleUpdate} disabled={submitLoading} className="flex-1 btn-premium py-5 text-lg">
                    {submitLoading ? <Loader2 className="animate-spin mx-auto" /> : "Sync Changes"}
                  </button>
                </div>
              </div>
            </Motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {isDeleteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <Motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
               onClick={() => setIsDeleteOpen(false)}
            />
            <Motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-2xl text-center border border-white/10"
            >
              <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                <AlertCircle size={48} />
              </div>
              <h3 className="text-3xl font-display font-bold text-slate-950 dark:text-white mb-4">Permanent Action</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-10 text-lg leading-relaxed">
                Confirm removal of <span className="font-bold text-red-500">"{selectedListing?.name}"</span>? This data will be purged from our servers.
              </p>
              <div className="flex gap-4">
                <button onClick={() => setIsDeleteOpen(false)} className="flex-1 py-5 border-2 border-slate-200 dark:border-slate-700 rounded-2xl font-black text-slate-950 dark:text-white text-lg">Keep</button>
                <button onClick={handleDelete} disabled={deleteLoading} className="flex-1 py-5 bg-red-600 text-white rounded-2xl font-black hover:bg-red-700 shadow-2xl shadow-red-600/30 transition-all text-lg active:scale-95">
                  {deleteLoading ? <Loader2 className="animate-spin mx-auto" /> : "Delete"}
                </button>
              </div>
            </Motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
