"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import useAxiosPostFile from "@/app/utils/useAxiosPostFile";
import { useUserContext } from "@/app/context/userContext";

export default function ImageGalleryUpload() {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const {user}=useUserContext()
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemove = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index]); // Clean up memory
      return prev.filter((_, i) => i !== index);
    });
  };

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const [, galleryEvent, loading] = useAxiosPostFile();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) return alert("Please select images to upload.");

    const formData = new FormData();
    images.forEach((image) => formData.append("images", image));
    if (user?._id) {
      formData.append('createdBy', user?._id);
    }
    galleryEvent('https://nova-next-gen-server.onrender.com/api/v1/gallery', formData, () => {

    }, true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-6">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Upload Your Gallery
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <label className="cursor-pointer bg-white/10 text-white px-6 py-3 rounded-xl border border-white/20 hover:bg-white/20 transition">
              Select Images
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {images.length > 0 && (
              <span className="text-sm text-gray-200">
                {images.length} image(s) selected
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {previews.map((src, idx) => (
              <div
                key={idx}
                className="relative w-full h-32 rounded-xl overflow-hidden border border-white/20 shadow-sm"
              >
                <Image
                  src={src}
                  alt={`Preview ${idx + 1}`}
                  fill
                  unoptimized
                  className="object-cover rounded-md"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white rounded-full p-1"
                  title="Remove"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 transition text-white px-6 py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={images.length === 0}
            >
              Upload Images
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
