import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import OrderModal from "../components/OrderModal";

const normalizeListing = (payload) => {
  if (!payload) return null;
  if (payload.data && !Array.isArray(payload.data)) return payload.data;
  if (payload.item) return payload.item;
  return payload;
};

export default function ListingDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [openOrder, setOpenOrder] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuth();

  const pageTitle = useMemo(() => {
    if (isLoading) return "PawMart - Loading...";
    if (errorMessage) return "PawMart - Listing Not Found";
    return item ? `PawMart - ${item.name}` : "PawMart - Listing";
  }, [isLoading, errorMessage, item]);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setErrorMessage("");
    (async () => {
      try {
        const res = await API.get(`/listings/${id}`);
        if (!isMounted) return;
        const listing = normalizeListing(res.data);
        if (!listing?._id) {
          throw new Error("Listing data is unavailable.");
        }
        setItem(listing);
      } catch (err) {
        if (!isMounted) return;
        if (err.code !== "ERR_NETWORK" && err.code !== "ECONNREFUSED") {
          console.error("Error fetching listing:", err);
        }
        setErrorMessage(
          err?.response?.data?.error ||
            "We couldn't find that listing. It may have been removed."
        );
        setItem(null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleOrderSuccess = () => {
    toast.success("Thanks for supporting PawMart!");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-8 text-gray-800 dark:text-gray-200">
        Loading listing details...
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="container mx-auto p-8 text-center text-gray-700 dark:text-gray-300">
        <p className="text-lg font-semibold">{errorMessage}</p>
        <p className="mt-2 text-sm">
          Try going back to{" "}
          <a href="/pets-supplies" className="text-orange-500 hover:underline">
            Pets & Supplies
          </a>{" "}
          to continue browsing.
        </p>
      </div>
    );
  }

  if (!item) {
    return null;
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <img
          src={
            item.image ||
            "https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=900&q=80"
          }
          alt={item.name}
          className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg"
        />
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {item.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {item.category} • {item.location || "Location not specified"}
          </p>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
            {item.description || "No description provided for this listing."}
          </p>
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="font-bold text-lg sm:text-xl text-gray-800 dark:text-gray-100">
              {Number(item.price) === 0
                ? "Free for Adoption"
                : `$${item.price}`}
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
