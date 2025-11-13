import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function AddListing() {
  const { user } = useAuth();
  const nav = useNavigate();

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
      toast.error("You need to be logged in to add a listing.");
      return;
    }

    const requiredFields = [
      "name",
      "category",
      "price",
      "quantity",
      "location",
      "description",
      "image",
      "date",
    ];
    const missingField = requiredFields.find((key) => {
      const value = form[key];
      return (
        value === null ||
        value === undefined ||
        value === "" ||
        (typeof value === "string" && value.trim() === "")
      );
    });

    if (missingField) {
      toast.error("Please complete all fields before submitting.");
      return;
    }

    const priceNumber = Number(form.price);
    const quantityNumber = Number(form.quantity);

    if (priceNumber < 0) {
      toast.error("Price cannot be negative.");
      return;
    }

    if (quantityNumber <= 0) {
      toast.error("Quantity must be greater than zero.");
      return;
    }

    const payload = {
      ...form,
      price: priceNumber,
      quantity: quantityNumber,
      email: user.email,
    };

    setSubmitting(true);
    try {
      await API.post("/listings", payload);
      toast.success("Listing added successfully!");
      setForm({ ...initialForm });
      nav("/my-listings");
    } catch (err) {
      toast.error(
        err?.response?.data?.error || "Failed to add listing. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100">
          Add a New Listing
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
          Fill in the details below to publish a new pet or supply listing.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 bg-white dark:bg-gray-900 shadow-lg rounded-2xl border border-orange-100 dark:border-gray-700 p-5 sm:p-8 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Listing Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Listing Name
            </label>
            <input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g. Golden Retriever Puppy"
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-800 dark:text-gray-100 placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-500/40 transition"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-800 dark:text-gray-100 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-500/40 transition"
            >
              <option>Pets</option>
              <option>Pet Food</option>
              <option>Accessories</option>
              <option>Care Products</option>
            </select>
          </div>

          {/* Price */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Price (USD)
            </label>
            <input
              type="number"
              value={form.price}
              min={0}
              step="0.01"
              onChange={(e) => handleChange("price", e.target.value)}
              placeholder="e.g. 25.00"
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-800 dark:text-gray-100 placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-500/40 transition"
            />
          </div>

          {/* Quantity */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Quantity
            </label>
            <input
              type="number"
              value={form.quantity}
              min={1}
              onChange={(e) => handleChange("quantity", e.target.value)}
              placeholder="e.g. 5"
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-800 dark:text-gray-100 placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-500/40 transition"
            />
          </div>

          {/* Location */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Location
            </label>
            <input
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="City, Country"
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-800 dark:text-gray-100 placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-500/40 transition"
            />
          </div>

          {/* Image URL */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Image URL
            </label>
            <input
              value={form.image}
              onChange={(e) => handleChange("image", e.target.value)}
              placeholder="https://images..."
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-800 dark:text-gray-100 placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-500/40 transition"
            />
          </div>

          {/* Available Date */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Available From
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-800 dark:text-gray-100 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-500/40 transition"
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Detailed Description
          </label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Share details about temperament, care instructions, package contents, etc."
            className="rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-gray-100 placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-500/40 transition"
          />
        </div>

        {/* Owner Email */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Owner Email
          </label>
          <input
            value={user?.email || ""}
            readOnly
            className="rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-4 py-2.5 text-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => nav(-1)}
            className="px-4 py-2.5 rounded-xl border border-orange-200 dark:border-gray-600 text-orange-600 dark:text-orange-400 font-semibold hover:bg-orange-50 dark:hover:bg-gray-800 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2.5 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {submitting ? "Saving..." : "Add Listing"}
          </button>
        </div>
      </form>
    </div>
  );
}
