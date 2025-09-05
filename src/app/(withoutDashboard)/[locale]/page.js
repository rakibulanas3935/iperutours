"use client";

import CartPage from "@/component/common/CartPage";
import CommonLoader from "@/component/common/CommonLoader";
import MultiStepCheckout from "@/component/common/MultiStepCheckout";
import PopularDestinations from "@/component/common/PopularDestinations";
import TopBookedActivities from "@/component/common/TopBookedActivities";
import TravelersAlsoBooked from "@/component/common/TravelersAlsoBooked";
import { useActiveMenuContext } from "@/context/activeMenuContext";
import { useNewPlaceContext } from "@/context/newPlaceContext";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

export default function HeroSection() {
    const {newPlace}=useNewPlaceContext()
    const { activeMenu, activeMenuLoading } = useActiveMenuContext()
  if(activeMenuLoading) return <CommonLoader/>

  return (
    <>
    <section className="relative h-[450px] sm:h-[500px] md:h-[600px] lg:h-[700px] w-full overflow-hidden">
      {/* Background Image */}
      
      <Image
        src={activeMenu?.bannerImage || "/fallback.jpg"}
        alt={activeMenu?.placeName || "Banner"}
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
          {activeMenu?.placeName}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-white max-w-lg sm:max-w-xl md:max-w-2xl"
        >
          {activeMenu?.description}
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
    {/* <MultiStepCheckout/> */}
    {/* <CartPage/> */}
     <PopularDestinations/>
     <TopBookedActivities/>
     <TravelersAlsoBooked/>
    </>
  );
}
