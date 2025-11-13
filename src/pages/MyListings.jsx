import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { AnimatePresence, motion as Motion } from "framer-motion";

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
    document.title = "PawMart - My Listings";
  }, []);

  const extractListings = (payload) => {
    if (!payload) return [];
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.items)) return payload.items;
    return [];
  };

  const toListing = (payload) => {
    if (!payload) return null;
    if (payload.data && !Array.isArray(payload.data)) return payload.data;
    if (payload.item) return payload.item;
    return payload;
  };

  const fetchListings = async () => {
    if (!user?.email) return;
    setIsLoading(true);
    setSelectedListing(null);
    try {
      const res = await API.get("/listings", {
        params: { email: user.email },
      });
      setListings(extractListings(res.data));
    } catch (err) {
      if (err.code !== "ERR_NETWORK" && err.code !== "ECONNREFUSED") {
        console.error("Error fetching listings:", err);
      }
      toast.error(
        err?.response?.data?.error ||
          "Unable to load your listings right now. Please try again shortly."
      );
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
      price:
        normalizedListing?.category === "Pets"
          ? 0
          : normalizedListing?.price ?? 0,
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
      if (field === "category" && value === "Pets") {
        updated.price = 0;
      }
      return updated;
    });
  };

  const validateForm = () => {
    const requiredFields = [
      "name",
      "category",
      "location",
      "description",
      "image",
    ];
    const missingField = requiredFields.find((field) => {
      const value = form[field];
      return !value || (typeof value === "string" && value.trim() === "");
    });

    if (missingField) {
      toast.error("Please complete all fields before saving.");
      return false;
    }

    const price = Number(form.price);
    if (form.category === "Pets" && price !== 0) {
      toast.error("Adoption listings must have a price of 0.");
      return false;
    }
    if (form.category !== "Pets" && price <= 0) {
      toast.error("Price must be greater than zero for this category.");
      return false;
    }

    return true;
  };

  const handleUpdate = async () => {
    if (!selectedListing?._id) return;
    if (!validateForm()) return;

    setSubmitLoading(true);
    try {
      const payload = {
        ...form,
        price: form.category === "Pets" ? 0 : Number(form.price || 0),
      };
      const updated = await API.patch(
        `/listings/${selectedListing._id}`,
        payload
      );
      const updatedListing = toListing(updated?.data ?? updated);
      if (!updatedListing?._id) {
        throw new Error("Invalid response while updating listing.");
      }
      setListings((prev) =>
        prev.map((item) =>
          item._id === selectedListing._id
            ? { ...item, ...updatedListing }
            : item
        )
      );
      toast.success("Listing updated successfully!");
      setIsEditOpen(false);
      setSelectedListing(null);
      setForm({ ...resetForm });
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to update listing.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const confirmDelete = (listing) => {
    setSelectedListing(listing);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedListing?._id) return;
    setDeleteLoading(true);
    try {
      await API.delete(`/listings/${selectedListing._id}`);
      setListings((prev) =>
        prev.filter((item) => item._id !== selectedListing._id)
      );
      toast.success("Listing deleted.");
      setIsDeleteOpen(false);
      setSelectedListing(null);
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to delete listing.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100">
            My Listings
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage the pets and products you’ve shared with the PawMart
            community.
          </p>
        </div>
        <button
          onClick={() => navigate("/add-listing")}
          className="w-full sm:w-auto px-4 py-2 bg-orange-500 dark:bg-orange-600 text-white rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 text-sm sm:text-base font-semibold"
        >
          + Add New Listing
        </button>
      </div>

      <div className="mt-4 overflow-x-auto -mx-3 sm:mx-0">
        <table className="w-full table-auto min-w-[800px]">
          <thead className="text-left bg-gray-50/60 dark:bg-gray-800/70">
            <tr className="border-b border-gray-300 dark:border-gray-700">
              <th className="text-gray-800 dark:text-gray-200 py-3 px-4 font-semibold">
                Image
              </th>
              <th className="text-gray-800 dark:text-gray-200 py-3 px-4 font-semibold">
                Name
              </th>
              <th className="text-gray-800 dark:text-gray-200 py-3 px-4 font-semibold">
                Category
              </th>
              <th className="text-gray-800 dark:text-gray-200 py-3 px-4 font-semibold">
                Price
              </th>
              <th className="text-gray-800 dark:text-gray-200 py-3 px-4 font-semibold">
                Location
              </th>
              <th className="text-gray-800 dark:text-gray-200 py-3 px-4 font-semibold">
                Created At
              </th>
              <th className="text-gray-800 dark:text-gray-200 py-3 px-4 font-semibold text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan="7"
                  className="py-6 text-center text-gray-500 dark:text-gray-400"
                >
                  Loading your listings...
                </td>
              </tr>
            ) : listings.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="py-6 text-center text-gray-500 dark:text-gray-400"
                >
                  You haven't added any listings yet.
                </td>
              </tr>
            ) : (
              listings.map((listing) => (
                <tr
                  key={listing._id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50/80 dark:hover:bg-gray-800/60 transition"
                >
                  <td className="py-3 px-4">
                    <img
                      src={
                        listing.image ||
                        "https://via.placeholder.com/100x100?text=No+Image"
                      }
                      alt={listing.name}
                      className="w-20 h-20 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/100x100?text=No+Image";
                      }}
                    />
                  </td>
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-100 font-medium">
                    {listing.name}
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                    {listing.category}
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                    {listing.price === 0 ? "Free" : `$${listing.price}`}
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                    {listing.location || "—"}
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400 text-sm">
                    {listing.createdAt
                      ? new Date(listing.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="py-3 px-4 text-right space-x-3 whitespace-nowrap">
                    <button
                      onClick={() => navigate(`/listing/${listing._id}`)}
                      className="text-sm font-semibold text-orange-600 dark:text-orange-400 hover:underline"
                    >
                      View
                    </button>
                    <button
                      onClick={() => openEditModal(listing)}
                      className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(listing)}
                      className="text-sm font-semibold text-red-500 dark:text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 px-4">
            <Motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-orange-100 dark:border-gray-700 overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Edit Listing
                </h3>
                <button
                  onClick={() => {
                    setIsEditOpen(false);
                    setSelectedListing(null);
                    setForm({ ...resetForm });
                  }}
                  className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 text-2xl leading-none"
                  aria-label="Close edit modal"
                >
                  ×
                </button>
              </div>

              <div className="px-6 py-5 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field
                    label="Name"
                    value={form.name}
                    onChange={(e) => handleEditField("name", e.target.value)}
                    placeholder="Listing name"
                  />
                  <Field
                    label="Category"
                    as="select"
                    value={form.category}
                    onChange={(e) =>
                      handleEditField("category", e.target.value)
                    }
                  >
                    {categories.map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </Field>
                  <Field
                    label="Price"
                    type="number"
                    value={form.price}
                    min={form.category === "Pets" ? 0 : 1}
                    step="0.01"
                    disabled={form.category === "Pets"}
                    onChange={(e) => handleEditField("price", e.target.value)}
                    placeholder={
                      form.category === "Pets" ? "0 (Adoption)" : "e.g. 25.00"
                    }
                  />
                  <Field
                    label="Location"
                    value={form.location}
                    onChange={(e) =>
                      handleEditField("location", e.target.value)
                    }
                    placeholder="City, Country"
                  />
                  <Field
                    label="Available From"
                    type="date"
                    value={form.date}
                    onChange={(e) => handleEditField("date", e.target.value)}
                  />
                  <Field
                    label="Image URL"
                    value={form.image}
                    onChange={(e) => handleEditField("image", e.target.value)}
                    placeholder="https://images..."
                  />
                </div>

                <div>
                  <Field
                    label="Description"
                    as="textarea"
                    rows={4}
                    value={form.description}
                    onChange={(e) =>
                      handleEditField("description", e.target.value)
                    }
                    placeholder="Describe this listing..."
                  />
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50/80 dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditOpen(false);
                    setSelectedListing(null);
                    setForm({ ...resetForm });
                  }}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdate}
                  disabled={submitLoading}
                  className="px-5 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </Motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {isDeleteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
            <Motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-red-100 dark:border-red-500/30 p-6 space-y-4 text-center"
            >
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Remove this listing?
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                This action cannot be undone. Your listing will be removed from
                the marketplace immediately.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsDeleteOpen(false);
                    setSelectedListing(null);
                  }}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className="px-5 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {deleteLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </Motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Field = ({
  label,
  as: Tag = "input",
  className = "",
  children,
  ...props
}) => (
  <label className="flex flex-col gap-2">
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </span>
    {React.createElement(
      Tag,
      {
        className: `rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-500/40 transition ${className}`,
        ...props,
      },
      children
    )}
  </label>
);
