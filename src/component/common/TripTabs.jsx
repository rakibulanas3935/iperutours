'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin,  Languages, Dumbbell } from 'lucide-react';

export default function TripTabs() {
  const [activeTab, setActiveTab] = useState("Details");

  const tabs = ["Details", "Inclusion", "Description", "What to bring", "Cancellation", "Reviews"];

  return (
    <div className=" w-full max-w-7xl mx-auto p-4 lg:p-10">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-blue-100 text-blue-700 border border-blue-300"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-6"
      >
        {activeTab === "Details" && (
          <div>
            <p className="text-gray-700 text-sm mb-4">
              Explore the highlights of the Sacred Valley of the Incas in a single day filled with history, culture, and breathtaking landscapes. This tour takes you on an unforgettable journey through this historically and culturally rich region.
            </p>

            {/* Details List */}
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="text-gray-600" size={18} />
                <strong className="w-28 text-gray-700">Duration:</strong>
                <span>11.5 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-gray-600" size={18} />
                <strong className="w-28 text-gray-700">Schedule:</strong>
                <span>7:00 AM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-gray-600" size={18} />
                <strong className="w-28 text-gray-700">Meeting point:</strong>
                <span>Pickup at your accommodation</span>
              </div>
              <div className="flex items-center gap-2">
                <Languages className="text-gray-600" size={18} />
                <strong className="w-28 text-gray-700">Guide:</strong>
                <span>English, Spanish</span>
              </div>
              <div className="flex items-center gap-2">
                <Dumbbell className="text-gray-600" size={18} />
                <strong className="w-28 text-gray-700">Fitness level:</strong>
                <span>Low, Intermediate</span>
              </div>
            </div>

            {/* Included / Excluded */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-lg font-semibold text-green-700 mb-2">Included:</h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    ✅ Hotel pickup
                  </li>
                  <li className="flex items-center gap-2">
                    ✅ Transportation
                  </li>
                  <li className="flex items-center gap-2">
                    ✅ Tour guide
                  </li>
                  <li className="flex items-center gap-2">
                    ✅ Buffet lunch
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-red-600 mb-2">Excluded:</h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start gap-2">
                    ❌ Tourist Ticket: Partial ticket for foreigners s/70 (US$19), partial ticket for Peruvians s/40
                  </li>
                  <li className="flex items-start gap-2">
                    ❌ Entrance ticket to the Salt Mines of Maras: Foreigners s/20 (US$ 5.5), and Peruvians s/15
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Inclusion" && (
          <p className="text-gray-700 text-sm">
            ✅ Hotel pickup, ✅ Transportation, ✅ Tour guide, ✅ Buffet lunch
          </p>
        )}

        {activeTab === "Description" && (
          <p className="text-gray-700 text-sm">
            This is the full description of the Sacred Valley day trip. You will experience beautiful landscapes, cultural history, and guided tours across multiple sites.
          </p>
        )}

        {activeTab === "What to bring" && (
          <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
            <li>Comfortable clothes</li>
            <li>Walking shoes</li>
            <li>Water bottle</li>
            <li>Sunscreen & hat</li>
          </ul>
        )}

        {activeTab === "Cancellation" && (
          <p className="text-gray-700 text-sm">
            Free cancellation up to 24 hours in advance. No refunds after that time.
          </p>
        )}

        {activeTab === "Reviews" && (
          <div className="text-gray-700 text-sm">
            <p>⭐⭐⭐⭐⭐ "Amazing trip! Highly recommend."</p>
            <p>⭐⭐⭐⭐ "Great experience, but the bus was a little crowded."</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
