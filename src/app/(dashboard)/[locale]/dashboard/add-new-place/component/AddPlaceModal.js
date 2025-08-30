"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, ImagePlus, Loader2 } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddPlaceModal({ open, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    placeName: "",
    description: "",
    bannerImage: null,
  });
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, bannerImage: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.placeName || !formData.description || !formData.bannerImage) {
      toast.warn("Please fill in all fields and upload an image!");
      return;
    }

    try {
      setUploading(true);

      let imgData = new FormData();
      imgData.append("image", formData.bannerImage);

      const { data } = await axios.post(
        "http://localhost:3000/api/v1/all/upload-image",
        imgData
      );

      await axios.post("http://localhost:3000/api/v1/places", {
        placeName: formData.placeName,
        description: formData.description,
        bannerImage: data.url,
      });

      toast.success("Place added successfully!");
      setFormData({ placeName: "", description: "", bannerImage: null });
      setPreview(null);

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      toast.error("Error saving place. Try again!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 md:p-8 text-gray-800 overflow-auto max-h-[90vh]"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
            >
              <X size={24} />
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-6 text-center">➕ Add New Place</h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Place Name */}
              <div>
                <label className="block font-medium mb-2">Place Name</label>
                <input
                  type="text"
                  name="placeName"
                  value={formData.placeName}
                  onChange={handleChange}
                  placeholder="Enter place name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write a short description..."
                  rows="4"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  required
                ></textarea>
              </div>

              {/* Banner Image */}
              <div>
                <label className="block font-medium mb-2">Banner Image</label>
                <div className="flex items-center gap-4">
                  <label className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-400 transition">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-gray-400">
                        <ImagePlus size={32} />
                        <span className="text-sm mt-2">Upload Image</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={uploading}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Upload size={18} /> Add Place
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
