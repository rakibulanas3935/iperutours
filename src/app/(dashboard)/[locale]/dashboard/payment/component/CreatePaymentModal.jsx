"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useAxiosPost from "@/utils/useAxiosPost";
import CommonLoader from "@/component/common/CommonLoader";

export default function CreatePaymentModal({ open, onClose, onSuccess }) {
	const [paymentName, setPaymentName] = useState("");
	const [userId, setUserId] = useState("");
	const [password, setPassword] = useState("");
	const [shaKey, setShaKey] = useState("");
	const [publicKey, setPublicKey] = useState("");
	const [, createPayment] = useAxiosPost({});
	const [loading, setLoading] = useState(false);

	const handleSave = async (e) => {
		e.preventDefault();
		if (
			!paymentName.trim() ||
			!password.trim() ||
			!shaKey.trim() ||
			!publicKey.trim()
		) {
			toast.warn("Please fill all fields");
			return;
		}

		setLoading(true);
		try {
			createPayment(
				"http://localhost:3000/api/v1/payment",
				{ userId,paymentName, password, shaKey, publicKey },
				(data) => {
					if (data?.status === "success") {
						setPaymentName("");
						setPassword("");
						setShaKey("");
						setPublicKey("");
						if (onSuccess) onSuccess();
						onClose();
					}
				},
				true
			);
		} catch (err) {
			toast.error(err.response?.data?.message || "Error adding payment config");
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <CommonLoader />;

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
							Add New Payment
						</h2>

						{/* Form */}
						<form onSubmit={handleSave} className="space-y-4">
							{/* Payment Name */}
							<div>
								<label className="block text-sm font-medium text-[var(--color-text-body)] mb-1">
									Payment Name
								</label>
								<input
									type="text"
									value={paymentName}
									onChange={(e) => setPaymentName(e.target.value)}
									placeholder="Enter payment name"
									className="w-full border border-[var(--color-neutral-line)] rounded-lg px-3 py-2 bg-white text-[var(--color-text-body)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-[var(--color-text-body)] mb-1">
									User ID
								</label>
								<input
									type="text"
									value={userId}
									onChange={(e) => setUserId(e.target.value)}
									placeholder="Enter User ID"
									className="w-full border border-[var(--color-neutral-line)] rounded-lg px-3 py-2 bg-white text-[var(--color-text-body)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]"
								/>
							</div>

							{/* Password */}
							<div>
								<label className="block text-sm font-medium text-[var(--color-text-body)] mb-1">
									Password
								</label>
								<input
									type="text"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Enter password"
									className="w-full border border-[var(--color-neutral-line)] rounded-lg px-3 py-2 bg-white text-[var(--color-text-body)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]"
								/>
							</div>

							{/* SHA Key */}
							<div>
								<label className="block text-sm font-medium text-[var(--color-text-body)] mb-1">
									SHA Key
								</label>
								<input
									type="text"
									value={shaKey}
									onChange={(e) => setShaKey(e.target.value)}
									placeholder="Enter SHA key"
									className="w-full border border-[var(--color-neutral-line)] rounded-lg px-3 py-2 bg-white text-[var(--color-text-body)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]"
								/>
							</div>

							{/* Public Key */}
							<div>
								<label className="block text-sm font-medium text-[var(--color-text-body)] mb-1">
									Public Key
								</label>
								<input
									type="text"
									value={publicKey}
									onChange={(e) => setPublicKey(e.target.value)}
									placeholder="Enter public key"
									className="w-full border border-[var(--color-neutral-line)] rounded-lg px-3 py-2 bg-white text-[var(--color-text-body)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]"
								/>
							</div>

							{/* Buttons */}
							<div className="flex justify-end gap-3 mt-6">
								<button
									type="button"
									onClick={onClose}
									className="px-4 py-2 rounded-md cursor-pointer border border-[var(--color-neutral-line)] bg-white hover:bg-gray-100 transition text-[var(--color-text-body)]"
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={loading}
									className="px-4 py-2 rounded-md bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-secondary)] cursor-pointer transition text-white font-medium disabled:opacity-50"
								>
									{loading ? "Saving..." : "Save Payment"}
								</button>
							</div>
						</form>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
