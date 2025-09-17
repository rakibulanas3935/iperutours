"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosPost from "@/utils/useAxiosPost";
import useAxiosGet from "@/utils/useAxiosGet";
import { useUserContext } from "@/context/userContext";

export default function CreateUserModal({ open, onClose, onSuccess }) {
	const [countries, setCountries] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState("");
	const { user, setReload } = useUserContext();
	const [, postUserinfo, postUserLoading] = useAxiosPost();
	const [selectedCode, setSelectedCode] = useState("+880");
	const [districts, setDistricts] = useState([]);
	const [selectedDistrict, setSelectedDistrict] = useState("");
	const [username, setUsername] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [countryCode, GetCountryCode, countryCodeLoading, setCountryCode] =
		useAxiosGet();

	useEffect(() => {
		fetch("https://countriesnow.space/api/v0.1/countries/states")
			.then((res) => res.json())
			.then((data) => {
				const formatted = data?.data?.map((c) => ({
					country: c?.name,
					states: c?.states?.map((s) => s?.name),
				}));
				setCountries(formatted);
			})
			.catch((err) => console.error(err));
	}, []);

	useEffect(() => {
		GetCountryCode(
			"https://countriesnow.space/api/v0.1/countries/codes",
			(res) => {
				setCountryCode(res);
			}
		);
	}, []);
	// Update districts when country changes
	useEffect(() => {
		const countryData = countries?.find((c) => c?.country === selectedCountry);
		setDistricts(countryData ? countryData?.states : []);
		setSelectedDistrict("");
	}, [selectedCountry, countries]);

	const handleEmailChange = (e) => {
		const email = e.target.value;
		const namePart = email.split("@")[0] || "";
		setUsername(namePart);
	};
	// Handle registration
	const handleRegister = async (e) => {
		e.preventDefault();
		const form = e.target;

		const firstName = form.firstName.value;
		const lastName = form.lastName.value;
		const email = form.email.value;
		const whatsapp = form.whatsApp.value;
		const password = form.password.value;

		if (!firstName) {
			toast.warn("First Name Required");
			return;
		}
		if (!lastName) {
			toast.warn("Last Name Required");
			return;
		}

		if (!email) {
			toast.warn("Email Required");
			return;
		}

		postUserinfo(
			"http://localhost:3000/api/v1/users/signup",
			{
				firstName,
				lastName,
				userName: username,
				country: selectedCountry,
				district: selectedDistrict,
				email,
				whatsapp,
				password,
			},
			(res) => {
				if (res?.status === "success") {
					form.reset();
					if (onSuccess) onSuccess();
					onClose();
					setSelectedCountry("");
					setSelectedDistrict("");
				}
			},
			true
		);
	};

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center overflow-auto justify-center px-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div
						initial={{ scale: 0.95, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.95, opacity: 0 }}
						transition={{ type: "spring", stiffness: 300, damping: 20 }}
						className="relative w-full max-w-md rounded-2xl bg-white border border-neutral-line overflow-auto text-text-body p-6 shadow-xl  max-h-[90vh]"
					>
						{/* Close button */}
						<button
							onClick={onClose}
							className="absolute top-3 right-3 text-text-body hover:text-accent-pink transition"
						>
							<X size={20} />
						</button>

						{/* Title */}
						<h2 className="text-2xl font-bold mb-4 text-text-title">
							Add New Person Type
						</h2>

						{/* Form */}
						<form
							className="flex-1 bg-white border border-gray-200 rounded-xl p-6 shadow-md"
							onSubmit={handleRegister}
						>
							<h2 className="text-2xl font-semibold mb-6 text-gray-800">
								Contact Information
							</h2>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<input
									name="firstName"
									placeholder="First Name *"
									className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition"
								/>
								<input
									name="lastName"
									placeholder="Last Name"
									className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition"
								/>
							</div>

							{/* Country Dropdown */}
							<select
								className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none mt-4"
								value={selectedCountry}
								onChange={(e) => setSelectedCountry(e.target.value)}
							>
								<option value="">Select Country</option>
								{countries.map((c) => (
									<option key={c.country} value={c.country}>
										{c.country}
									</option>
								))}
							</select>

							{/* District Dropdown */}
							<select
								className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none mt-4"
								value={selectedDistrict}
								onChange={(e) => setSelectedDistrict(e.target.value)}
							>
								<option value="">Select District</option>
								{districts.map((d) => (
									<option key={d} value={d}>
										{d}
									</option>
								))}
							</select>

							<div className="flex mt-4 gap-2">
								{/* Country Code Dropdown */}
								<select
									className="p-2 border border-gray-300 rounded-lg bg-white 
                   focus:ring-2 focus:ring-green-400 focus:border-transparent 
                   outline-none transition w-32"
									value={selectedCode}
									onChange={(e) => setSelectedCode(e.target.value)}
								>
									{countryCode?.data?.map((c) => (
										<option key={c?.code} value={c?.dial_code}>
											{c?.name} {c?.dial_code}
										</option>
									))}
								</select>

								{/* WhatsApp Number */}
								<input
									name="whatsApp"
									placeholder="WhatsApp Number"
									className="flex-1 border border-gray-300 p-2 rounded-lg 
                   focus:ring-2 focus:ring-green-400 focus:border-transparent 
                   outline-none transition"
								/>
							</div>
							<input
								name="userName"
								value={username}
								disabled={true}
								placeholder="User Name *"
								className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition w-full mt-4"
							/>
							<input
								name="email"
								onChange={handleEmailChange}
								placeholder="Email Address *"
								className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition w-full mt-4"
							/>

							{/* Password with toggle */}
							<div className="relative mt-4">
								<input
									name="password"
									type={showPassword ? "text" : "password"}
									placeholder="Create a Password *"
									className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition"
								/>
								<button
									type="button"
									onClick={() => setShowPassword((prev) => !prev)}
									className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-900"
								>
									{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
								</button>
							</div>

							<h3 className="font-medium mt-6 text-gray-700">
								Additional Information
							</h3>
							<textarea
								name="additionalInfo"
								placeholder="Hotel or pickup point (optional)"
								className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition w-full mt-2"
							/>

							<button
								type="submit"
								className="mt-4 bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-xl font-semibold transition"
							>
								{postUserLoading ? "Creating Account ..." : "Sing Up"}
							</button>
						</form>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
