'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import TripTabs from '@/component/common/TripTabs';

export default function SacredValleyTrip() {
  const [selectedDate, setSelectedDate] = useState();

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-10">
        {/* Left Section */}
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
            Complete Sacred Valley day trip
          </h1>

          {/* Location */}
          <div className="flex items-center text-red-600 mt-1 text-sm font-medium">
            <MapPin size={16} className="mr-1" />
            Cusco, Peru
          </div>

          {/* Availability & Reviews */}
          <div className="flex items-center mt-2 gap-2">
            <span className="text-green-600 font-semibold text-sm">
              Daily availability
            </span>
            <span className="text-yellow-500">★★★★★</span>
            <span className="text-gray-600 text-sm">(8 reviews)</span>
          </div>

          {/* Image */}
          <motion.div
            className="mt-4 rounded-lg overflow-hidden shadow"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/sacred-valley.jpg"
              alt="Sacred Valley"
              width={800}
              height={500}
              className="w-full object-cover"
            />
          </motion.div>

          {/* Breadcrumb */}
          <div className="mt-3 text-sm text-gray-500">
            Home / <span className="text-orange-500">Peru</span> /{' '}
            <span className="text-orange-500">Cusco</span> / Complete Sacred Valley full day
          </div>
        </div>

        {/* Right Section */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-[350px] bg-white border rounded-xl shadow p-5 h-fit"
        >
          {/* Price */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-green-700">US$24.00</h2>
            <span className="text-yellow-500">★★★★★</span>
            <span className="text-gray-600 text-sm">(8 reviews)</span>
          </div>

          {/* Date Selector */}
          <div className="mt-5">
            <label className="font-medium text-gray-700">Select the date:</label>
            <div className="mt-2 border rounded-lg p-3">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                defaultMonth={new Date(2025, 7)} // August 2025
                styles={{
                  caption: { color: '#374151', fontWeight: 600 },
                  head: { color: '#6B7280' },
                  day_selected: { backgroundColor: '#22c55e', color: 'white' },
                  day_today: { color: '#16a34a' },
                }}
              />
            </div>
          </div>

          {/* Schedule */}
          <div className="mt-4">
            <label className="font-medium text-gray-700">Schedule:</label>
            <select className="w-full border mt-1 rounded-lg p-2 text-sm text-gray-600">
              <option>Horario no disponible</option>
            </select>
          </div>

          {/* Duration */}
          <div className="mt-4">
            <label className="font-medium text-gray-700">Duration</label>
            <div className="w-full border rounded-lg p-2 bg-gray-50 text-sm text-gray-700">
              11 hours
            </div>
          </div>

          {/* People */}
          <div className="mt-4">
            <label className="font-medium text-gray-700">N° of people:</label>
            <select className="w-full border mt-1 rounded-lg p-2 text-sm text-gray-600">
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
        </motion.div>


      </div>
      <TripTabs />
    </>
  );
}
