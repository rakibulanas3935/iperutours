"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Languages, Dumbbell } from "lucide-react";

export default function TripInfo({ data }) {
	const sections = [
		"Details",
		"Inclusion",
		"Description",
		"What to bring",
		"Cancellation",
		"Reviews",
	];

	const [activeSection, setActiveSection] = useState("Details");

	// Update active section on scroll
	useEffect(() => {
		const handleScroll = () => {
			let current = "Details";
			sections.forEach((sec) => {
				const id = sec.replace(/\s+/g, "-").toLowerCase();
				const element = document.getElementById(id);
				if (element) {
					const rect = element.getBoundingClientRect();
					if (rect.top <= 120 && rect.bottom >= 120) {
						current = sec;
					}
				}
			});
			setActiveSection(current);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="w-full  mx-auto">
			{/* Sticky Nav */}
			<div className="sticky top-0 z-50 bg-white border-b py-3 mb-10">
				<div className="flex flex-wrap gap-3">
					{sections?.map((section) => {
						const id = section.replace(/\s+/g, "-").toLowerCase();
						return (
							<a
								key={section}
								href={`#${id}`}
								onClick={() => {
									e.preventDefault();
									setActiveSection(section);
								}}
								className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
									activeSection === section
										? "bg-brand-secondary text-white"
										: "bg-gray-100 text-gray-600 hover:bg-gray-200"
								}`}
							>
								{section}
							</a>
						);
					})}
				</div>
			</div>

			{/* Sections */}
			<motion.section
				id="details"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				className="mb-12 scroll-mt-28"
			>
				<h2 className="text-xl font-bold text-gray-800 mb-4">Details</h2>
				<p className="text-gray-700 text-sm mb-4">
					Explore the highlights of the Sacred Valley of the Incas in a single
					day filled with history, culture, and breathtaking landscapes. This
					tour takes you on an unforgettable journey through this historically
					and culturally rich region.
				</p>
				<div className="space-y-4 text-sm">
					<div className="flex items-center gap-2">
						<Clock size={18} className="text-gray-600" />
						<strong className="w-28 text-gray-700">Duration:</strong>
						<span>11.5 hours</span>
					</div>
					<div className="flex items-center gap-2">
						<Clock size={18} className="text-gray-600" />
						<strong className="w-28 text-gray-700">Schedule:</strong>
						<span>7:00 AM</span>
					</div>
					<div className="flex items-center gap-2">
						<MapPin size={18} className="text-gray-600" />
						<strong className="w-28 text-gray-700">Meeting point:</strong>
						<span>Pickup at your accommodation</span>
					</div>
					<div className="flex items-center gap-2">
						<Languages size={18} className="text-gray-600" />
						<strong className="w-28 text-gray-700">Guide:</strong>
						<span>English, Spanish</span>
					</div>
					<div className="flex items-center gap-2">
						<Dumbbell size={18} className="text-gray-600" />
						<strong className="w-28 text-gray-700">Fitness level:</strong>
						<span>Low, Intermediate</span>
					</div>
				</div>
			</motion.section>

			<section id="inclusion" className="mb-12 scroll-mt-28">
				<h2 className="text-xl font-bold text-gray-800 mb-4">Inclusion</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<h3 className="text-lg font-semibold text-green-700 mb-2">
							Included
						</h3>
						<ul className="space-y-1 text-sm">
							<li>✅ Hotel pickup</li>
							<li>✅ Transportation</li>
							<li>✅ Tour guide</li>
							<li>✅ Buffet lunch</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-semibold text-red-600 mb-2">
							Excluded
						</h3>
						<ul className="space-y-1 text-sm">
							<li>
								❌ Tourist Ticket: Foreigners s/70 (US$19), Peruvians s/40
							</li>
							<li>
								❌ Salt Mines of Maras: Foreigners s/20 (US$5.5), Peruvians s/15
							</li>
						</ul>
					</div>
				</div>
			</section>

			<section id="description" className="mb-12 scroll-mt-28">
				<h2 className="text-xl font-bold text-gray-800 mb-3">Description</h2>
				<p
					className="mt-2 text-sm text-text-body"
					dangerouslySetInnerHTML={{ __html: data?.description }}
				/>
			</section>

			<section id="what-to-bring" className="mb-12 scroll-mt-28">
				<h2 className="text-xl font-bold text-gray-800 mb-3">What to bring</h2>
				<ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
					<li>Comfortable clothes</li>
					<li>Walking shoes</li>
					<li>Water bottle</li>
					<li>Sunscreen & hat</li>
				</ul>
			</section>

			<section id="cancellation" className="mb-12 scroll-mt-28">
				<h2 className="text-xl font-bold text-gray-800 mb-3">Cancellation</h2>
				<p className="text-sm text-gray-700">
					Free cancellation up to 24 hours in advance. No refunds after that
					time.
				</p>
			</section>

			<section id="reviews" className="mb-12 scroll-mt-28">
				<h2 className="text-2xl font-bold text-gray-800 mb-2">Reviews</h2>
				<p className="text-gray-600 mb-6">
					{data?.reviews?.length || 0} review
					{data?.reviews?.length !== 1 ? "s" : ""} for this tour
				</p>

				{/* Average Rating */}
				<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-6">
					<div className="flex flex-col items-center md:items-start">
						<span className="text-4xl font-bold text-gray-800">
							{5 || 0}
						</span>
						<div className="flex items-center mt-1">
							{Array.from({ length: 5 }).map((_, i) => (
								<span
									key={i}
									className={`text-yellow-400 ${
										i < Math.round(4|| 0)
											? ""
											: "text-gray-300"
									}`}
								>
									★
								</span>
							))}
						</div>
						<p className="text-gray-500 text-sm mt-1">
							Based on {data?.reviews?.length || 0} review
							{data?.reviews?.length !== 1 ? "s" : ""}
						</p>
					</div>

					{/* Rating Distribution */}
					<div className="flex-1 space-y-2">
						{["Excellent", "Very good", "Average", "Bad", "Worse"].map(
							(label, idx) => {
								const percent = data?.ratingStats?.[label.toLowerCase()] || 0;
								return (
									<div key={label} className="flex items-center gap-2 text-sm">
										<span className="w-24 text-gray-700">{label}</span>
										<div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
											<div
												className="bg-yellow-400 h-2 rounded-full"
												style={{ width: `${percent}%` }}
											/>
										</div>
										<span className="w-10 text-gray-600 text-right">
											{percent}%
										</span>
									</div>
								);
							}
						)}
					</div>
				</div>

				{/* Search Reviews */}
				<input
					type="text"
					placeholder="Search traveler reviews"
					className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
				/>

				{/* Review List */}
				<div className="space-y-6">
					{data?.reviews?.map((review) => (
						<div
							key={review._id}
							className="flex gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200"
						>
							{/* Avatar */}
							<div className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full text-white font-bold">
								{review.userName
									?.split(" ")
									.map((n) => n[0])
									.join("")
									.toUpperCase() || "U"}
							</div>

							{/* Review Content */}
							<div className="flex-1">
								<div className="flex items-center justify-between">
									<div>
										<h4 className="font-semibold text-gray-800">
											{review?.userName || "User"}
										</h4>
										<span className="text-xs text-green-600">
											Verified booking
										</span>
									</div>
									<span className="text-gray-400 text-sm">
										{new Date(review?.createdAt).toLocaleDateString()}
									</span>
								</div>

								{/* Stars */}
								<div className="flex items-center gap-1 mt-1">
									{Array.from({ length: 5 }).map((_, i) => (
										<span
											key={i}
											className={`text-yellow-400 ${
												i < review?.rating ? "" : "text-gray-300"
											}`}
										>
											★
										</span>
									))}
								</div>

								<p className="mt-2 text-gray-700 text-sm">{review?.comment}</p>
							</div>
						</div>
					))}

					{data?.reviews?.length === 0 && (
						<p className="text-gray-500">
							No reviews yet. Be the first to review this tour!
						</p>
					)}
				</div>
			</section>
		</div>
	);
}
