"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useAxiosPost from "@/utils/useAxiosPost";

export default function EditCountryModal({ open, onClose, country, onSuccess }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [, updatecountry] = useAxiosPost({}, "patch");

  // Prefill previous value whenever modal opens or country changes
  useEffect(() => {
    if (open && country) {
      setName(country.name || "");
    }
  }, [country, open]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.warn("country name is required!");
      return;
    }

    try {
      setLoading(true);
      updatecountry(
        `http://localhost:3000/api/v1/country/${country?._id}`,
        { name },
        (data) => {
          if (data?.status === "success") {
            if (onSuccess) onSuccess();
            onClose();
          }
        },
        true
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update country");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative w-full max-w-md rounded-2xl bg-white border border-neutral-line text-text-body p-6 shadow-xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 cursor-pointer right-3 text-text-body hover:text-accent-pink transition"
            >
              <X size={20} />
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-4 text-text-title">
              Edit country
            </h2>

            {/* Form */}
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label htmlFor="country Name" className="block text-sm font-medium text-text-body mb-1">
                  country Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter country name"
                  className="w-full border border-neutral-line rounded-lg px-3 py-2 bg-neutral-background text-text-body placeholder-text-body/60 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 cursor-pointer rounded-md bg-accent-teal hover:bg-brand-secondary transition text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 cursor-pointer rounded-md bg-brand-primary hover:bg-brand-secondary transition text-white font-medium disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update country"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
