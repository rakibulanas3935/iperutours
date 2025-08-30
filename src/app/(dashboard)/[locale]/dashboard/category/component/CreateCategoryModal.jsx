"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useAxiosPost from "@/utils/useAxiosPost";

export default function CreateCategoryModal({ open, onClose, onSuccess }) {
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const [, createCategory, categoryCreateLoading] = useAxiosPost({});
	const handleSave = async (e) => {
		e.preventDefault();

		if (!name.trim()) {
			toast.warn("Category name is required!");
			return;
		}

		try {
			setLoading(true);
			createCategory(
				"http://localhost:3000/api/v1/categories",
				{ name },
				(data) => {
					if (data?.status === "success") {
						setName("");
						if (onSuccess) onSuccess();
						onClose();
					}
				},
				true
			);
		} catch (err) {
			toast.error(err.response?.data?.message || "Failed to create category");
		} finally {
			setLoading(false);
		}
	};

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
						<h2 className="text-2xl font-bold mb-4">Add New Category</h2>

						{/* Form */}
						<form onSubmit={handleSave} className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-300 mb-1">
									Category Name
								</label>
								<input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder="Enter category name"
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
									{loading ? "Saving..." : "Save Category"}
								</button>
							</div>
						</form>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
