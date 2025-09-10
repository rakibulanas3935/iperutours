"use client";

import { useDestinationWiseTourContext } from "@/context/destinationWiseTourContext";
import { useNewPlaceContext } from "@/context/newPlaceContext";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function PopularDestinations() {
	// Dummy data (replace with API response)
	const { newPlace } = useNewPlaceContext();
	const { destinationWiseTour } = useDestinationWiseTourContext();

	return (
		<section className="py-12 px-4 sm:px-8 lg:px-16">
			{/* Section Title */}
			<div className="text-center mb-10">
				<h2 className="text-3xl sm:text-4xl font-bold text-brand-primary">
					Popular Destinations
				</h2>
				<div className="mt-2 w-40 h-[3px] bg-brand-secondary mx-auto" />
			</div>

			{/* Destinations Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{destinationWiseTour?.data?.places?.map((dest, i) => (
					<Link href={`/destination/${dest?.placeName}/${dest?._id}`}>
						<motion.div
							key={dest?._id}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: i * 0.1 }}
							className="relative rounded-lg overflow-hidden shadow-md group cursor-pointer"
						>
							{/* Destination Image */}
							<Image
								src={dest?.bannerImage || "/fallback.jpg"}
								alt={dest?.placeName || "name"}
								width={600}
								height={400}
								className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
							/>

							{/* Overlay gradient */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

							{/* Destination Info */}
							<div className="absolute bottom-4 left-4 text-white">
								<h3 className="text-xl font-bold">{dest?.placeName}</h3>
								<p className="text-sm font-semibold">{dest?.tourCount}</p>
							</div>
						</motion.div>
					</Link>
				))}
			</div>

			{/* See More Button */}
			<div className="flex justify-center mt-10">
				<Link
					href="/destinations"
					className="px-6 py-2 border-2 border-brand-secondary text-brand-secondary font-semibold rounded-full hover:bg-brand-secondary hover:text-white transition"
				>
					See More
				</Link>
			</div>
		</section>
	);
}
