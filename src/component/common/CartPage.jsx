"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center px-6 py-10">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-16 mb-8">
        {/* Step 1 */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-green-600 bg-green-600 text-white"
          >
            ✓
          </motion.div>
          <p className="mt-2 text-sm font-semibold text-gray-800">Add Tour</p>
        </div>
        <div className="flex-1 border-t-2 border-green-600 w-32"></div>

        {/* Step 2 */}
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-orange-500 text-orange-500"
          >
            ●
          </motion.div>
          <p className="mt-2 text-sm font-semibold text-gray-800">Cart</p>
        </div>
        <div className="flex-1 border-t-2 border-orange-500 w-32"></div>

        {/* Step 3 */}
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-orange-500 text-orange-500"
          >
            ●
          </motion.div>
          <p className="mt-2 text-sm font-semibold text-gray-800">Checkout</p>
        </div>
      </div>

      {/* Success Message */}
      <div className="w-full max-w-4xl bg-green-600 text-white rounded-md p-4 mb-8 text-center font-medium">
        “ Paracas, Ica y Oasis Huacachina desde Lima ” has been removed.{" "}
        <span className="text-red-500 cursor-pointer">Undo?</span>
      </div>

      {/* Cart Section */}
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl">
        {/* Tour Info */}
        <div className="flex-1 border rounded-md shadow-sm bg-white">
          <div className="p-4 flex items-start gap-4">
            {/* Delete Icon */}
            <Trash2 className="text-red-500 cursor-pointer mt-2" />

            {/* Tour Image */}
            <Image
              src="/tour.jpg"
              alt="Tour Image"
              width={180}
              height={120}
              className="rounded-md object-cover"
            />

            {/* Tour Details */}
            <div className="flex flex-col">
              <h2 className="text-orange-600 font-semibold text-sm">
                Paracas, Ica, and Huacachina Oasis from Lima
              </h2>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">From:</span> September 9, 2025 –
                4:30 am
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">To:</span> September 9, 2025 –
                10:30 pm
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Duration:</span> 18 hours
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Adults:</span> 1
              </p>
            </div>
          </div>

          {/* Price Section */}
          <div className="border-t px-6 py-4 flex justify-between text-sm font-semibold">
            <span>Price: US$50.00</span>
            <span>Subtotal: US$50.00</span>
          </div>
          <div className="border-t px-6 py-3 text-gray-400 text-sm cursor-not-allowed">
            Update cart
          </div>
        </div>

        {/* Booking Totals */}
        <div className="w-full lg:w-1/3 border rounded-md shadow-sm bg-white h-fit">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Booking totals
            </h2>
            <div className="flex justify-between py-2 text-sm border-b">
              <span>Subtotal</span>
              <span>US$50.00</span>
            </div>
            <div className="flex justify-between py-2 font-bold text-gray-800">
              <span>Total</span>
              <span>US$50.00</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-4 bg-green-600 text-white py-2 rounded-full font-medium"
            >
              Proceed to book
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
