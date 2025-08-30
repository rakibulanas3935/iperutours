"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useAxiosPost from "@/utils/useAxiosPost";
import { useCategoryContext } from "@/context/categoryContext";
import CommonLoader from "@/component/common/CommonLoader";

export default function EditSubCategoryModal({ open, onClose, subCategory, onSuccess }) {
  const [name, setName] = useState(subCategory?.name || "");
  const [selectedCategory, setSelectedCategory] = useState(subCategory?.category || null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { categorys, categorysLoading } = useCategoryContext();
  const [, updateSubCategory] = useAxiosPost({}, "patch");

  // Prefill when modal opens
  useEffect(() => {
    if (open) {
      setName(subCategory?.name || "");
      setSelectedCategory(subCategory?.category || null);
    }
  }, [open, subCategory]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim() || !selectedCategory) {
      toast.warn("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      updateSubCategory(
        `http://localhost:3000/api/v1/subcategories/${subCategory._id}`,
        {
          name,
          category: selectedCategory._id,
        },
        (data) => {
          if (data?.status === "success") {
            if (onSuccess) onSuccess();
            onClose();
          }
        },
        true
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update sub category");
    } finally {
      setLoading(false);
    }
  };

  if (categorysLoading) return <CommonLoader />;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 text-white p-6 shadow-xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-white hover:text-red-500 transition"
            >
              <X size={20} />
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-4">Edit Sub Category</h2>

            {/* Form */}
            <form onSubmit={handleUpdate} className="space-y-4">
              {/* Category Dropdown */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Select Category
                </label>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full flex justify-between items-center px-3 py-2 border rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  {selectedCategory ? selectedCategory.name : "-- Choose a category --"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>

                {dropdownOpen && (
                  <ul className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto bg-white/90 text-black border border-gray-300 rounded-lg shadow-lg">
                    {categorys?.data?.map((cat) => (
                      <li
                        key={cat._id}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setDropdownOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-green-100 cursor-pointer"
                      >
                        {cat.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Sub Category Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Sub Category Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter sub category name"
                  className="w-full border border-white/10 rounded-lg px-3 py-2 bg-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-md bg-white/20 hover:bg-white/30 transition text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 transition text-white font-medium disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update Sub Category"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
