import React, { useEffect, useMemo, useState } from "react";
import API from "../services/api";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import autoTablePlugin from "jspdf-autotable";
import { motion as Motion } from "framer-motion";
import { FileText, Download, Trash2, Loader2, ClipboardList, ShoppingBag, Calendar, User, DollarSign, Package } from "lucide-react";

export default function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deletingOrderId, setDeletingOrderId] = useState(null);

  useEffect(() => {
    document.title = "PawMart | Purchase History";
  }, []);

  const extractOrders = (payload) => {
    if (!payload) return [];
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload)) return payload;
    return [];
  };

  useEffect(() => {
    if (!user?.email) return;

    (async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const res = await API.get("/orders", { params: { email: user.email } });
        setOrders(extractOrders(res.data));
      } catch (err) {
        toast.error("Network synchronization failed.");
        setErrorMessage("Critical sync error. Please refresh.");
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [user?.email]);

  const handleDeleteOrder = async (orderId) => {
    if (!orderId) return;

    setDeletingOrderId(orderId);
    try {
      await API.delete(`/orders/${orderId}`);
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
      toast.success("Record cleared successfully.");
    } catch (err) {
      toast.error("Deletion rejected by server.");
    } finally {
      setDeletingOrderId(null);
    }
  };

  const downloadPDF = () => {
    try {
      if (!orders || orders.length === 0) return toast.error("Empty dataset.");
      const doc = new jsPDF();
      
      // Styling
      doc.setTextColor(79, 70, 229); // Primary Indigo/Violet
      doc.setFontSize(22);
      doc.text("PawMart Official Order Report", 14, 20);
      
      doc.setTextColor(100);
      doc.setFontSize(10);
      doc.text(`User: ${user?.displayName || user?.email}`, 14, 28);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 34);

      const tableColumn = ["Product", "Price", "Qty", "Customer Info", "Shipping Address", "Date"];
      const tableRows = orders.map((o) => [
        o?.productName || "—",
        Number(o.price) === 0 ? "Free" : `$${Number(o.price).toFixed(2)}`,
        o?.quantity ?? "1",
        `${o?.buyerName || "N/A"}\n${o?.phone || "N/A"}`,
        o?.address || "—",
        o?.date ? new Date(o.date).toLocaleDateString() : "—",
      ]);

      const autoTable = autoTablePlugin.default || autoTablePlugin;
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 45,
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 4 },
        headStyles: { fillColor: [124, 58, 237], textColor: [255, 255, 255], fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [249, 250, 251] },
      });

      doc.save(`pawmart-report-${Date.now()}.pdf`);
      toast.success("HD Report generated! 📄");
    } catch (error) {
      toast.error("PDF engine failure.");
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
         <Motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 font-bold text-xs uppercase tracking-widest border border-violet-100 dark:border-violet-800">
             <ShoppingBag size={12} />
             <span>Transaction Ledger</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-slate-900 dark:text-white leading-tight">
            My Orders
          </h1>
          <p className="text-slate-800 dark:text-slate-400 text-lg max-w-xl leading-relaxed font-medium">
            Monitor your acquisition history and manage active adoption requests in real-time.
          </p>
        </Motion.div>
        <Motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={downloadPDF}
          disabled={!orders || orders.length === 0}
          className="btn-premium px-8 py-4 flex items-center gap-3 disabled:opacity-50 group shadow-xl"
        >
          <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
          <span className="font-bold">Export PDF Report</span>
        </Motion.button>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-slate-800/50 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary-500/5 border border-slate-100 dark:border-slate-700/50">
         <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Product</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Invoice</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Logistics</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Fulfillment</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="py-32">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
                        <p className="text-slate-400 font-bold">Securely fetching history...</p>
                      </div>
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-32 text-center">
                       <div className="flex flex-col items-center justify-center space-y-6">
                          <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-full text-slate-300">
                             <ClipboardList size={64} />
                          </div>
                          <div>
                             <h3 className="text-2xl font-bold dark:text-white">Log is Currently Empty</h3>
                             <p className="text-slate-800 dark:text-slate-400 mt-1 font-bold">{errorMessage || "You haven't initiated any orders yet."}</p>
                          </div>
                       </div>
                    </td>
                  </tr>
                ) : (
                  orders.map((o) => (
                    <tr key={o?._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors group">
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl shadow-sm">
                               <Package size={24} />
                            </div>
                            <p className="font-bold text-slate-950 dark:text-white text-lg">{o?.productName || "Item Removed"}</p>
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <div className="space-y-1">
                            <p className="font-black text-slate-950 dark:text-white flex items-center gap-1.5 text-lg">
                               <DollarSign size={16} className="text-emerald-500" />
                               {o?.price === 0 ? <span className="text-emerald-500">FREE</span> : `$${Number(o?.price).toFixed(2)}`}
                            </p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantity: {o?.quantity || 1}</p>
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-slate-950 dark:text-slate-200 font-bold">
                               <User size={14} className="text-primary-500" />
                               {o?.buyerName || "User"}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-500 font-black">
                               <FileText size={14} />
                               {o?.phone || "Private"}
                            </div>
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <div className="space-y-1">
                            <p className="text-sm font-bold text-slate-900 dark:text-slate-300 line-clamp-1">{o?.address || "On-site Pickup"}</p>
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                               <Calendar size={12} />
                               {o?.date ? new Date(o.date).toLocaleDateString() : "Processing"}
                            </div>
                         </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                         <button 
                           onClick={() => handleDeleteOrder(o?._id)} 
                           disabled={deletingOrderId === o?._id}
                           className="p-3 bg-white dark:bg-slate-800 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-md border border-slate-100 dark:border-slate-700 disabled:opacity-50"
                         >
                           {deletingOrderId === o?._id ? <Loader2 size={20} className="animate-spin" /> : <Trash2 size={20} />}
                         </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
           </table>
         </div>
      </div>
    </div>
  );
}
