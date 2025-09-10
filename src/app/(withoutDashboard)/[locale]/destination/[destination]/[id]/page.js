"use client"

import useAxiosGet from "@/utils/useAxiosGet"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { motion } from "framer-motion"
import TopBookedActivities from "@/component/common/TopBookedActivities"
import CommonLoader from "@/component/common/CommonLoader"
import Link from "next/link"
import { Clock, MapPin } from "lucide-react"

export default function Page() {
  const { destination, id } = useParams() // ✅ make sure your folder is /destination/[id]/page.tsx
  const [singleDestinationTour, getSingleDestinatonTour, singleDestinationTourLoading, setSingleDestinationTour] =
    useAxiosGet({}) // ✅ initialize with object

  useEffect(() => {
    if (id) {
      getSingleDestinatonTour(`http://localhost:3000/api/v1/places/destination/tours/${id}`)
    }
  }, [id])

  const place = singleDestinationTour?.data?.place
  const tours = singleDestinationTour?.data?.tours || []
  if (singleDestinationTourLoading) {
    return <CommonLoader />
  }

  return (
    <>
      <section className="relative h-[450px] sm:h-[500px] md:h-[600px] lg:h-[700px] w-full overflow-hidden">
        {/* Background Image */}
        <Image
          src={place?.bannerImage || "/fallback.jpg"}
          alt={place?.placeName || "Banner"}
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
          >
            {place?.placeName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-white max-w-lg sm:max-w-xl md:max-w-2xl"
          >
            {place?.description}
          </motion.p>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-6 sm:mt-8 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
          >
            <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden">
              <input
                type="text"
                placeholder="Tour, attraction, place, activity..."
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-700 focus:outline-none"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base">
                🔍
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#f5f5f5] py-12 px-4 sm:px-8 lg:px-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#0b61b3]">
            All the Tours In {destination}
          </h2>
          <div className="w-24 h-[2px] bg-[#e94f1d] mx-auto mt-2"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours?.map((tour, i) => (
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
                  Breakfast + Lunch
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
                    <span className="text-yellow-400">★★★★★</span>
                    <span className="text-sm text-gray-600">5 (9)</span>
                  </div>

                  {/* Recent bookings */}
                  <p className="text-sm text-orange-600 mt-1">2 recent booking</p>

                  {/* Duration */}
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <Clock className="w-4 h-4 mr-1" /> {tour?.details?.duration}
                  </div>

                  {/* Price */}
                  <div className="mt-3 font-bold text-right text-gray-800">
                    From: <span className="text-black">12</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

    </>
  )
}
