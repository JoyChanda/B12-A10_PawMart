import React, { useEffect, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import useAuth from "../hooks/useAuth";
import API from "../services/api";
import toast from "react-hot-toast";

export default function OrderModal({ item, isOpen, onClose, onSuccess }) {
  const { user } = useAuth();
  const [order, setOrder] = useState({
    address: "",
    phone: "",
    date: "",
    notes: "",
    quantity: 1,
  });

  useEffect(() => {
    if (!isOpen) {
      setOrder({ address: "", phone: "", date: "", notes: "", quantity: 1 });
    } else {
      setOrder((prev) => ({
        ...prev,
        quantity: item.category === "Pets" ? 1 : prev.quantity || 1,
      }));
    }
  }, [isOpen, item.category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.email) {
      toast.error("Please sign in before placing an order.");
      return;
    }

    if (
      item.category !== "Pets" &&
      (!order.quantity || Number(order.quantity) <= 0)
    ) {
      toast.error("Please enter a valid quantity.");
      return;
    }

    const payload = {
      productId: item._id,
      productName: item.name,
      buyerName: user?.displayName || "Guest",
      email: user?.email,
      quantity: item.category === "Pets" ? 1 : Number(order.quantity),
      price: item.price,
      address: order.address,
      phone: order.phone,
      date: order.date,
      additionalNotes: order.notes || "",
    };

    try {
      await API.post("/orders", payload);
      toast.success("Order placed successfully! 🎉");
      onSuccess();
      onClose();
      setOrder({ address: "", phone: "", date: "", notes: "", quantity: 1 });
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to place order.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg w-full max-w-md shadow-2xl mx-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-100">
                Order: {item.name}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  defaultValue={user?.displayName || ""}
                  readOnly
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  placeholder="Name"
                />
                <input
                  defaultValue={user?.email || ""}
                  readOnly
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  placeholder="Email"
                />
                <input
                  value={item.category === "Pets" ? 1 : order.quantity}
                  onChange={(e) =>
                    setOrder({ ...order, quantity: e.target.value })
                  }
                  type="number"
                  min={1}
                  disabled={item.category === "Pets"}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 disabled:bg-gray-100 dark:disabled:bg-gray-800"
                  placeholder="Quantity"
                />
                <input
                  value={
                    item.price === 0 ? "Free for Adoption" : `$${item.price}`
                  }
                  readOnly
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                />
              </div>
              <input
                value={order.address}
                onChange={(e) =>
                  setOrder({ ...order, address: e.target.value })
                }
                placeholder="Address *"
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
              />
              <input
                value={order.phone}
                onChange={(e) => setOrder({ ...order, phone: e.target.value })}
                placeholder="Phone *"
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
              />
              <input
                type="date"
                value={order.date}
                onChange={(e) => setOrder({ ...order, date: e.target.value })}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
              <textarea
                value={order.notes}
                onChange={(e) => setOrder({ ...order, notes: e.target.value })}
                placeholder="Additional Notes (optional)"
                rows="3"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <Motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-primary dark:bg-orange-600 text-white rounded hover:bg-orange-600 dark:hover:bg-orange-700"
                >
                  Place Order
                </Motion.button>
              </div>
            </form>
          </Motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
