import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import OrderModal from "../components/OrderModal";

export default function ListingDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [openOrder, setOpenOrder] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    document.title = item ? `PawMart - ${item.name}` : "PawMart - Listing";
  }, [item]);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get(`/listings/${id}`);
        setItem(res.data);
      } catch (err) {
        // Only log if it's not a network/connection error
        if (err.code !== "ERR_NETWORK" && err.code !== "ECONNREFUSED") {
          console.error("Error fetching listing:", err);
        }
        // Keep item as null to show loading state
      }
    })();
  }, [id]);

  const handleOrderSuccess = () => {
    // Order was successfully placed, modal will close automatically
  };

  if (!item)
    return (
      <div className="container mx-auto p-8 text-gray-800 dark:text-gray-200">
        Loading...
      </div>
    );

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg"
        />
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {item.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {item.category} • {item.location}
          </p>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
            {item.description}
          </p>
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="font-bold text-lg sm:text-xl text-gray-800 dark:text-gray-100">
              {item.price === 0 ? "Free for Adoption" : `$${item.price}`}
            </div>
            <button
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-primary dark:bg-orange-600 text-white rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 font-semibold text-sm sm:text-base"
              onClick={() => setOpenOrder(true)}
            >
              Adopt / Order Now
            </button>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      <OrderModal
        item={item}
        isOpen={openOrder}
        onClose={() => setOpenOrder(false)}
        onSuccess={handleOrderSuccess}
      />
    </div>
  );
}
