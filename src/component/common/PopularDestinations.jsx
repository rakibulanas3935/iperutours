"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function PopularDestinations() {
  // Dummy data (replace with API response)
  const destinations = [
    {
      id: 1,
      name: "AREQUIPA",
      tours: 11,
      image:
        "https://images.unsplash.com/photo-1604977041230-0a1f6a6f4c1e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "CUSCO",
      tours: 21,
      image:
        "https://images.unsplash.com/photo-1546539782-6fc531453083?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "HUARAZ",
      tours: 6,
      image:
        "https://images.unsplash.com/photo-1508264165352-258859e62245?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      name: "IQUITOS",
      tours: 8,
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      name: "LIMA",
      tours: 10,
      image:
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      name: "PUNO",
      tours: 7,
      image:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=80",
    },
  ];

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
        {destinations.map((dest, i) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative rounded-lg overflow-hidden shadow-md group cursor-pointer"
          >
            {/* Destination Image */}
            <Image
              src={dest.image}
              alt={dest.name}
              width={600}
              height={400}
              className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            {/* Destination Info */}
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-bold">{dest.name}</h3>
              <p className="text-sm font-semibold">({dest.tours} Tours)</p>
            </div>
          </motion.div>
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
