"use client";
import { useTourContext } from "@/context/tourContext";
import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import Link from "next/link";

const activities = [
  {
    id: 1,
    title: "Paracas, Ica, and Huacachina Oasis from Lima",
    location: "Ica,Lima,Peru",
    rating: 4.9,
    reviews: 16,
    recent: "8 recent bookings",
    duration: "17 Hours",
    price: "US$50.00",
    badge: "Adventure",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Complete Sacred Valley day trip",
    location: "Cusco,Peru",
    rating: 4.8,
    reviews: 8,
    recent: "2 recent bookings",
    duration: "11.5 Hours",
    price: "US$24.00",
    badge: "Buffet lunch",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Humantay Lagoon",
    location: "Cusco,Peru",
    rating: 4.9,
    reviews: 8,
    recent: "1 recent booking",
    duration: "13 Hours",
    price: "US$24.00",
    badge: "Breakfast + Lunch",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "City Tour Cusco",
    location: "Cusco,Peru",
    rating: 4.8,
    reviews: 5,
    recent: "2 recent bookings",
    duration: "5 Hours",
    price: "US$10.00",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
  },
];

export default function TopBookedActivities() {
  const {tours}=useTourContext()

  return (
		<section className="bg-[#f5f5f5] py-12 px-4 sm:px-8 lg:px-16">
			<div className="text-center mb-10">
				<h2 className="text-3xl font-bold text-[#0b61b3]">
					Top Booked Activities
				</h2>
				<div className="w-24 h-[2px] bg-[#e94f1d] mx-auto mt-2"></div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{tours?.data?.map((tour, i) => (
					<Link href={`/tour/${tour?._id}`} key={i + 1}>
						<motion.div
							key={tour?._id}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: i * 0.2 }}
							className="bg-white rounded-xl shadow hover:shadow-lg cursor-pointer overflow-hidden relative"
						>
							{/* Bestseller tag */}
							<div className="absolute top-2 left-2 bg-yellow-400 text-xs font-semibold px-2 py-1 rounded">
								Bestseller
							</div>

							{/* Image */}
							<img
								src={tour?.images[0]}
								alt={tour?.title}
								className="w-full h-40 object-cover"
							/>

							{/* Badge */}

							<div className="absolute top-36 right-2 bg-pink-600 text-white text-xs px-2 py-1 rounded">
								{tour?.facalites}
							</div>

							{/* Content */}
							<div className="p-4">
								<p className="text-sm text-gray-500 flex items-center gap-1">
									<MapPin className="w-4 h-4 text-red-500" />{" "}
									{tour?.place?.placeName}
								</p>
								<h3 className="font-bold text-lg mt-1">{tour?.title}</h3>

								{/* Rating */}
								<div className="flex items-center gap-1 mt-2">
									<div className="flex flex-col items-center md:items-start">
										{(() => {
											const reviews = tour?.reviews;
											const avg =
												reviews.length === 0
													? 0
													: reviews.reduce((sum, r) => sum + r.rating, 0) /
													  reviews.length;
											const roundedAvg = Math.round(avg * 10) / 10;
											return (
												<div className="flex items-center gap-2">
													
													<div className="flex ">
														{Array.from({ length: 5 }).map((_, i) => (
															<span
																key={i}
																className={`${
																	i < Math.floor(roundedAvg)
																		? "text-yellow-400"
																		: "text-gray-300"
																}`}
															>
																★
															</span>
														))}
													</div>
													<span className="text-sm text-gray-600">
														{roundedAvg} ({tour?.reviews?.length})
													</span>
												</div>
											);
										})()}
									</div>
									{/* <span className="text-yellow-400">★★★★★</span> */}
								</div>

								{/* Recent bookings */}
								<p className="text-sm text-orange-600 mt-1">{tour?.bookingCount || 0} recent booking</p>

								{/* Duration */}
								<div className="flex items-center text-sm text-gray-600 mt-2">
									<Clock className="w-4 h-4 mr-1" /> {tour?.details?.duration}
								</div>

								{/* Price */}
								<div className="mt-3 font-bold text-right text-gray-800">
									US{" "}
									<span className="text-black">
										{tour?.pricing?.perPersonPrice || 45}
									</span>
								</div>
							</div>
						</motion.div>
					</Link>
				))}
			</div>
		</section>
	);
}
