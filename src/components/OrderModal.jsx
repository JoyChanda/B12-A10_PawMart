import React, { useEffect, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import useAuth from "../hooks/useAuth";
import API from "../services/api";
import toast from "react-hot-toast";
import { X, User, Mail, MapPin, Phone, Calendar, FileText, CreditCard, ShoppingCart, Loader2, Sparkles } from "lucide-react";

export default function OrderModal({ item, isOpen, onClose, onSuccess }) {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState({
    buyerName: "",
    email: "",
    address: "",
    phone: "",
    date: "",
    notes: "",
    quantity: 1,
  });

  useEffect(() => {
    if (!isOpen) {
      setOrder({
        buyerName: user?.displayName || "",
        email: user?.email || "",
        address: "",
        phone: "",
        date: "",
        notes: "",
        quantity: 1,
      });
      return;
    }

    if (!item) return;

    setOrder((prev) => ({
      ...prev,
      buyerName: user?.displayName || prev.buyerName || "",
      email: user?.email || prev.email || "",
      quantity: item.category === "Pets" ? 1 : prev.quantity || 1,
    }));
  }, [isOpen, item, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!item?._id || !user?.email) {
      toast.error("Process aborted. Missing critical data.");
      return;
    }

    if (!order.buyerName.trim() || !order.address.trim() || !order.phone.trim()) {
      toast.error("Please fill in all identity and contact fields.");
      return;
    }

    setSubmitting(true);
    const payload = {
      productId: item._id,
      productName: item.name,
      buyerName: order.buyerName.trim(),
      email: order.email.trim(),
      quantity: item.category === "Pets" ? 1 : Number(order.quantity),
      price: item.price,
      address: order.address,
      phone: order.phone,
      date: order.date,
      additionalNotes: order.notes || "",
    };

    try {
      await API.post("/orders", payload);
      toast.success("Order secured! Check your dashboard. 🚀");
      onSuccess?.();
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.error || "Transaction declined.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && item && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />
          
          <Motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden"
          >
            {/* Modal Header Decor */}
            <div className="h-2 bg-gradient-to-r from-primary-500 via-emerald-500 to-amber-500"></div>
            
            <div className="p-8 sm:p-12">
              <div className="flex justify-between items-start mb-10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-primary-500 font-bold text-sm uppercase tracking-widest">
                    <ShoppingCart size={16} />
                    <span>Secure Checkout</span>
                  </div>
                  <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
                    {item.name}
                  </h3>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400">
                  <X size={28} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Summary Card */}
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md">
                         <img src={item.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                         <p className="font-bold text-slate-900 dark:text-white">{item.category}</p>
                         <p className="text-sm text-slate-500">Processing with PawMart Security</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-2xl font-display font-bold text-primary-500">
                         {item.price === 0 ? "FREE" : `$${item.price}`}
                      </p>
                      <p className="text-xs font-bold text-slate-400 uppercase">Unit Price</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                      <input
                        value={order.buyerName}
                        onChange={(e) => setOrder({ ...order, buyerName: e.target.value })}
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all dark:text-white"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                      <input
                        type="email"
                        value={order.email}
                        readOnly
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none text-slate-500 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Desired Quantity</label>
                    <div className="relative group">
                      <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                      <input
                        type="number"
                        min={1}
                        max={item.quantity || 1}
                        value={order.quantity}
                        disabled={item.category === "Pets"}
                        onChange={(e) => setOrder({ ...order, quantity: e.target.value })}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all dark:text-white disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Contact Phone</label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                      <input
                        value={order.phone}
                        onChange={(e) => setOrder({ ...order, phone: e.target.value })}
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all dark:text-white"
                        placeholder="+1 234 567 890"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Shipping / Pickup Address</label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                      <input
                        value={order.address}
                        onChange={(e) => setOrder({ ...order, address: e.target.value })}
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all dark:text-white"
                        placeholder="123 Street Name, City, Country"
                      />
                    </div>
                  </div>

                  {/* Submission Date */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Preferred Collection Date</label>
                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                      <input
                        type="date"
                        value={order.date}
                        onChange={(e) => setOrder({ ...order, date: e.target.value })}
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-8 py-4 border-2 border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-slate-950 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                  >
                    Discard Charge
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 btn-premium py-4 text-lg disabled:opacity-70"
                  >
                    {submitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="animate-spin" size={20} />
                        <span>Verifying...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <CreditCard size={20} />
                        <span>Confirm Order</span>
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </Motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

