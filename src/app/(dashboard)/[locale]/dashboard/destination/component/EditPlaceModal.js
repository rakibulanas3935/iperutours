"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, ImagePlus, Loader2, ChevronDown } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useAxiosPost from "@/utils/useAxiosPost";
import { useCountryContext } from "@/context/countryContext";

export default function EditPlaceModal({ open, onClose, onSuccess, place }) {
  const [formData, setFormData] = useState({
    placeName: "",
    description: "",
    bannerImage: null,
  });
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [, updateNewPlace, updateNewPlaceLoading] = useAxiosPost({}, "patch");
  const { country } = useCountryContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  // Prefill form with selected place data
  useEffect(() => {
    if (place) {
      setFormData({
        placeName: place.placeName || "",
        description: place.description || "",
        bannerImage: place?.bannerImage,
      });
      setSelectedCountry(place?.country)
      setPreview(place.bannerImage || null);
    }
  }, [place]);

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

    if (!formData.placeName || !formData.description) {
      toast.warn("Please fill in all fields!");
      return;
    }

    try {
      setUploading(true);

      let imageUrl = preview;

      // If user uploaded a new image
      if (formData.bannerImage instanceof File) {
        let imgData = new FormData();
        imgData.append("image", formData.bannerImage);

        const { data } = await axios.post(
          "http://localhost:3000/api/v1/all/upload-image",
          imgData
        );
        imageUrl = data.url;
      }

      // Update API call
      updateNewPlace(
        `http://localhost:3000/api/v1/places/${place?._id}`,
        {
          country: selectedCountry?._id,
          placeName: formData.placeName,
          description: formData.description,
          bannerImage: imageUrl,
        },
        (data) => {
          if (data?.status === "success") {
            if (onSuccess) onSuccess();
            onClose();
          }
        },
        true
      );
    } catch (error) {
      console.log(error);
      toast.error("Error updating place. Try again!");
    } finally {
      setUploading(false);
    }
  };

  console.log("palae",place)

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
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 md:p-8 text-text-body overflow-auto max-h-[90vh] border border-neutral-line"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-text-body hover:text-accent-pink transition"
            >
              <X size={24} />
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-6 text-center text-text-title">
              ✏️ Edit Place
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Place Name */}
              <div className="relative">
                <label className="block text-sm font-medium text-[var(--color-text-body)] mb-1">
                  Select Country
                </label>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full flex justify-between items-center px-3 py-2 border rounded-lg bg-white text-[var(--color-text-body)] border-[var(--color-neutral-line)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]"
                >
                  {selectedCountry
                    ? selectedCountry?.name
                    : "-- Choose a Country --"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>

                {dropdownOpen && (
                  <ul className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto bg-white text-[var(--color-text-body)] border border-[var(--color-neutral-line)] rounded-lg shadow-lg">
                    {country?.data?.map((cat) => (
                      <li
                        key={cat?._id}
                        onClick={() => {
                          setSelectedCountry(cat);
                          setDropdownOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-[var(--color-brand-primary)] hover:text-white cursor-pointer"
                      >
                        {cat?.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <label className="block font-medium mb-2 text-text-title">
                  Destination
                </label>
                <input
                  type="text"
                  name="placeName"
                  value={formData.placeName}
                  onChange={handleChange}
                  placeholder="Enter place name"
                  className="w-full px-4 py-2 rounded-lg border border-neutral-line focus:ring-2 focus:ring-brand-primary focus:outline-none  text-text-body"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block font-medium mb-2 text-text-title">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write a short description..."
                  rows="4"
                  className="w-full px-4 py-2 rounded-lg border border-neutral-line focus:ring-2 focus:ring-brand-primary focus:outline-none  text-text-body"
                  required
                ></textarea>
              </div>

              {/* Banner Image */}
              <div>
                <label className="block font-medium mb-2 text-text-title">
                  Banner Image
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-neutral-line rounded-xl cursor-pointer hover:border-brand-primary transition">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-text-body/60">
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
                className="w-full flex cursor-pointer items-center justify-center gap-2 bg-brand-primary text-white py-3 rounded-lg font-semibold hover:bg-brand-secondary transition-all disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Updating...
                  </>
                ) : (
                  <>
                    <Upload size={18} /> Update Place
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
