"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useCategoryContext } from "@/context/categoryContext";
import CommonLoader from "@/component/common/CommonLoader";
import useAxiosPost from "@/utils/useAxiosPost";

export default function CreateSubCategoryModal({ open, onClose, onSuccess }) {
	const [name, setName] = useState("");
	const { categorys, categorysLoading } = useCategoryContext();
	const [, createSubCategory] = useAxiosPost({});
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSave = async (e) => {
		e.preventDefault();
		if (!name.trim() || !selectedCategory) {
			toast.warn("Please fill all fields");
			return;
		}
		setLoading(true);
		try {
			createSubCategory(
				"http://localhost:3000/api/v1/subcategories",
				{ name, category: selectedCategory._id },
				(data) => {
					if (data?.status === "success") {
						setName("");
						setSelectedCategory(null);
						if (onSuccess) onSuccess();
						onClose();
					}
				},
				true
			);
		} catch (err) {
			toast.error(err.response?.data?.message || "Error adding sub category");
		} finally {
			setLoading(false);
		}
	};

	if (categorysLoading) return <CommonLoader />;

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
						className="relative w-full max-w-md rounded-2xl bg-[var(--color-neutral-background)] border border-[var(--color-neutral-line)] p-6 shadow-xl"
					>
						{/* Close button */}
						<button
							onClick={onClose}
							className="absolute top-3 right-3 text-[var(--color-text-body)] hover:text-[var(--color-accent-pink)] transition"
						>
							<X size={20} />
						</button>

						{/* Title */}
						<h2 className="text-2xl font-bold mb-4 text-[var(--color-text-title)]">
							Add New Sub Category
						</h2>

						{/* Form */}
						<form onSubmit={handleSave} className="space-y-4">
							{/* Category Dropdown */}
							<div className="relative">
								<label className="block text-sm font-medium text-[var(--color-text-body)] mb-1">
									Select Category
								</label>
								<button
									type="button"
									onClick={() => setDropdownOpen(!dropdownOpen)}
									className="w-full flex justify-between items-center px-3 py-2 border rounded-lg bg-white text-[var(--color-text-body)] border-[var(--color-neutral-line)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]"
								>
									{selectedCategory
										? selectedCategory.name
										: "-- Choose a category --"}
									<ChevronDown className="ml-2 h-4 w-4" />
								</button>

								{dropdownOpen && (
									<ul className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto bg-white text-[var(--color-text-body)] border border-[var(--color-neutral-line)] rounded-lg shadow-lg">
										{categorys?.data?.map((cat) => (
											<li
												key={cat._id}
												onClick={() => {
													setSelectedCategory(cat);
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

							{/* Sub Category Input */}
							<div>
								<label className="block text-sm font-medium text-[var(--color-text-body)] mb-1">
									Sub Category Name
								</label>
								<input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder="Enter sub category name"
									className="w-full border border-[var(--color-neutral-line)] rounded-lg px-3 py-2 bg-white text-[var(--color-text-body)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]"
								/>
							</div>

							{/* Buttons */}
							<div className="flex justify-end gap-3 mt-6">
								<button
									type="button"
									onClick={onClose}
									className="px-4 py-2 rounded-md border border-[var(--color-neutral-line)] bg-white hover:bg-gray-100 transition text-[var(--color-text-body)]"
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={loading}
									className="px-4 py-2 rounded-md bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-secondary)] transition text-white font-medium disabled:opacity-50"
								>
									{loading ? "Saving..." : "Save Sub Category"}
								</button>
							</div>
						</form>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
