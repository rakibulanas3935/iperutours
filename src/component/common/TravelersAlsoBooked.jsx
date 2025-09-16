"use client";
import useAxiosGet from "@/utils/useAxiosGet";
import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { useEffect } from "react";
import CommonLoader from "./CommonLoader";

export default function TravelersAlsoBooked() {
  const [recomendedTours,getRecomendedTours,recomendedToursLoading]=useAxiosGet([])
  useEffect(()=>{
    getRecomendedTours(`http://localhost:3000/api/v1/tours/randomtours`)
  },[])
  console.log("rec",recomendedTours)
if(recomendedToursLoading) return <CommonLoader/>
  return (
    <section className="bg-white  py-12 px-4 sm:px-8 lg:px-16">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#0b61b3]">
          Recommed Tours
        </h2>
        <div className="w-28 h-[2px] bg-[#e94f1d] mx-auto mt-2"></div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recomendedTours?.map((activity, i) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden relative"
          >
            {/* Bestseller tag */}
            {activity.bestseller && (
              <div className="absolute top-2 left-2 bg-yellow-400 text-xs font-semibold px-2 py-1 rounded">
                Bestseller
              </div>
            )}

            {/* Image */}
            <img
              src={activity.image}
              alt={activity.title}
              className="w-full h-40 object-cover"
            />

            {/* Badge */}
            {activity.badge && (
              <div className="absolute top-36 right-2 bg-pink-600 text-white text-xs px-2 py-1 rounded">
                {activity.badge}
              </div>
            )}

            {/* Content */}
            <div className="p-4">
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-red-500" /> {activity.location}
              </p>
              <h3 className="font-bold text-lg mt-1">{activity.title}</h3>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-2">
                <span className="text-yellow-400">★★★★★</span>
                <span className="text-sm text-gray-600">
                  {activity.rating} ({activity.reviews})
                </span>
              </div>

              {/* Recent bookings */}
              {activity.recent && (
                <p className="text-sm text-orange-600 mt-1">{activity.recent}</p>
              )}

              {/* Duration */}
              <div className="flex items-center text-sm text-gray-600 mt-2">
                <Clock className="w-4 h-4 mr-1" /> {activity.duration}
              </div>

              {/* Price */}
              <div className="mt-3 font-bold text-right text-gray-800">
                From: <span className="text-black">{activity.price}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* See More button */}
      <div className="flex justify-center mt-10">
        <button className="px-6 py-2 border-2 border-[#e94f1d] text-[#e94f1d] font-semibold rounded-full hover:bg-[#e94f1d] hover:text-white transition">
          See More
        </button>
      </div>
    </section>
  );
}
