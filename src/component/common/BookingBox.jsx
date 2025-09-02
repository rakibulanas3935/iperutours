"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function BookingBox({ tourDetails }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [counts, setCounts] = useState({
    adult: 1,
    child: 0,
    infant: 0,
  });

  const handleIncrement = (type) => {
    setCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const handleDecrement = (type) => {
    setCounts((prev) => ({
      ...prev,
      [type]: prev[type] > 0 ? prev[type] - 1 : 0,
    }));
  };

  return (
    <motion.div
      className="w-full max-w-lg bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-6 sticky top-20"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Price & Rating */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-green-600">
          ${tourDetails?.price || "24.00"}
        </h2>
        <span className="text-yellow-500">★★★★★</span>
      </div>

      {/* Date Picker */}
      <div className="mt-5">
        <label className="font-medium text-gray-700">Select a date</label>
        <div className="mt-2 border rounded-xl p-3 bg-white shadow-inner">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            defaultMonth={new Date(2025, 7)}
          />
        </div>
      </div>

      {/* Duration */}
      <div className="mt-4">
        <label className="font-medium text-gray-700">Duration</label>
        <div className="w-full border rounded-lg p-2 bg-gray-50 text-gray-700 text-sm">
          {tourDetails?.duration || "11 hours"}
        </div>
      </div>

      {/* People Selector */}
      <div className="mt-4">
        <label className="font-medium text-gray-700">Number of people</label>
        <div className="mt-3 space-y-3">
          {[
            { key: "adult", label: "Adult" },
            { key: "child", label: "Child (age 6 to 12)" },
            { key: "infant", label: "Infant (age 0 to 5)" },
          ].map(({ key, label }) => (
            <div
              key={key}
              className="flex items-center justify-between border rounded-lg p-3 bg-gray-50"
            >
              <span className="text-gray-700">{label}</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleDecrement(key)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white text-lg font-bold hover:bg-blue-600"
                >
                  −
                </button>
                <span className="w-6 text-center text-gray-800 font-medium">
                  {counts[key]}
                </span>
                <button
                  onClick={() => handleIncrement(key)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white text-lg font-bold hover:bg-blue-600"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Book Button */}
      <button className="mt-6 w-full bg-brand-primary text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-brand-secondary transition-all">
        Book Now
      </button>
    </motion.div>
  );
}
